import { useState, useEffect } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { getFirestore, doc, setDoc } from 'firebase/firestore'; // Import Firestore
import './SignupScreen.css'; // Import the CSS file

const SignupScreen = () => {
    // Initialize Firebase authentication, Firestore, and navigation
    const auth = getAuth();
    const db = getFirestore(); // Initialize Firestore
    const navigate = useNavigate();
    
    // State variables for managing authentication state, email, password, confirm password, and error messages
    const [authing, setAuthing] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [name, setName] = useState(''); // Add state for name

    // Function to handle sign-up with Google
    const signUpWithGoogle = async () => {
        setAuthing(true);
        
        // Use Firebase to sign up with Google
        signInWithPopup(auth, new GoogleAuthProvider())
            .then(response => {
                console.log(response.user.uid);
                navigate('/login');
            })
            .catch(error => {
                console.log(error);
                setAuthing(false);
            });
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const name = user.displayName;
                const uid = user.uid;

                const docRef = doc(db, "users", uid);
                await setDoc(docRef, {
                    name: name,
                    email: user.email,
                    createdAt: new Date()
                    // Add other user data as needed
                });
            }
        });

        return () => unsubscribe();
    }, [auth, db]);

    // Function to handle sign-up with email and password
    const signUpWithEmail = async () => {
        // Check if passwords match

        setAuthing(true);
        setError('');

        try {
            // Use Firebase to create a new user with email and password
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response.user.uid);

            // Add user data to Firestore with retry logic
            const addUserToFirestore = async () => {
              await setDoc(doc(db, 'users', response.user.uid), {
                  name: name,
                  email: email,
                  createdAt: new Date()
              });
              navigate('/login');
            };

            await addUserToFirestore();
        } catch (error) {
            console.error('Error creating user:', error);
            setError(error.message);
            setAuthing(false);
        }
    };

    return (
        <div className="container">
            <div className="signup-box">
                <h2 className="signup-title">Sign Up</h2>

                <input
                    type="text"
                    className="input-field"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type='email'
                    placeholder="Email"
                    className="input-field"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder='Password'
                    className="input-field"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {error && <div className="error-message">{error}</div>}

                <button
                    className="signup-button"
                    onClick={signUpWithEmail}
                    disabled={authing}
                >
                    Sign Up With Email and Password
                </button>
                <br />
                <button
                    className="signup-button-google"
                    onClick={signUpWithGoogle}
                    disabled={authing}
                >
                    Sign Up With Google
                </button>
                <a href = '/login'>
                <p className="login-link">
                    Already have an account? Login
                </p>
                </a>
            </div>
        </div>
    );
};

export default SignupScreen;