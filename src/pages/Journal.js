import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { uploadToImgur } from '../services/uploadToImgur';
import { useNavigate } from 'react-router-dom';

function Journal() {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const [note, setNote] = useState('');
  const [image, setImage] = useState('');
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    if (!user) return navigate('/');
    const fetchEntries = async () => {
      const colRef = collection(db, 'users', user.uid, 'journal');
      const snap = await getDocs(colRef);
      const list = snap.docs.map(doc => doc.data());
      setEntries(list);
    };
    fetchEntries();
  }, [user, navigate]);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const saveEntry = async () => {
    let imgUrl = '';
    if (image) {
      imgUrl = await uploadToImgur(image);
    }
    await addDoc(collection(db, 'users', user.uid, 'journal'), {
      note,
      image: imgUrl || '',
      time: new Date().toISOString()
    });
    setNote('');
    setImage('');
    alert("Journal entry saved.");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>📝 Pet Journal</h2>
      <textarea
        placeholder="What's new with your pet?"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={3}
        style={{ width: '100%' }}
      />
      <input type="file" onChange={handleImage} />
      <button onClick={saveEntry}>Save Entry</button>

      <div style={{ marginTop: 20 }}>
        {entries.map((e, i) => (
          <div key={i} style={{ marginBottom: 10 }}>
            {e.image && <img src={e.image} alt="entry" style={{ maxWidth: 100 }} />}
            <p>{e.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Journal;
