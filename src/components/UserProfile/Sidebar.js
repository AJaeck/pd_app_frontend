import React from 'react';
import { Nav, Navbar } from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";

const Sidebar = () => {
    const navigate = useNavigate();
    const { userId } = useParams();

    const handleSelect = (eventKey) => {
        navigate(eventKey);
    };

    const handleStartTapTest = () => {
        navigate(`/new-tap-test/${userId}`);
    };

    const handleStartSpeechTest = () => {
        navigate(`/new-speech-test/${userId}`);
    };

    return (
        <>
            <Navbar className="col-md-12 d-none d-md-block sidebar bg-white"
                activeKey="/"
                onSelect={handleSelect}
            >
                <Navbar.Brand>Dashboard</Navbar.Brand>
                <Nav.Link eventKey="/">🏠 Home</Nav.Link>
                <Nav.Link eventKey="/load-user">👤 Switch User</Nav.Link>
                <Nav.Link onClick={handleStartTapTest}>☝️Tapping Test</Nav.Link>
                <Nav.Link onClick={handleStartSpeechTest}>🗣️ New Speech Test</Nav.Link>
            </Navbar>
        </>
    );
};

export default Sidebar;
