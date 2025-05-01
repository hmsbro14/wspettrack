import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const [mood, setMood] = useState('');
  const [food, setFood] = useState(false);
  const [water, setWater] = useState(false);
  const [poop, setPoop] = useState(false);
  const [weight, setWeight] = useState('');

  const user = auth.currentUser;

  useEffect(() => {
    if (!user) navigate('/');
  }, [user, navigate]);

  const handleSave = async () => {
    try {
      const logRef = doc(db, "users", user.uid, "logs", new Date().toISOString());
      await setDoc(logRef, {
        mood,
        food,
        water,
        poop,
        weight: parseFloat(weight),
        timestamp: serverTimestamp()
      });
      alert("Today's log saved! 🐾");
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>🐶 Welcome to WS PetTrack</h2>

      <div>
        <h4>Mood</h4>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => setMood('happy')}>😺</button>
          <button onClick={() => setMood('neutral')}>😐</button>
          <button onClick={() => setMood('sad')}>😾</button>
        </div>
      </div>

      <div style={{ marginTop: 20 }}>
        <h4>Food Eaten?</h4>
        <button onClick={() => setFood(!food)}>{food ? '✅ Yes' : '❌ No'}</button>
      </div>

      <div style={{ marginTop: 20 }}>
        <h4>Water Drank?</h4>
        <button onClick={() => setWater(!water)}>{water ? '✅ Yes' : '❌ No'}</button>
      </div>

      <div style={{ marginTop: 20 }}>
        <h4>Pooped?</h4>
        <button onClick={() => setPoop(!poop)}>{poop ? '💩 Yes' : '❌ No'}</button>
      </div>

      <div style={{ marginTop: 20 }}>
        <h4>Weight (lbs)</h4>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="e.g. 12.5"
        />
      </div>

      <button style={{ marginTop: 30 }} onClick={handleSave}>
        Save Log
      </button>
    </div>
  );
}

export default Home;
