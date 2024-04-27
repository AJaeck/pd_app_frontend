import React, { useState } from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";


function SpeechTest() {
 return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col className="text-center">
                    <Button
                        variant="primary"
                        size="lg"
                        className="mb-3"
                        style={{ width: '300px', height: '300px' }}
                    >
                        Start Transcription
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

export default SpeechTest;
