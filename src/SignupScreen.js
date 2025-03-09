import React, { useState } from 'react';
import './login.css'; // Ensure this path is correct

const App = () => {
  // Initial data, simulating the contents of "db.csv"
  const initialCsvData = [
    { name: 'John Doe', username: 'user1', password: 'pass1' },
    { name: 'Jane Smith', username: 'user2', password: 'pass2' },
    { name: 'Mark Lee', username: 'user3', password: 'pass3' },
  ];

  const [csvData, setCsvData] = useState(initialCsvData);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  // Add new data to the CSV in memory and remove duplicates
  const handleAddData = () => {
    if (name && username && password) {
      const newData = [...csvData, { name, username, password }];
      console.log(newData);

      // Remove duplicates based on 'username'
      const uniqueData = newData.filter((value, index, self) =>
        index === self.findIndex((t) => t.username === value.username)
      );

      setCsvData(uniqueData);
      setMessage('Signed Up!');
      setName('');
      setUsername('');
      setPassword('');
    } else {
      setMessage('Please enter valid inputs.');
    }
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

        <p className="signup" onClick={() => setMessage('Switch to Login')}>
          Already have an account? Login
        </p>

        <p className="txt">{message}</p>
      </div>
    </div>
  );
};

export default App;
