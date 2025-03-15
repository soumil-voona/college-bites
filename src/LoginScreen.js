import { useState } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';

import { useNavigate } from 'react-router-dom';
import './login.css'; // Ensure this import is included to load the CSS
import { getFirestore } from 'firebase/firestore';

function App() {
  const auth = getAuth();
  const navigate = useNavigate();
  
  // State variables for managing authentication state, email, password, and error messages
  const [authing, setAuthing] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const signInWithGoogle = async () => {
    setAuthing(true);
    
    try {
      // Use Firebase to sign in with Google
      const response = await signInWithPopup(auth, new GoogleAuthProvider());
      console.log(response.user.uid);
      navigate('/');
      const user = response.user;
      const displayName = user.displayName;
      const userEmail = user.email;
      alert(`Welcome, ${displayName} (${userEmail})! \n You are now logged in`);
    } catch (error) {
      console.error('Error during sign-in with Google:', error);
      setAuthing(false);
    }
  };

  // Function to handle sign-in with email and password
  const signInWithEmail = async () => {
    setAuthing(true);
    setError('');

    try {
      // Use Firebase to sign in with email and password
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response.user.uid);
      navigate('/');
      const user = response.user;
      // Fetch the user's display name from Firestore
      const userDoc = await getFirestore().collection('users').doc(user.uid).get();
      const displayName = userDoc.data().displayName;
      const userEmail = user.email;
      alert(`Welcome, ${displayName} (${userEmail})! \n You are now logged in`);
      setAuthing(false);
    } catch (error) {
      console.error('Error during sign-in with email and password:', error);
      setError(error.message);
      setAuthing(false);
    }
  };

  return (
    <div className="bg">
      <div className="login">
        <h1 className="loginTxt">Login</h1>

        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="inputField"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="inputField password"
        />

        <button 
          className="loginBtn" 
          onClick={signInWithEmail}
          disabled={authing}>
            Log In With Email and password
        </button>
        {error && <div className='text-red-500 mb-4'>{error}</div>}

        <button 
          className="loginBtn-Google" 
          onClick={signInWithGoogle}
          disabled={authing}>
            Log In With Google
        </button>

        <a href = '/signup'> <div className="signup">Don't have an account? Sign up here</div> </a>
      </div>
    </div>
  );
}

export default App;