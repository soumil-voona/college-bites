import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import LoginScreen from "./LoginScreen";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} /> {/* Default route */}
        <Route path="/login" element={<LoginScreen />} /> {/* Login route */}
      </Routes>
    </Router>
  </React.StrictMode>
);