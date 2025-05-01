import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DoggiChat from './pages/DoggiChat';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doggi" element={<DoggiChat />} />
      </Routes>
    </Router>
  );
}

export default App;
