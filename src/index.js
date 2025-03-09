import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginScreen from "./LoginScreen";
import SignupScreen from "./SignupScreen";
import Information from "./Information"
import MainWebpage from "./MainWebpage"
import DriverPortal from "./driverPortal";
<<<<<<< HEAD
=======
import Map from "./Map"
>>>>>>> be708728af84ff79ee5bfe71df7f13cd8904d749
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Information />} /> {/* Default route */}
        <Route path="/login" element={<LoginScreen />} /> {/* Login route */}
        <Route path="/signup" element={<SignupScreen />} />
<<<<<<< HEAD
        <Route path="/info" element = {<Information />} />
        <Route path="/driverPortal" element = {<DriverPortal/>} />
=======
        <Route path="/select" element = {<MainWebpage />} />
        <Route path="/driverPortal" element = {<DriverPortal/>} />
        <Route path="/find" element = {<Map />} />
>>>>>>> be708728af84ff79ee5bfe71df7f13cd8904d749
      </Routes>
    </Router>
  </React.StrictMode>
);