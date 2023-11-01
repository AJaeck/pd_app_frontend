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

    const handleDeleteUser = async (userId) => {
    try {
        const response = await fetch(`http://localhost:5000/delete-user/${userId}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            // Filter out the deleted user
            setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
        } else {
            const data = await response.json();
            console.error("Error deleting user:", data.message);
        }
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };


    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <h4>Select a User</h4>
                    <ListGroup>
                        {users.map(user => (
                            <ListGroup.Item key={user.id} className="user-item">
                                <div className="d-flex justify-content-between">
                                    <div onClick={() => navigate(`/user-profile/${user.id}`)}>
                                        {`${user.first_name} ${user.last_name} (${user.dob})`}
                                    </div>
                                    <Button variant="danger" size="sm" onClick={() => handleDeleteUser(user.id)}>x</Button>
                                </div>
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
