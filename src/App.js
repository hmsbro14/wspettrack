import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import DoggiChat from './pages/DoggiChat';
import PetProfile from './pages/PetProfile';
import HealthLog from './pages/HealthLog';
import Journal from './pages/Journal';
import Reminders from './pages/Reminders';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/doggi" element={<DoggiChat />} />
        <Route path="/pet" element={<PetProfile />} />
        <Route path="/health" element={<HealthLog />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/reminders" element={<Reminders />} />
      </Routes>
    </Router>
  );
}

export default App;
