import React, { useState } from 'react';

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
    <div>
        <form style={{ backgroundColor: "#F6F6F6" , borderRadius: "10px" }}>
            <div>
                <input name="email" type='email' placeholder='Enter Email Address' />
            </div>

            <div>
                <input name="password" type='password' placeholder='Enter Password'/>
            </div>

            <div>
                <button type="submit">Login</button>
            </div>

            <div>
                <button type='button'>Forgot Password?</button>
            </div>

            <div className='line'></div>

            <div>
                <button type='button'>Create New Account</button>
            </div>
        </form>
    </div>
  );
}

export default LoginScreen;