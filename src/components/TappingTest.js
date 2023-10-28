// src/components/TappingTest.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Badge } from 'react-bootstrap';

const TEST_DURATION = 5; // in seconds

function TappingTest() {
   const [taps, setTaps] = useState(0);
   const [timeLeft, setTimeLeft] = useState(TEST_DURATION);

   const navigate = useNavigate();

   const handleTap = () => {
       if (timeLeft > 0) {
           setTaps(taps + 1);
       }
   };

   React.useEffect(() => {
       if (timeLeft > 0) {
           const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
           return () => clearTimeout(timer);
       }
   }, [timeLeft]);


   React.useEffect(() => {
       if (timeLeft === 0) {
           // Save the result when the test is over
           const results = JSON.parse(localStorage.getItem('tappingResults') || '[]');
           results.push({ date: new Date(), taps });
           localStorage.setItem('tappingResults', JSON.stringify(results));

           // Optionally, navigate to a results page or show a message
           navigate('/results');
       }
   }, [timeLeft]);

   return (
       <Container className="mt-5">
           <Row className="justify-content-center">
               <Col md={6} className="text-center">
                   <Button variant="primary" size="lg" className="mb-3" onClick={handleTap}>Tap Here</Button>
                   <div className="mb-2">
                       Time Left: <Badge variant="secondary">{timeLeft}s</Badge>
                   </div>
                   <div>
                       Taps: <Badge variant="success">{taps}</Badge>
                   </div>
               </Col>
           </Row>
       </Container>
   );
}

export default TappingTest;
