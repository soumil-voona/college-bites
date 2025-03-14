import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginScreen from "./LoginScreen";
import Information from "./Information";
import MainWebpage from "./MainWebpage";
import DriverPortal from "./driverPortal";
import Map from "./Map";
import SignupScreen from "./SignupScreen"
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyA3apLDGnUGwVZ_OZ6JIL4rPkngNsED-J0",
  authDomain: "authentication-c025c.firebaseapp.com",
  projectId: "authentication-c025c",
  storageBucket: "authentication-c025c.firebasestorage.app",
  messagingSenderId: "1027056621683",
  appId: "1:1027056621683:web:2dfa244f85768da3fbb206"
};

initializeApp(firebaseConfig);


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Information />} /> {/* Default route */}
        <Route path="/login" element={<LoginScreen />} /> {/* Login route */}
        <Route path="/signup" element={<SignupScreen />} />
        <Route path="/select" element={<MainWebpage />} />
        <Route path="/driverPortal" element={<DriverPortal />} />
        <Route path="/find" element={<Map />} />
      </Routes>
    </Router>
  </React.StrictMode>
);