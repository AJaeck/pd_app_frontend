import React, { useState } from 'react';
import { Row, Form, Col, Container } from "react-bootstrap";

function ReadingTask() {
    const [selectedAlgorithm, setSelectedAlgorithm] = useState('Google'); // Default selection

    const handleAlgorithmChange = (event) => {
        const algorithm = event.target.value;
        setSelectedAlgorithm(algorithm);
    };

    return (
        <>
            <Container>
                <Row className="justify-content-center mt-3">
                <p>Einst stritten sich Nordwind und Sonne, wer von ihnen beiden
                    wohl der Stärkere wäre, als ein Wanderer, der in einen warmen
                    Mantel gehüllt war, des Weges daherkam. Sie wurden einig, dass
                    derjenige für den Stärkeren gelten sollte, der den Wanderer
                    zwingen würde, seinen Mantel abzunehmen. Der Nordwind blies mit
                    aller Macht, aber je mehr er blies, desto fester hüllte sich der
                    Wanderer in seinen Mantel ein. Endlich gab der Nordwind den
                    Kampf auf. Nun erwärmte die Sonne die Luft mit ihren freundlichen
                    Strahlen, und schon nach wenigen Augenblicken zog der Wanderer
                    seinen Mantel aus. Da musste der Nordwind zugeben, dass die Sonne
                    von ihnen beiden der Stärkere war.
                </p>
            </Row>
                <Row className="justify-content-center mt-3">
                <Col md={6}>
                    <Form.Group controlId="transcriptionAlgorithm">
                        <Form.Label>Select Transcription Algorithm</Form.Label>
                        <Form.Control as="select" value={selectedAlgorithm} onChange={handleAlgorithmChange}>
                            <option value="IBM">IBM</option>
                            <option value="Google">Google</option>
                            <option value="Whisper">Whisper</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
            </Row>
            </Container>
        </>
    );
}

export default ReadingTask;