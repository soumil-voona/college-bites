import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "",
  authDomain: "collegebites-eb1a0.firebaseapp.com",
  projectId: "collegebites-eb1a0",
  storageBucket: "collegebites-eb1a0.firebasestorage.app",
  messagingSenderId: "",
  appId: "",
  measurementId: "G-YWWBQXVZ6N"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)



export { app, auth };
