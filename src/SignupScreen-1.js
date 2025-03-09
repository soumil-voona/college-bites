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

  return (
    <div className='bg'>
        <form className='login' onSubmit={handleSubmit}>
            <h2 className='loginTxt'>Sign Up</h2>
            <p className='txt'>Create a new account</p>
            <div>
                <input className = 'inputField email' name="email" type='email' placeholder='phone number' />
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