import React, { useState, useEffect } from 'react';
import './login.css'; // Ensure this import is included to load the CSS

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [csvData, setCsvData] = useState([]);

  // Fetch and parse the CSV data from the db.csv file
  useEffect(() => {
    fetch('/db.csv')
      .then((response) => response.text())
      .then((data) => {
        const parsedData = parseCSV(data);
        setCsvData(parsedData);
      })
      .catch((error) => {
        console.error('Error fetching CSV:', error);
      });
  }, []);

  // Simple CSV parser function
  const parseCSV = (csvText) => {
    const rows = csvText.split('\n');
    const data = rows.map((row) => {
      const columns = row.split(',');
      return {
        username: columns[0].trim(),
        password: columns[1].trim(),
      };
    });
    return data;
  };

  // Handle login attempt
  const handleLogin = () => {
    const user = csvData.find(
      (userData) => userData.username === username && userData.password === password
    );
    if (user) {
      setMessage('Success, iniyann!');
    } else {
      setMessage('Invalid credentials, please try again.');
    }
  };

  return (
    <div className="bg">
      <div className="login">
        <h1 className="loginTxt">Login</h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="inputField"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="inputField password"
        />
        <div className="forgotPw">Forgot Password?</div>
        <button className="loginBtn" onClick={handleLogin}>Login</button>

        {message && (
          <p style={{ textAlign: 'center', color: message.includes('Success') ? 'green' : 'red' }}>
            {message}
          </p>
        )}

        <div className="signup">Don't have an account? Sign up here</div>
      </div>
    </div>
  );
}

export default App;
