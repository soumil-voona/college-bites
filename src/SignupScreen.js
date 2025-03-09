import React, { useState } from 'react';
import './login.css';  

function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Username:', username, 'Password:', password);
  };
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
    <div className = 'bg'>
        <form className = 'login'>
            <h2 className = 'loginTxt'>Sign Up</h2>
            <p className = 'txt'>Create a new account</p>
            <div>
                <input className = 'inputField email' name="email" type='email' placeholder='email' />
            </div>

            <div>
                <input className = 'inputField password' name="password" type='password' placeholder='password'/>
            </div>

            <div>
                <input className = 'inputField name' name="name" type='name' placeholder='name'/>
            </div>

            <div>
                <button className = 'loginBtn signUp' type="submit">sign up</button>
            </div>

        </form>
    </div>
  );
}

export default LoginScreen;