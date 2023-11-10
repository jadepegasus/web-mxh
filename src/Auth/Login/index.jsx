import React, { useState, useCallback } from "react";
import orange from "../../img/orange.png";
import googleIcon from "../../img/google-18px.svg";
import facebookIcon from "../../img/facebook-18px.svg";
import HomePage from "../../components/homePage/HomePage";
import SignUp from "../Signup";

const loginContainerStyle = {
  width: "95%",
  maxWidth: "464.4px",
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  padding: "20px",
  border: "1px solid #ccc",
  boxShadow: "0 0 5px rgba(128, 128, 128, 0.5)",
  borderRadius: "5px",
  textAlign: "center",
  backgroundColor: "white",
  marginTop: '20px'
};
 
const logo = {
  with: "100%",
  maxWidth: "464.4px",
  position: "fixed",
  left: "50%",
  transform:"translateX(-50%)",
}

const inputStyle = {
  width: "95%",
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
  width: "100%",
  cursor: "pointer",
  borderRadius: "5px",
  fontSize: "20px",
};
const buttonSignupStyle = {
  backgroundColor: "#f97707",
  color: "#fff",
  border: "none",
  padding: "10px 0",
  width: "50%",
  cursor: "pointer",
  borderRadius: "5px",
};
const Image = {
  width: "150px",
  height: "150px",
  backgroundColor: "#f5f5f5",
};
const Name = {
  color: "#f97707",
  fontFamily: "Pacifico, cursive",
};
const Slogan = {
  color: "#f97707",
  fontFamily: "Pacifico, cursive",
};

const Icon = {
  left: "16px",
  top: "50%",
  transform: "translateY(-50%)"
}

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);
  const [signup, setSignup] = useState(false);
  const [err, setErr] = useState('')
  document.title = "Log in or Sign up";

  const handleLogin = useCallback((user_email, user_password) => {
    fetch('/auth/password', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({user_email,user_password})
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      setLogin(data?.status === 'success')
      if (data?.status === 'fail') setErr(data.message)
    })
    .catch(err => console.log(err))

},[])
  
  const authButton = (type) => {
    window.location.href = 'https://localhost:8080/auth/' + type
  }
  if (signup) return <SignUp />
  if (!login) return (
    <div
      style={{ backgroundColor: "#f5f5f5", height: "100vh", display: "flex" }}
    >
      {/* <img src={orange} style={Image} alt="Orange" />
      <h1 style={Name}>Orange Twitter</h1>
      <h3 style={Slogan}>Just an orange</h3> */}
      <div style={logo} className="d-flex justify-content-start align-items-center">
        <img src={orange} style={Image} alt="Orange" />
        <div>
          <h1 style={Name}>Orange Twitter</h1>
          <h3 style={Slogan}>Just an orange</h3>
        </div>
      </div>
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
        <span className="text-danger">{err}</span>
        <button style={buttonLoginStyle} onClick={() => handleLogin(email, password)}>
          Log in
        </button>
        <br />

        <div style={{ cursor: "pointer", marginTop: "20px" }}>
          Forgotten password?
        </div>

        <div style={{ textDecoration: "line-through", color: "red" }}></div>

        <div style={{ border: "1px solid #c1c1c1", margin: "20px" }}></div>

        <button style={buttonSignupStyle} onClick={() => setSignup(true)}>Create new account</button>
        <div className="mt-3">
        <button className="btn btn-light border border-2 rounded-pill w-75 position-relative" onClick={() => authButton('google')}>
          <img className="position-absolute" style={Icon} src={googleIcon} alt="Google" />
          <span className="ms-3" style={{fontWeight:'bold', color:'#444444'}}>Continue with Google</span>
          </button>
        <button className="btn btn-light border border-2 rounded-pill w-75 mt-2 position-relative" onClick={() => authButton('facebook')}>
          <img className="position-absolute" style={Icon} src={facebookIcon} alt="Facebook" />
          <span className="ms-3" style={{fontWeight:'bold', color:'#444444'}}>Continue with Facebook</span>
          </button>
        </div>


      </div>
    </div>
  )
  return <HomePage />
}

export default Login;
