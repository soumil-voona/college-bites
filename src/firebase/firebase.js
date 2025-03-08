// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBMDzUaiULEETQ8WR-lpCzPKhx2oi6Nx4o",
  authDomain: "college-bites.firebaseapp.com",
  projectId: "college-bites",
  storageBucket: "college-bites.firebasestorage.app",
  messagingSenderId: "1089562287053",
  appId: "1:1089562287053:web:1fdfeda32713c642380284",
  measurementId: "G-RXPQYDKVEY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export {app, auth};