import React, { useState } from 'react';
import { auth } from '../firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const provider = new GoogleAuthProvider();

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate('/home');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate('/home');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 400, margin: 'auto' }}>
      <h2>{isRegistering ? 'Create Account' : 'Login to WS PetTrack'}</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '100%', marginBottom: 10 }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', marginBottom: 10 }}
        />

        <button type="submit" style={{ width: '100%' }}>
          {isRegistering ? 'Register' : 'Login'}
        </button>
      </form>

      <button onClick={handleGoogleLogin} style={{ width: '100%', marginTop: 10 }}>
        Sign in with Google
      </button>

      <p style={{ marginTop: 10 }}>
        {isRegistering ? (
          <span onClick={() => setIsRegistering(false)} style={{ cursor: 'pointer' }}>
            Already have an account? Login
          </span>
        ) : (
          <span onClick={() => setIsRegistering(true)} style={{ cursor: 'pointer' }}>
            Need an account? Register
          </span>
        )}
      </p>
    </div>
  );
}

export default Login;
