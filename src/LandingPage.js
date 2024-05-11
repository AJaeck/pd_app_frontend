import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <Container className="mt-5 text-center">
            <Row className="justify-content-md-center">
                <Col md="auto">
                    <Button className="mb-3" variant="primary" size="lg" block onClick={() => navigate('/create-user')}>
                        Create New User
                    </Button>
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col md="auto">
                    <Button variant="secondary" size="lg" block onClick={() => navigate('/load-user')}>
                        Load Existing User
                    </Button>
                </Col>
                <Col md="auto">
                    <Button variant="info" size="lg" block >
                        <a href="http://localhost:5000/speech-analysis" target="_blank"> Upload Audio File</a>
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default LandingPage;
