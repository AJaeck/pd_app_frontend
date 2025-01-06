import React, { useState } from 'react';
import { Row, Form, Col, Container } from "react-bootstrap";

function ReadingTask({ selectedAlgorithm, onAlgorithmChange, selectedModelSize, onModelSizeChange }) { // Add new props

    // Check if the selected algorithm requires language model selection
    const requiresLanguageModel = [
        'whisper',
        'whisperx'
    ].includes(selectedAlgorithm);

    return (
        <Container>
            <Row className="justify-content-center mt-3">
                <p>
                    Einst stritten sich Nordwind und Sonne, wer von ihnen beiden
                    wohl der Stärkere wäre, als ein Wanderer, der in einen warmen
                    Mantel gehüllt war, des Weges daherkam...
                </p>
            </Row>
            <Row className="justify-content-center mt-3">
                <Col md={6}>
                    <Form.Group controlId="transcriptionAlgorithm">
                        <Form.Label>Select Transcription Algorithm</Form.Label>
                        <Form.Select
                            value={selectedAlgorithm}
                            onChange={(e) => onAlgorithmChange(e.target.value)}
                        >
                            <option value="whisper">Whisper</option>
                            <option value="whisperx">WhisperX</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>
            {requiresLanguageModel && (
                <Row className="justify-content-center mt-3">
                    <Col md={6}>
                        <Form.Group controlId="languageModel">
                            <Form.Label>Select Language Model</Form.Label>
                            <Form.Select
                                value={selectedModelSize} // Controlled by parent state
                                onChange={(e) => onModelSizeChange(e.target.value)} // Update parent state
                            >
                                <option value="">-- Select Language Model --</option>
                                <option value="tiny">Tiny</option>
                                <option value="base">Base</option>
                                <option value="small">Small</option>
                                <option value="medium">Medium</option>
                                <option value="large">Large (~10 GB VRAM)</option>
                                <option value="turbo">Turbo</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
            )}
        </Container>
    );
}

export default ReadingTask;
