import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import LoginScreen from "./LoginScreen";
import SignupScreen from "./SignupScreen";
import Information from "./Information"
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} /> {/* Default route */}
        <Route path="/login" element={<LoginScreen />} /> {/* Login route */}
        <Route path="/signup" element={<SignupScreen />} />
        <Route path="/info" element = {<Information />} />
      </Routes>
    </Router>
  </React.StrictMode>
);