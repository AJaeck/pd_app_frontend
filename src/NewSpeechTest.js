import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, ProgressBar } from 'react-bootstrap';

function NewSpeechTest() {
    const [recording, setRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [timer, setTimer] = useState(0);
    const [volume, setVolume] = useState(0);
    const { userId } = useParams();
    const navigate = useNavigate();

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handleStartRecording = () => {
        navigator.mediaDevices.getUserMedia({ audio: true })
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
                    uploadAudio(audioBlob, userId, audioUrl);  // Now passing audioUrl directly
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
            mediaRecorder.stop();  // This will trigger `ondataavailable`
            setRecording(false);
            setTimer(0);
        }
    };

    const uploadAudio = (audioBlob, userId, audioUrl) => {
        const formData = new FormData();
        formData.append('file', audioBlob);
        fetch(`http://localhost:5000/upload-audio/${userId}`, {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                navigate(`/speech-results/${userId}`, { state: { audioUrl, transcription: data.transcription } });
            } else if (data.error) {
                // Display error and suggest re-recording
                alert(`Error: ${data.reason}`);
            }
        })
        .catch((error) => {
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

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col className="text-center">
                    <Button variant="primary" onClick={recording ? handleStopRecording : handleStartRecording}>
                        {recording ? 'Stop Recording' : 'Start Recording'}
                    </Button>
                    <div>Timer: {formatTime(timer)}</div>
                    <ProgressBar now={volume} max={255} label={`${volume} dB`} />
                </Col>
            </Row>
            <Row className="justify-content-center">
                <p>Einst stritten sich Nordwind und Sonne, wer von ihnen beiden wohl der Stärkere wäre, als ein Wanderer, der in einen warmen Mantel gehüllt war, des Weges daherkam. Sie wurden einig, dass derjenige für den Stärkeren gelten sollte, der den Wanderer zwingen würde, seinen Mantel abzunehmen. Der Nordwind blies mit aller Macht, aber je mehr er blies, desto fester hüllte sich der Wanderer in seinen Mantel ein. Endlich gab der Nordwind den Kampf auf. Nun erwärmte die Sonne die Luft mit ihren freundlichen Strahlen, und schon nach wenigen Augenblicken zog der Wanderer seinen Mantel aus. Da musste der Nordwind zugeben, dass die Sonne von ihnen beiden der Stärkere war.</p>
            </Row>
        </Container>
    );
}
export default NewSpeechTest;