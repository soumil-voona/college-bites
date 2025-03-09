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

      </div>
    </div>
  );
};

export default SignUp;