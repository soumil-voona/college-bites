import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginScreen from "./LoginScreen";
import SignupScreen from "./SignupScreen";
import Information from "./Information"
import MainWebpage from "./MainWebpage"
import DriverPortal from "./driverPortal";
import Map from "./Map"
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Information />} /> {/* Default route */}
        <Route path="/login" element={<LoginScreen />} /> {/* Login route */}
        <Route path="/signup" element={<SignupScreen />} />
        <Route path="/select" element = {<MainWebpage />} />
        <Route path="/driverPortal" element = {<DriverPortal/>} />
        <Route path="/find" element = {<Map />} />
      </Routes>
    </Router>
  </React.StrictMode>
);