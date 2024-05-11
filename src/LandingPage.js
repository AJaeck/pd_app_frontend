import React from 'react';
import { Container, Navbar, Nav, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './components/LandingPage/LandingPage.css'; // Custom CSS

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
                <Container>
                    <Navbar.Brand href="#home">Parkinson Monitoring Platform</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#features">About</Nav.Link>
                            <Nav.Link href="#contact">Contact Us</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container className="my-5 text-center">
                <h1>Welcome to Our Platform</h1>
                <p>Helping you monitor and manage Parkinson's disease effectively.</p>
            </Container>

            <Container className="my-5">
                <Row className="justify-content-md-center text-center">
                    <Col md={4} className="mb-4">
                        <Button variant="primary" size="lg" block onClick={() => navigate('/create-user')}>
                            Create New User
                        </Button>
                    </Col>
                    <Col md={4} className="mb-4">
                        <Button variant="secondary" size="lg" block onClick={() => navigate('/load-user')}>
                            Load Existing User
                        </Button>
                    </Col>
                    <Col md={4} className="mb-4">
                        <Button className="text-white" variant="info" size="lg" block href="http://localhost:5000/speech-analysis">
                            Speech Analyzer
                        </Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default LandingPage;
