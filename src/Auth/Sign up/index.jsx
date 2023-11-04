import React, { useState } from "react";
import orange from "../../img/orange.png";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [gender, setGender] = useState("");

  const signUpContainerStyle = {
    maxWidth: "400px",
    maxHeight: "450px",
    marginTop: "150px",
    marginLeft: "850px",
    padding: "20px",
    border: "1px solid #ccc",
    boxShadow: "0 0 5px rgba(128, 128, 128, 0.5)",
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

  const buttonSignUpStyle = {
    backgroundColor: "#f97707",
    color: "#fff",
    border: "none",
    margin: "20px 0",
    padding: "10px 0",
    width: "100%",
    cursor: "pointer",
    borderRadius: "5px",
    fontSize: "20px",
  };

  const Image = {
    position: "absolute",
    top: "150px",
    left: "150px",
    width: "150px",
    height: "150px",
    backgroundColor: "#f5f5f5",
  };

  const Name = {
    position: "absolute",
    top: "200px",
    left: "300px",
    color: "#f97707",
    fontFamily: "Pacifico, cursive",
  };

  const Slogan = {
    position: "absolute",
    top: "250px",
    left: "300px",
    color: "#f97707",
    fontFamily: "Pacifico, cursive",
  };

  return (
    <div
      style={{ backgroundColor: "#f5f5f5", height: "100vh", display: "flex" }}
    >
      <img src={orange} style={Image} alt="Orange" />
      <h1 style={Name}>Orange Twitter</h1>
      <h3 style={Slogan}>Just an orange</h3>
      <div style={signUpContainerStyle}>
        <input
          type="text"
          placeholder="Full Name"
          style={inputStyle}
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

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

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <select
            style={{ ...inputStyle, width: "30%" }}
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          >
            <option value="">Month</option>
            <option value="01">January</option>
            <option value="02">February</option>
            <option value="03">March</option>
            <option value="04">April</option>
            <option value="05">May</option>
            <option value="06">June</option>
            <option value="07">July</option>
            <option value="08">August</option>
            <option value="09">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>

          <select
            style={{ ...inputStyle, width: "30%" }}
            value={day}
            onChange={(e) => setDay(e.target.value)}
          >
            <option value="">Day</option>
            {Array.from({ length: 31 - 0 }, (_, index) => (
              <option key={index} value={1 + index}>
                {1 + index}
              </option>
            ))}
          </select>

          <select
            style={{ ...inputStyle, width: "30%", color: "black" }}
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            <option value="">Year</option>
            {Array.from({ length: 2005 - 1903 }, (_, index) => (
              <option key={index} value={2005 - index}>
                {2005 - index}
              </option>
            ))}
          </select>
        </div>

        <select
          style={inputStyle}
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="">Gender</option>
          <option value="M">Male</option>
          <option value="F">Female</option>
          <option value="O">Other</option>
        </select>

        <button style={buttonSignUpStyle}>Sign up</button>
      </div>
    </div>
  );
}

export default SignUp;
