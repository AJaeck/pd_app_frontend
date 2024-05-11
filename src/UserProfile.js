import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Sidebar from './components/UserProfile/Sidebar'; // Adjust path as needed
import './components/UserProfile/UserProfile.css'; // Ensure you have proper styling in CSS

const Dashboard = () => {
    const { userId } = useParams();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5000/get-user-data/${userId}`)
            .then(response => response.json())
            .then(data => setUserData(data))
            .catch(error => console.error("Error fetching user data:", error));
    }, [userId]);

    const chartData = userData && {
        labels: userData.results.map(r => new Date(r.date).toLocaleDateString()),
        datasets: [
            {
                label: '# of Taps',
                data: userData.results.map(r => r.taps),
                backgroundColor: 'rgba(133, 193, 233, 0.6)',
                borderColor: 'rgba(133, 193, 233, 1)',
                borderWidth: 1
            }
        ]
    };

    return (
        <Container fluid className="mt-5 user-profile bg-light">
            <Row>
                <Col xs={2} id="sidebar-wrapper">
                    <Sidebar />
                </Col>
                <container>
                <Col xs={10} id="page-content-wrapper">
                    {userData ? (
                        <>
                            <Card className="mb-3 bg-white">
                                <Card.Body>
                                    <Card.Title>User Profile</Card.Title>
                                    <Card.Text>Name: {userData.first_name} {userData.last_name}</Card.Text>
                                    <Card.Text>Date of Birth: {userData.dob}</Card.Text>
                                </Card.Body>
                            </Card>
                            <Card className="mb-3 bg-white">
                                <Card.Body>
                                    <Card.Title>Tapping Results</Card.Title>
                                    <Bar data={chartData} options={{ responsive: true }} />
                                </Card.Body>
                            </Card>
                        </>
                    ) : (
                        <p>Loading...</p>
                    )}
                </Col>
                </container>
            </Row>
        </Container>
    );
};

export default Dashboard;
