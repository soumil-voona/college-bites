import { useState, useContext } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // Import useLocation
import './login.css'; // Ensure this import is included to load the CSS
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { UserContext } from './UserContext';

function LoginScreen() {
  const auth = getAuth();
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  
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
      const db = getFirestore();
      const userDocRef = doc(db, 'users', response.user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        console.error('No corresponding user file found in Firestore.');
        navigate('/driverPortal'); // Navigate to the extracted 'type' route
      } else {
        console.log('User file exists in Firestore:', userDoc.data());
        setUser(response.user.uid); // Store only uid in context
        navigate('/driverPortal');
      }
      
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
      const db = getFirestore();
      const userDocRef = doc(db, 'users', response.user.uid);
      const userDoc = await getDoc(userDocRef);
      const userData = userDoc.data();
      console.log(response.user.uid);
      console.log('User file exists in Firestore:', userData);
      setUser(response.user.uid); // Store only uid in context
      navigate('/driverPortal');
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

export default LoginScreen;