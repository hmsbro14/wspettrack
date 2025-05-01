import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Line } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale
} from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale);

function HealthLog() {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    if (!user) return navigate('/');
    const fetchLogs = async () => {
      const colRef = collection(db, 'users', user.uid, 'logs');
      const snap = await getDocs(colRef);
      const entries = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setLogs(entries.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)));
    };
    fetchLogs();
  }, [user, navigate]);

  const weightData = {
    labels: logs.map(l => new Date(l.timestamp?.seconds * 1000).toLocaleDateString()),
    datasets: [{
      label: 'Weight (lbs)',
      data: logs.map(l => l.weight),
      borderColor: 'blue',
      fill: false
    }]
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>📈 Pet Health Graph</h2>
      {logs.length === 0 ? <p>No logs found.</p> : <Line data={weightData} />}
    </div>
  );
}

export default HealthLog;
