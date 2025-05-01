import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { uploadToImgur } from '../services/uploadToImgur';
import { useNavigate } from 'react-router-dom';

function PetProfile() {
  const navigate = useNavigate();
  const user = auth.currentUser;

  const [petData, setPetData] = useState({
    name: '',
    breed: '',
    age: '',
    weight: '',
    photoUrl: ''
  });

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
    const fetchPet = async () => {
      const petRef = doc(db, 'users', user.uid, 'profile', 'pet');
      const docSnap = await getDoc(petRef);
      if (docSnap.exists()) {
        setPetData(docSnap.data());
      }
    };
    fetchPet();
  }, [user, navigate]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = async () => {
      const imgurUrl = await uploadToImgur(reader.result);
      if (imgurUrl) {
        setPetData(prev => ({ ...prev, photoUrl: imgurUrl }));
      } else {
        alert("Image upload failed.");
      }
    };
    reader.readAsDataURL(file);
  };

  const saveProfile = async () => {
    try {
      const petRef = doc(db, 'users', user.uid, 'profile', 'pet');
      await setDoc(petRef, petData);
      alert('Pet profile saved! 🐾');
    } catch (err) {
      console.error(err);
      alert("Couldn't save profile.");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>🐾 Pet Profile</h2>

      {petData.photoUrl && (
        <img src={petData.photoUrl} alt="Pet" style={{ maxWidth: '100px', borderRadius: 8 }} />
      )}
      <input type="file" onChange={handleImageUpload} />

      <input
        type="text"
        placeholder="Pet's Name"
        value={petData.name}
        onChange={(e) => setPetData({ ...petData, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Breed"
        value={petData.breed}
        onChange={(e) => setPetData({ ...petData, breed: e.target.value })}
      />
      <input
        type="number"
        placeholder="Age"
        value={petData.age}
        onChange={(e) => setPetData({ ...petData, age: e.target.value })}
      />
      <input
        type="number"
        placeholder="Weight (lbs)"
        value={petData.weight}
        onChange={(e) => setPetData({ ...petData, weight: e.target.value })}
      />

      <button style={{ marginTop: 20 }} onClick={saveProfile}>
        Save Profile
      </button>
    </div>
  );
}

export default PetProfile;
