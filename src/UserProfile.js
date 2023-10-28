import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

const UserProfile = () => {
    const { userId } = useParams(); // Update here
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://localhost:5000/get-user/${userId}`); // Update here
                const data = await response.json();
                setUser(data);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };
        fetchUser();
    }, [userId]); // Update here

    const handleSwitchUser = () => {
        navigate('/load-user');
    };

    const handleStartTest = () => {
        navigate('/new-test'); // assuming this is the path for NewTest.js page
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md={6}>
                    {user ? (
                        <>
                            <h4>User Profile</h4>
                            <p>Name: {user.first_name} {user.last_name}</p>
                            <p>Date of Birth: {user.dob}</p>
                            <Button variant="success" className="mr-2" onClick={handleStartTest}>Start New Test</Button>
                            <Button onClick={handleSwitchUser}>Switch User</Button>
                            <Button variant="danger" type="button" onClick={() => navigate('/')}>Go Back</Button>
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
