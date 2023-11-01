import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import CreateNewUser from './CreateNewUser';
import UserProfile from './UserProfile';
import LoadUserProfile from './LoadUserProfile';
import NewTest from './NewTest';
import Results from "./Results";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/create-user" element={<CreateNewUser />} />
                <Route path="/load-user" element={<LoadUserProfile />} />
                <Route path="/user-profile/:userId" element={<UserProfile />} />
                <Route path="/new-test/:userId" element={<NewTest />} />
                <Route path="/results/:userId" element={<Results />} />
                {/* ... other routes */}
            </Routes>
        </Router>
    );
}

export default App;

