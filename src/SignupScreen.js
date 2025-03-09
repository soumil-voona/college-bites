import React, { useState } from 'react';
import './login.css';

const App = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  // Send data to the backend
  const handleAddData = async () => {
    if (name && username && password) {
      const newData = { name, username, password };

      try {
        const response = await fetch('http://localhost:5000/add-data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newData),
        });

        if (response.ok) {
          setMessage('Data added successfully!');
          setName('');
          setUsername('');
          setPassword('');
        } else {
          setMessage('Failed to add data.');
        }
      } catch (error) {
        setMessage('Error: ' + error.message);
      }
    } else {
      setMessage('Please enter valid inputs.');
    }
  };

  // Download the updated db.csv file
  const handleDownloadCSV = () => {
    window.open('http://localhost:5000/download-csv', '_blank');
  };

  return (
    <div className="bg">
      <div className="login">
        <h2 className="loginTxt">Sign Up</h2>
        <p className="connectTxt">Connect with us!</p>

        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="inputField"
            placeholder="Name"
          />
        </div>

        <div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="inputField password"
            placeholder="Email"
          />
        </div>

        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="inputField password"
            placeholder="Password"
          />
        </div>

        <button onClick={handleAddData} className="loginBtn signUp">
          Sign Up
        </button>

        <button onClick={handleDownloadCSV} className="loginBtn" style={{ marginTop: '20px' }}>
          Download Updated db.csv
        </button>

        <p className="signup" onClick={() => setMessage('Switch to Login')}>
          Already have an account? Login
        </p>

        <p className="txt">{message}</p>
      </div>
    </div>
  );
};

export default App;
