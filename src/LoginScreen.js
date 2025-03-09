import React, { useState } from 'react';
import './login.css'

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
    <div className = 'bg'>
        <form className = 'login'>
            <h2 className = 'loginTxt'>Login</h2>
            <p className = 'txt'>Connect back to your account</p>
            <div>
                <input className = 'inputField email' name="email" type='email' placeholder='email address' />
            </div>

            <div>
                <input className = 'inputField password' name="password" type='password' placeholder='password'/>
            </div>

            <p className = 'forgotPwd txt'>forgot password?</p>
            <div>
                <button className = 'loginBtn' type="submit">log in</button>
            </div>

            <div>
                <p className = 'signup txt'>or sign up </p>
            </div>
        </form>
    </div>
  );
}

export default LoginScreen;