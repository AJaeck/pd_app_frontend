import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Results() {
    const [result, setResult] = useState(null);
    const navigate = useNavigate();
    const { userId } = useParams();

    useEffect(() => {
        // Fetch the latest tapping result from local storage
        const storedResults = JSON.parse(localStorage.getItem('tappingResults') || '[]');
        if (storedResults.length > 0) {
            // Assuming the last result in the array is the most recent one
            const latestResult = storedResults[storedResults.length - 1];
            setResult(latestResult);
        }
    }, [userId]);

    // Prepare the data for the chart if result is defined
    const chartData = result ? {
        labels: result.intervals.map((_, index) => index + 1),
        datasets: [{
            label: 'Time between Taps (ms)',
            data: result.intervals,
            fill: false,
            backgroundColor: 'rgb(75, 192, 192)',
            borderColor: 'rgba(75, 192, 192, 0.6)',
        }]
    } : {};

    const chartOptions = {
        scales: {
            y: {
                beginAtZero: true,
                type: 'linear', // Specify the scale type
                title: {
                    display: true,
                    text: 'Time (ms)'
                }
            },
            x: {
                type: 'linear', // Specify the scale type
                title: {
                    display: true,
                    text: 'Tap Number'
                }
            }
        }
    };

    const handleGoBack = () => {
        navigate(`/user-profile/${userId}`);
    };

    const handleStartTest = () => {
        navigate(`/new-test/${userId}`);
    };

    return (
        <Container>
            <Row className="justify-content-md-center mt-5">
                <Col md={6} className="text-center">
                    <h4>Total Time: {result ? (result.totalTime + ' ms') : 'No result'}</h4>
                    {result && <Line data={chartData} options={chartOptions} />}
                </Col>
            </Row>
            <Row className="justify-content-md-center mt-3">
                <Col md={6} className="d-flex justify-content-between">
                    <Button variant="primary" onClick={handleStartTest}>Start New Test</Button>
                    <Button variant="success" onClick={handleGoBack}>Go to Profile</Button>
                </Col>
            </Row>
        </Container>
    );
}

export default Results;
