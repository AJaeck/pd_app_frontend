import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Button, Container, Row, Col, ListGroup } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

const UserProfile = () => {
    const { userId } = useParams();
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:5000/get-user-data/${userId}`)
            .then(response => response.json())
            .then(data => setUserData(data))
            .catch(error => console.error("Error fetching user data:", error));
    }, [userId]);

    const handleSwitchUser = () => {
        navigate('/load-user');
    };

    const handleStartTapTest = () => {
        navigate(`/new-tap-test/${userId}`);
    };

        const handleStartSpeechTest = () => {
        navigate(`/new-speech-test/${userId}`);
    };

    const chartData = userData && {
        labels: userData.results.map(r => new Date(r.date).toLocaleDateString()),
        datasets: [
            {
                label: '# of Taps',
                data: userData.results.map(r => r.taps),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }
        ]
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md={6}>
                    {userData ? (
                        <>
                                                        <Row className="justify-content-md-left mt-3">
                                <Col md="auto">
                                    <h4>User Profile</h4>
                                </Col>
                                <Col md="auto">
                                    <Button onClick={handleSwitchUser}>Switch User</Button>
                                </Col>
                                <Col md="auto">
                                    <Button variant="danger" type="button" onClick={() => navigate('/')}>Home</Button>
                                </Col>
                            </Row>
                            <p>Name: {userData.first_name} {userData.last_name}</p>
                            <p>Date of Birth: {userData.dob}</p>

                            <h5 className="mt-4">Test Results</h5>
                            <Row className="justify-content-md-left mt-5">
                                <Col md={8}>
                                    <Bar data={chartData} options={{ maintainAspectRatio: false, responsive: true }} />
                                </Col>
                            </Row>

                            <Row className="justify-content-md-left mt-3">
                                <Col md="auto">
                                    <Button variant="success" onClick={handleStartTapTest}>New Tapping Test 👈</Button>
                                </Col>
                                <Col md="auto">
                                    <Button variant="success" onClick={handleStartSpeechTest}>New Speech Test 🗣️</Button>
                                </Col>
                            </Row>
                        </>
                    ) : (
                        <p>Loading...</p>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default UserProfile;
