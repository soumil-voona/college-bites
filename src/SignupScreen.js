import React, { useState } from 'react';

function SignupScreen() {
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
                <input name="confirm-password" type='password' placeholder='Confirm Password'/>
            </div>

            <div>
                <button type="submit">Signup</button>
            </div>

            <div className='line'></div>

            <div>
                <button type='button'>Already have an account? Sign in</button>
            </div>
        </form>
    </div>
  );
}

export default SignupScreen;