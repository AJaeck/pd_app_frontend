import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import CreateNewUser from './CreateNewUser';
import UserProfile from './UserProfile';
import LoadUserProfile from './LoadUserProfile';
import NewSpeechTest from './NewSpeechTest';
import NewTapTest from './NewTapTest';
import Results from "./Results";
import SpeechResults from "./SpeechResults";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/create-user" element={<CreateNewUser />} />
                <Route path="/load-user" element={<LoadUserProfile />} />
                <Route path="/user-profile/:userId" element={<UserProfile />} />
                <Route path="/new-tap-test/:userId" element={<NewTapTest />} />
                <Route path="/new-speech-test/:taskType/:userId" element={<NewSpeechTest />} />
                <Route path="/results/:userId" element={<Results />} />
                <Route path="/speech-results/:userId" element={<SpeechResults />} />
                {/* ... other routes */}
            </Routes>
        </Router>
    );
}

export default App;
