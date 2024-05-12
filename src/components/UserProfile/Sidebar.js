import React from 'react';
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const Sidebar = () => {
    const navigate = useNavigate();
    const { userId } = useParams();

    const handleSelect = (eventKey) => {
        navigate(eventKey);
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
                <Nav.Link eventKey={`/new-tap-test/${userId}`}>☝️ Tapping Test</Nav.Link>
                <NavDropdown title="🗣️ Speech Tasks" id="nav-dropdown">
                    <NavDropdown.Item eventKey={`/new-speech-test/${userId}/pataka`}>Pataka</NavDropdown.Item>
                    <NavDropdown.Item eventKey={`/new-speech-test/${userId}/reading`}>Reading</NavDropdown.Item>
                </NavDropdown>
            </Navbar>
        </>
    );
};

export default Sidebar;
