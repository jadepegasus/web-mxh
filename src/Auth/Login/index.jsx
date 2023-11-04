import React, { useState } from "react";
import orange from "../../img/orange.png"
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  document.title='Log in or Sign up'

  const loginContainerStyle = {
    maxWidth: "400px",
    maxHeight: '350px',
    marginTop: "150px",
    marginLeft: "850px",
    padding: "20px",
    border: "1px solid #ccc",
    boxShadow: '0 0 5px rgba(128, 128, 128, 0.5)',
    borderRadius: "5px",
    textAlign: "center",
    backgroundColor: "white",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
  };

  const buttonLoginStyle = {
    backgroundColor: "#f97707",
    color: "#fff",
    border: "none",
    padding: "10px 0",
    width:'100%',
    cursor: "pointer",
    borderRadius: "5px",
    fontSize: '20px'
  };
  const buttonSignupStyle = {
    backgroundColor: "#f97707",
    color: "#fff",
    border: "none",
    padding: "10px 0",
    width:'50%',
    cursor: "pointer",
    borderRadius: "5px",
  };
  const Image = {
    position: 'absolute',
    top:'150px',
    left:'150px',
    width:'150px', 
    height:'150px', 
    backgroundColor:'#f5f5f5'
  };
  const Name = {
    position: 'absolute',
    top: '200px',
    left: '300px',
    color: '#f97707',
    fontFamily: "Pacifico, cursive",
  };
  const Slogan = {
    position: 'absolute',
    top: '250px',
    left: '300px',
    color: '#f97707',
    fontFamily: "Pacifico, cursive",
  }

  const handleLogin = () => {
  };

  return (
    <div
      style={{ backgroundColor: "#f5f5f5", height: "100vh", display: "flex" }}
    >
      <img src={orange} style={Image} alt="Orange" />
      <h1 style={Name}>Orange Twitter</h1>
      <h3 style={Slogan}>Just an orange</h3>
      <div style={loginContainerStyle}>
        <input
          type="text"
          placeholder="Email address or phone number"
          style={inputStyle}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          style={inputStyle}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={buttonLoginStyle} onClick={handleLogin}>
          Log in
        </button>
        <br />

        <div style={{ cursor: "pointer", marginTop: "20px" }}>
          Forgotten password?
        </div>

        <div style={{ textDecoration: "line-through", color: "red" }}></div>

        <div style={{ border: "1px solid #c1c1c1", margin: "20px" }}></div>

        <button style={buttonSignupStyle}>Create new account</button>
      </div>
    </div>
  );
}

export default Login;
