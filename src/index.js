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
import { UserProvider } from './UserContext';
import Checkout from "./Checkout";

const firebaseConfig = {
  apiKey: "AIzaSyBdWHhBZnaeHzi0WhXdL7yVN_zc3Ykej0Y",
  authDomain: "college-bites-1.firebaseapp.com",
  projectId: "college-bites-1",
  storageBucket: "college-bites-1.firebasestorage.app",
  messagingSenderId: "80752326422",
  appId: "1:80752326422:web:46949a7765f354ccc00237",
  measurementId: "G-BZJZP9TR23"
};

initializeApp(firebaseConfig);


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Information />} /> {/* Default route */}
          <Route path="/login" element={<LoginScreen />} /> {/* Login route */}
          <Route path="/signup" element={<SignupScreen />} />
          <Route path="/select" element={<MainWebpage />} />
          <Route path="/driverPortal" element={<DriverPortal />} />
          <Route path="/find" element={<Map />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </Router>
    </UserProvider>
  </React.StrictMode>
);