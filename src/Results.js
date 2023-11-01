import React, { useState,useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

function Results() {
    const [results, setResults] = useState([]);
    const navigate = useNavigate();
    const { userId } = useParams();

    useEffect(() => {
        // Fetch tapping results from the backend
        fetch(`http://localhost:5000/get-tapping-results/${userId}`)
            .then(response => response.json())
            .then(data => setResults(data))
            .catch(error => console.error("Error fetching tapping results:", error));
    }, [userId]);

    const data = {
        labels: results.map(r => new Date(r.date).toLocaleDateString()),
        datasets: [
            {
                label: '# of Taps',
                data: results.map(r => r.taps),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }
        ]
    };

    const handleGoBack = () => {
        navigate(`/user-profile/${userId}`);
    };

    const handleStartTest = () => {
        navigate(`/new-test/${userId}`); // assuming this is the path for NewTest.js page
    };

    return (
        <Container>
            <Row className="justify-content-md-center mt-5">
                <Col md={6}>
                    <Bar data={data} />
                </Col>
            </Row>
            <Row className="justify-content-md-center mt-3">
                <Col md="auto">
                    <Button variant="primary" onClick={handleStartTest}>Start New Test</Button>
                </Col>
                <Col md="auto">
                    <Button variant="success" onClick={handleGoBack}>Go to Profile</Button>
                </Col>
            </Row>
        </Container>
    );
}

export default Results;
