import React, { useState } from 'react';
import axios from 'axios';

function DoggiChat() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleSend = async () => {
    try {
      const res = await axios.post('https://heycarl.pythonanywhere.com/ask-doggi', { message });
      setResponse(res.data.reply);
    } catch (err) {
      setResponse('Something went wrong. Try again later.');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Doggi — AI Pet Assistant</h2>
      <textarea
        placeholder="Ask Doggi anything about your pet..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={4}
        style={{ width: '100%', marginBottom: 10 }}
      />
      <button onClick={handleSend}>Send</button>
      <div style={{ marginTop: 20 }}>
        <strong>Doggi says:</strong>
        <p>{response}</p>
      </div>
    </div>
  );
}

export default DoggiChat;
