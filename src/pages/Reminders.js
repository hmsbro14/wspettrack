import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function Reminders() {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const [reminder, setReminder] = useState('');
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    if (!user) return navigate('/');
    const fetchReminders = async () => {
      const colRef = collection(db, 'users', user.uid, 'reminders');
      const snap = await getDocs(colRef);
      const entries = snap.docs.map(doc => doc.data().text);
      setReminders(entries);
    };
    fetchReminders();
  }, [user, navigate]);

  const addReminder = async () => {
    if (!reminder.trim()) return;
    await addDoc(collection(db, 'users', user.uid, 'reminders'), { text: reminder });
    setReminder('');
    setReminders(prev => [...prev, reminder]);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>⏰ Pet Reminders</h2>
      <input
        type="text"
        placeholder="e.g. Vet visit next week"
        value={reminder}
        onChange={(e) => setReminder(e.target.value)}
      />
      <button onClick={addReminder}>Add Reminder</button>
      <ul>
        {reminders.map((r, i) => <li key={i}>📌 {r}</li>)}
      </ul>
    </div>
  );
}

export default Reminders;
