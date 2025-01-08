import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, ProgressBar, Spinner } from 'react-bootstrap';
import ReadingTask from "./components/SpeechTasks/ReadingTask/ReadingTask";
import PatakaTask from "./components/SpeechTasks/PatakaTask/PatakaTask";

function NewSpeechTest() {
    const [recording, setRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [timer, setTimer] = useState(0);
    const [volume, setVolume] = useState(0);
    const [selectedAlgorithm, setSelectedAlgorithm] = useState('whisper');  // Default to vanilla Whisper
    const [selectedModelSize, setSelectedModelSize] = useState('base'); // Selected language model
    const [isUploading, setIsUploading] = useState(false); // Track upload state
    const { userId, taskType } = useParams();
    const navigate = useNavigate();

    const handleAlgorithmChange = (algorithm) => {
        setSelectedAlgorithm(algorithm);
    };

    const handleModelSizeChange = (model) => {
        setSelectedModelSize(model);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handleStartRecording = () => {
        navigator.mediaDevices.getUserMedia({
            audio: {
                noiseSuppression: false, // Disable noise suppression
                echoCancellation: false, // Disable echo cancellation
            }
        })
            .then(stream => {
                const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                const microphone = audioContext.createMediaStreamSource(stream);
                const analyzer = audioContext.createAnalyser();
                const scriptProcessor = audioContext.createScriptProcessor(2048, 1, 1);

                microphone.connect(analyzer);
                analyzer.connect(scriptProcessor);
                scriptProcessor.connect(audioContext.destination);
                scriptProcessor.onaudioprocess = function(event) {
                    const array = new Uint8Array(analyzer.frequencyBinCount);
                    analyzer.getByteFrequencyData(array);
                    const average = array.reduce((acc, value) => acc + value, 0) / array.length;
                    setVolume(Math.round(average));
                };

                const recorder = new MediaRecorder(stream);
                recorder.ondataavailable = (event) => {
                    const audioBlob = event.data;
                    const audioUrl = URL.createObjectURL(audioBlob);
                    uploadAudio(audioBlob, userId, audioUrl);
                };
                recorder.start();
                setRecording(true);
                setMediaRecorder(recorder);

                const interval = setInterval(() => {
                    setTimer(t => t + 1);
                }, 1000);

                recorder.onstop = () => {
                    clearInterval(interval);
                    scriptProcessor.disconnect();
                    analyzer.disconnect();
                    microphone.disconnect();
                    audioContext.close();
                };
            })
            .catch(error => {
                console.error('Error accessing media devices.', error);
            });
    };

    const handleStopRecording = () => {
        if (mediaRecorder) {
            mediaRecorder.stop();
            setRecording(false);
            setTimer(0);
        }
    };

    const uploadAudio = (audioBlob, userId, audioUrl) => {
        // Start uploading
        setIsUploading(true);

        const endpoint = taskType === 'pataka' ? 'pataka' : 'reading';
        const formData = new FormData();
        formData.append('file', audioBlob);
        formData.append('algorithm', selectedAlgorithm); // Append selected algorithm
        formData.append('modelSize', selectedModelSize); // Append selected model size
        fetch(`http://localhost:5000/process_speech_tasks/${endpoint}/${userId}`, {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                setIsUploading(false); // End uploading
                if (data.message) {
                    navigate(`/speech-results/${userId}`, {
                        state: { audioUrl, results: data.results, endpoint }
                    });
                } else if (data.error) {
                    alert(`Error: ${data.reason}`);
                }
            })
            .catch((error) => {
                setIsUploading(false);
                console.error('Error uploading audio:', error);
            });
    };

    useEffect(() => {
        return () => {
            if (mediaRecorder) {
                mediaRecorder.stream.getTracks().forEach(track => track.stop());
            }
        };
    }, [mediaRecorder]);

const TaskComponent = taskType === 'pataka'
    ? PatakaTask
    : () => (
        <ReadingTask
            selectedAlgorithm={selectedAlgorithm}
            onAlgorithmChange={handleAlgorithmChange}
            selectedModelSize={selectedModelSize} // Pass parent state
            onModelSizeChange={handleModelSizeChange} // Pass updater function
        />
    );

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col className="text-center">
                    {/* Disable button if uploading */}
                    <Button
                        variant="primary"
                        onClick={recording ? handleStopRecording : handleStartRecording}
                        disabled={isUploading}
                    >
                        {recording ? 'Stop Recording' : 'Start Recording'}
                    </Button>
                    <div>Timer: {formatTime(timer)}</div>
                    <ProgressBar now={volume} max={255} label={`${volume} dB`} />
                    {/* Show spinner and loading text during upload */}
                    {isUploading && (
                        <div className="mt-3">
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                            <div>Audio is being transcribed</div>
                        </div>
                    )}
                </Col>
            </Row>
            <TaskComponent />
        </Container>
    );
}

export default NewSpeechTest;
