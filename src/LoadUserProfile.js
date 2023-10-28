import React, { useState, useEffect } from 'react';
import {ListGroup, Container, Row, Col, Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const LoadUserProfile = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("http://localhost:5000/get-users");
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchUsers();
    }, []);

    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <h4>Select a User</h4>
                    <ListGroup>
                        {users.map(user => (
                            <ListGroup.Item key={user.id} action onClick={() => navigate(`/user-profile/${user.id}`)}>
                                {`${user.first_name} ${user.last_name} (${user.dob})`}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>
            <Row className="justify-content-md-center mt-3">
                <Col md="auto">
                    <Button variant="success" type="button" onClick={() => navigate('/create-user')}>Create User</Button>
                </Col>
                <Col md="auto">
                    <Button variant="danger" type="button" onClick={() => navigate('/')}>Go Back</Button>
                </Col>
            </Row>
        </Container>
    );
};

export default LoadUserProfile;
