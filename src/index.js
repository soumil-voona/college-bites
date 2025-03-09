import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginScreen from "./LoginScreen";
import SignupScreen from "./SignupScreen";
import Information from "./Information"
import MainWebpage from "./MainWebpage"
import DriverPortal from "./driverPortal";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<MainWebpage />} /> {/* Default route */}
        <Route path="/login" element={<LoginScreen />} /> {/* Login route */}
        <Route path="/signup" element={<SignupScreen />} />
        <Route path="/info" element = {<Information />} />
        <Route path="/driverPortal" element = {<DriverPortal/>} />
      </Routes>
    </Router>
  </React.StrictMode>
);