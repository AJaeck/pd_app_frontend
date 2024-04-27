import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, ProgressBar } from 'react-bootstrap';

function NewSpeechTest() {
    const [recording, setRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [timer, setTimer] = useState(0);
    const [volume, setVolume] = useState(0);  // State to hold the current volume level
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
                const analyzer = audioContext.createAnalyser();
                const microphone = audioContext.createMediaStreamSource(stream);
                const scriptProcessor = audioContext.createScriptProcessor(2048, 1, 1);

                microphone.connect(analyzer);
                analyzer.connect(scriptProcessor);
                scriptProcessor.connect(audioContext.destination);
                scriptProcessor.onaudioprocess = function() {
                    const array = new Uint8Array(analyzer.frequencyBinCount);
                    analyzer.getByteFrequencyData(array);
                    let values = 0;

                    array.forEach(value => {
                        values += value;
                    });

                    const average = values / array.length;
                    setVolume(Math.round(average)); // Update volume state based on the average
                };

                const recorder = new MediaRecorder(stream);
                setMediaRecorder(recorder);
                recorder.start();
                setRecording(true);

                const interval = setInterval(() => {
                    setTimer(t => t + 1);
                }, 1000);

                recorder.ondataavailable = (event) => {
                    // Handle recorded data
                };

                recorder.onstop = () => {
                    clearInterval(interval);
                    scriptProcessor.disconnect();
                    analyzer.disconnect();
                    microphone.disconnect();
                    // Optionally, navigate to the transcription page and send the audio for processing
                };
            })
            .catch(error => {
                console.error('Error accessing media devices.', error);
            });
    };

    const handleStopRecording = () => {
    if (mediaRecorder) {
        mediaRecorder.stop();  // Stop the recording
        setRecording(false);
        setTimer(0);

        mediaRecorder.ondataavailable = (event) => {
            const audioBlob = event.data;
            const audioUrl = URL.createObjectURL(audioBlob);  // Create a URL for the audio blob

            // Redirect to the speech results page with the audio URL and other necessary data
            navigate(`/speech-results/${userId}`, { state: { audioUrl } });
            };
        }
    };


    useEffect(() => {
        return () => {
            mediaRecorder?.stream.getTracks().forEach(track => track.stop());
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
                    <ProgressBar now={volume} max={255} label={`${volume} dB`} /> {/* Displaying the volume level */}
                </Col>
            </Row>
            <Row>
                <p>Einst stritten sich Nordwind und Sonne, wer von ihnen beiden wohl der Stärkere wäre, als ein Wanderer, der in einen warmen Mantel gehüllt war, des Weges daherkam. Sie wurden einig, dass derjenige für den Stärkeren gelten sollte, der den Wanderer zwingen würde, seinen Mantel abzunehmen. Der Nordwind blies mit aller Macht, aber je mehr er blies, desto fester hüllte sich der Wanderer in seinen Mantel ein. Endlich gab der Nordwind den Kampf auf. Nun erwärmte die Sonne die Luft mit ihren freundlichen Strahlen, und schon nach wenigen Augenblicken zog der Wanderer seinen Mantel aus. Da musste der Nordwind zugeben, dass die Sonne von ihnen beiden der Stärkere war.</p>
            </Row>
        </Container>
    );
}

export default NewSpeechTest;
