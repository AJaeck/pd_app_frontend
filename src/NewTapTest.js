import React from 'react';
import TappingTest from './components/TappingTest';
import { Container, Row, Col } from 'react-bootstrap';

function NewTapTest() {
    return (
        <Container className="h-100">
            <Row className="justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
                <Col md={6} className="text-center">
                    <h1>Bradykinesia Tapping Test</h1>
                    <TappingTest />
                </Col>
            </Row>
        </Container>
    );
}

export default NewTapTest;
