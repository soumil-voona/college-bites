import React, { useState, useEffect } from "react";

const SignUp = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([
    { name: "John Doe", username: "user1", password: "pass1" },
    { name: "Jane Smith", username: "user2", password: "pass2" },
    { name: "Mark Lee", username: "user3", password: "pass3" },
  ]);

  useEffect(() => {
    console.log("Current Users Data:", users);
  }, [users]);

  const handleSignUp = () => {
    if (name && username && password) {
      const newUser = { name, username, password };
      
      setUsers((prevUsers) => {
        const updatedUsers = [...prevUsers, newUser].filter(
          (user, index, self) =>
            index === self.findIndex((u) => u.username === user.username)
        );
        return updatedUsers;
      });

      setMessage("Signed Up!");
      setName("");
      setUsername("");
      setPassword("");
    } else {
      setMessage("Please enter valid inputs.");
    }
  };

  return (
    <div style={{ width: "100vw", height: "100%", backgroundColor: "#E0BABB" }}>
      <div style={{
        width: "50%",
        marginLeft: "25%",
        position: "absolute",
        height: "60vh",
        backgroundColor: "#F5DEDF",
        marginTop: "17.5vh",
        borderRadius: "10px",
        textAlign: "center"
      }}>
        <h2 style={{ fontFamily: "Poppins", fontSize: "4.5rem", marginTop: "2vh" }}>Sign Up</h2>
        <p style={{ fontFamily: "Poppins" }}>Connect with us!</p>

        <input
          type="text"
          style={{
            width: "40vw", height: "6vh", margin: "4vh 4vw", paddingLeft: "10px",
            border: "1.5px solid black", borderRadius: "10px", fontSize: "15px"
          }}
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          style={{
            width: "40vw", height: "6vh", margin: "4vh 4vw", paddingLeft: "10px",
            border: "1.5px solid black", borderRadius: "10px", fontSize: "15px"
          }}
          placeholder="Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          style={{
            width: "40vw", height: "6vh", margin: "4vh 4vw", paddingLeft: "10px",
            border: "1.5px solid black", borderRadius: "10px", fontSize: "15px"
          }}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          style={{
            backgroundColor: "#510104", color: "white", fontSize: "2rem", padding: "10px 20px",
            borderRadius: "20px", border: "none", marginTop: "1rem"
          }}
          onClick={handleSignUp}
        >
          Sign Up
        </button>

        <p style={{ cursor: "pointer", color: "rgba(81, 1, 4, 0.63)", fontSize: "1rem" }} onClick={() => alert("Switch to Login")}>
          Already have an account? Login
        </p>
        <p style={{ fontFamily: "Poppins", color: "#510104" }}>{message}</p>

        {/* PyScript Integration */}
        <script defer src="https://pyscript.net/latest/pyscript.js"></script>
        <py-script>
import pandas as pd
from js import document

initial_csv_data = [
    ['John Doe', 'user1', 'pass1'],
    ['Jane Smith', 'user2', 'pass2'],
    ['Mark Lee', 'user3', 'pass3']
]

csv_data = pd.DataFrame(initial_csv_data, columns=['name', 'username', 'password'])

def handle_add_data(event):
    name = document.getElementById("name").value
    username = document.getElementById("username").value
    password = document.getElementById("password").value
    message = document.getElementById("message")

    if name and username and password:
        new_data = pd.DataFrame([[name, username, password]], columns=['name', 'username', 'password'])
        global csv_data
        csv_data = pd.concat([csv_data, new_data], ignore_index=True)
        csv_data = csv_data.drop_duplicates(subset='username')
        message.innerHTML = 'Signed Up!'
        print(csv_data)
    else:
        message.innerHTML = 'Please enter valid inputs.'

sign_up_btn = document.getElementById('signUpBtn')
sign_up_btn.addEventListener('click', handle_add_data)
        </py-script>
      </div>
    </div>
  );
};

export default SignUp;
