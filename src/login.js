import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import './login.css'; // Ensure this import is included to load the CSS

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("db.csv") // Assuming the db.csv file is in the public folder
      .then((response) => response.text())
      .then((text) => {
        Papa.parse(text, {
          header: true,
          complete: (results) => {
            setUsers(results.data);
          },
        });
      });
  }, []);

  const handleSignUp = () => {
    if (name && email && password) {
      const newUser = { name, email, password };

      // Append new user data to the current users list
      const updatedUsers = [...users, newUser].filter(
        (user, index, self) =>
          index === self.findIndex((u) => u.email === user.email)
      );

      // Update the state
      setUsers(updatedUsers);
      setMessage("Signed Up!");

      // Clear input fields
      setName("");
      setEmail("");
      setPassword("");

      // Convert updated users list to CSV and simulate updating the database
      const csv = Papa.unparse(updatedUsers);
      
      // Here you would normally send the updated CSV to a server, but this is a mock implementation
      // Since we don't want to allow downloading or viewing the CSV, we simply log it
      console.log(csv);
    } else {
      setMessage("Please enter valid inputs.");
    }
  };

  return (
    <div className="bg">
      <div className="login">
        <h2 className="loginTxt">Sign Up</h2>
        <p className="connectTxt">Connect with us!</p>

        <input
          type="text"
          className="inputField name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          className="inputField"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="inputField password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="loginBtn" onClick={handleSignUp}>
          Sign Up
        </button>

        <p
          className="signup"
          onClick={() => alert("Switch to Login")}
        >
          Already have an account? Login
        </p>

        <p className="txt">{message}</p>
      </div>
    </div>
  );
};

export default SignUp;
