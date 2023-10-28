import React, { useState } from 'react';
import { Button, Form, Container, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const CreateUser = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dateOfBirth: ''
    });
    const [showAlert, setShowAlert] = useState(false);
    const [alertVariant, setAlertVariant] = useState('success');
    const [alertMessage, setAlertMessage] = useState('');

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/create-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    first_name: formData.firstName,
                    last_name: formData.lastName,
                    dob: formData.dateOfBirth
                })
            });

            const data = await response.json();

            if (response.ok) {
                setAlertMessage(`User created successfully with ID: ${data.user_id}`);
                setAlertVariant('success');
                setShowAlert(true);
                setTimeout(() => navigate('/user-profile'), 2000); // Redirect to user-profile after 2 seconds
            } else if (response.status === 409) {
                setAlertMessage(data.message);
                setAlertVariant('danger');
                setShowAlert(true);
            } else {
                setAlertMessage(data.message || 'Error creating user.');
                setAlertVariant('danger');
                setShowAlert(true);
            }
        } catch (error) {
            setAlertMessage('Error: ' + error.message);
            setAlertVariant('danger');
            setShowAlert(true);
        }
    };

    return (
        <Container className="mt-5">
            {showAlert && (
                <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible>
                    {alertMessage}
                </Alert>
            )}
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
                        </Form.Group>
                        <Row className="justify-content-md-center mt-3">
                            <Col md="auto">
                                <Button variant="success" type="submit">Create User</Button>
                            </Col>
                            <Col md="auto">
                                <Button variant="danger" type="button" onClick={() => navigate('/')}>Go Back</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default CreateUser;
