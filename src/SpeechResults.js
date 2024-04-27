import React from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';

function SpeechResults() {
    const { userId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { audioUrl } = location.state; // Receive the audio URL if passed via state

    const handleGoBack = () => {
        navigate(`/user-profile/${userId}`);
    };

    const handleStartTest = () => {
        navigate(`/new-speech-test/${userId}`);
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card>
                        <Card.Header as="h5">Speech Test Results</Card.Header>
                        <Card.Body>
                            <Card.Title>Original Text</Card.Title>
                            <Card.Text>
                                Here you would display the original text the user was supposed to read.
                            </Card.Text>
                            <Card.Title>Transcribed Text</Card.Title>
                            <Card.Text>
                                Here you would display the transcribed text once it's processed.
                            </Card.Text>
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
