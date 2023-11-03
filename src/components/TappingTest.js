import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

const MAX_TAPS = 15;

function TappingTest() {
    const [taps, setTaps] = useState([]);
    const { userId } = useParams();
    const navigate = useNavigate();

    const handleTap = () => {
        if (taps.length <= MAX_TAPS) {
            const currentTime = new Date().getTime();
            setTaps(prevTaps => [...prevTaps, currentTime]);
        }
    };

    React.useEffect(() => {
        if (taps.length === MAX_TAPS) {
            // Calculate the intervals between each tap
            const intervals = taps.slice(1).map((tap, index) => tap - taps[index]);
            // Calculate the total time from the first to the last tap
            const totalTime = taps[taps.length - 1] - taps[0];

            const result = {
                date: new Date().toISOString(),
                intervals,
                totalTime
            };

            // Store the result locally
            const storedResults = JSON.parse(localStorage.getItem('tappingResults') || '[]');
            storedResults.push(result);
            localStorage.setItem('tappingResults', JSON.stringify(storedResults));

            // Navigate to the results page
            navigate(`/results/${userId}`);
        }
    }, [taps, userId, navigate]);

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col className="text-center">
                    <Button
                        variant="primary"
                        size="lg"
                        className="mb-3"
                        style={{ width: '300px', height: '300px' }}
                        onClick={handleTap}
                    >
                        Tap Here
                    </Button>
                    <div>
                        Taps: {taps.length}
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default TappingTest;
