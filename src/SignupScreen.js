import React, { useState } from 'react';
import './login.css'

const App = () => {
  // Initial data, simulating the contents of "db.csv"
  const initialCsvData = [
    { name: 'John Doe', username: 'user1', password: 'pass1' },
    { name: 'Jane Smith', username: 'user2', password: 'pass2' },
    { name: 'Mark Lee', username: 'user3', password: 'pass3' },
  ];

  const [csvData, setCsvData] = useState(initialCsvData);
  const [name, setName] = useState('');
  const [monkey, setMonkey] = useState('');
  const [monkeyP, setMonkeyP] = useState('');
  const [message, setMessage] = useState('');

  // Add new data to the CSV in memory and remove duplicates
  const handleAddData = () => {
    if (name && monkey && monkeyP) {
      const newData = [...csvData, { name, username: monkey, password: monkeyP }];
      console.log(newData);

      // Remove duplicates based on 'username'
      const uniqueData = newData.filter((value, index, self) =>
        index === self.findIndex((t) => (
          t.username === value.username
        ))
      );

      setCsvData(uniqueData);
      setMessage('Signed Up!');
      setName('');
      setMonkey('');
      setMonkeyP('');
    } else {
      setMessage('Please enter valid inputs.');
    }
  };

  return (
    <div className='bg'>
      <h2 style={styles.header}>Sign Up</h2>

      <div style={styles.formGroup}>
        <label style={styles.label}>name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>email</label>
        <input
          type="text"
          value={monkey}
          onChange={(e) => setMonkey(e.target.value)}
          style={styles.input}
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>password:</label>
        <input
          type="password"
          value={monkeyP}
          onChange={(e) => setMonkeyP(e.target.value)}
          style={styles.input}
        />
      </div>

      <button onClick={handleAddData} style={styles.button}>Sign Up</button>

      <p style={styles.message}>{message}</p>
    </div>
  );
};

// Styles for the UI
const styles = {
  container: {
    maxWidth: '600px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  },
  header: {
    textAlign: 'center',
    color: '#333',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  message: {
    textAlign: 'center',
    fontSize: '16px',
    color: '#333',
    marginTop: '10px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
  tableHeader: {
    backgroundColor: '#f2f2f2',
  },
  tableData: {
    padding: '8px',
    textAlign: 'left',
    border: '1px solid #ccc',
  },
};

export default App;
