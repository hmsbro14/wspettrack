import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Welcome to WS PetTrack</h1>
      <p>Track your pet's health, mood, and more.</p>
      <Link to="/doggi">Talk to Doggi</Link>
    </div>
  );
}

export default Home;
