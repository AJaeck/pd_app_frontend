import React from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';

function SpeechResults() {
    const { userId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { audioUrl, results, endpoint } = location.state; // Receive the audio URL, the previous task type and processed audio results if passed via state

    const speechTask = endpoint
    const handleGoBack = () => {
        navigate(`/user-profile/${userId}`);
    };

    const handleStartTest = () => {
        navigate(`/new-speech-test/${speechTask}/${userId}`);
    };

        const renderResults = () => {
        if (speechTask === 'reading') {
            return (
                <>
                    <Card.Title>Original Text</Card.Title>
                    <Card.Text>
                        Einst stritten sich Nordwind und Sonne, wer von ihnen beiden wohl der Stärkere wäre, als ein Wanderer, der in einen warmen Mantel gehüllt war, des Weges daherkam. Sie wurden einig, dass derjenige für den Stärkeren gelten sollte, der den Wanderer zwingen würde, seinen Mantel abzunehmen. Der Nordwind blies mit aller Macht, aber je mehr er blies, desto fester hüllte sich der Wanderer in seinen Mantel ein. Endlich gab der Nordwind den Kampf auf. Nun erwärmte die Sonne die Luft mit ihren freundlichen Strahlen, und schon nach wenigen Augenblicken zog der Wanderer seinen Mantel aus. Da musste der Nordwind zugeben, dass die Sonne von ihnen beiden der Stärkere war.
                    </Card.Text>
                    <Card.Title>Transcribed Text</Card.Title>
                    <Card.Text>
                        {results || "No transcription available"}
                    </Card.Text>
                </>
            );
        } else if (speechTask === 'pataka') {
            return (
                <>
                    <Card.Title>Extracted Acoustic Features</Card.Title>
                    <Card.Text>
                        {results || "No features extracted"}
                    </Card.Text>
                </>
            );
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card>
                        <Card.Header as="h5">{speechTask === 'pataka' ? 'Pataka' : 'Reading'} Task Results</Card.Header>
                        <Card.Body>
                            {renderResults()}
                            <audio controls src={audioUrl}>
                                Your browser does not support the audio element.
                            </audio>
                            <div className="mt-3">
                                <Button variant="primary" onClick={handleStartTest}>Start New Test</Button>
                                {' '}
                                <Button variant="secondary" onClick={handleGoBack}>Go to Dashboard</Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default SpeechResults;
