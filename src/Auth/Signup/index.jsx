import React, { useState } from "react";
import orange from "../../img/orange.png";
import Login from "../Login";
import Home from "../../components/pages/Home";
import { validateEmail, validatePassword } from "../../unity/validate";

const signUpContainerStyle = {
  width: "95%",
  maxWidth: "464.4px",
  // maxHeight: '350px',
  // marginTop: "150px",
  // marginLeft: "850px",
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
  marginTop: "40px",
};

const logo = {
  with: "100%",
  maxWidth: "464.4px",
  position: "fixed",
  left: "50%",
  transform: "translateX(-50%)",
};

const inputStyle = {
  width: "95%",
  padding: "10px",
  margin: "10px 0",
  borderRadius: "5px",
  border: "1px solid #ccc",
};

const Image = {
  // position: 'absolute',
  // top:'150px',
  // left:'150px',
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

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [gender, setGender] = useState("");
  const [login, setLogin] = useState(false);
  const [logined, setLogined] = useState(false);
  const [err, SetErr] = useState("");

  // // console.log(`${year}-${month}-${day}`)
  // let fulldate = `${year}-${month}-${day}`;
  // let checkdate = new Date(fulldate);
  // console.log(checkdate.toUTCString());

  const handleSignup = (
    user_email,
    user_password,
    user_fullname,
    user_birthday,
    user_gender
  ) => {
    fetch("/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_email,
        user_password,
        user_fullname,
        user_birthday,
        user_gender,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setLogined(data?.status === "success");
        if (data?.status === "fail") SetErr(data.message);
      })
      .catch((err) => console.log(err));
  };

  if (login) return <Login />;
  if (logined) return <Home />;
  return (
    <div
      style={{ backgroundColor: "#f5f5f5", height: "100vh", display: "flex" }}
    >
      <div
        style={logo}
        className="d-flex justify-content-start align-items-center"
      >
        <img src={orange} style={Image} alt="Orange" />
        <div>
          <h1 style={Name}>Orange Twitter</h1>
          <h3 style={Slogan}>Just an orange</h3>
        </div>
      </div>
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
          <option value="Khác">Gender</option>
          <option value="Nam">Male</option>
          <option value="Nữ">Female</option>
          <option value="Khác">Other</option>
        </select>
        <span className="text-danger">{err}</span>
        <button
          className="btn text-bg-primary bg-gradient w-100 pt-2 pb-2"
          onClick={() => {
            handleSignup(
              email,
              password,
              fullName,
              `${year}-${month}-${day}`,
              gender
            );
          }}
          disabled={!validateEmail(email) || !validatePassword(password)}
        >
          Sign up
        </button>
        <div className="mt-3">
          <button
            className="btn btn-light border border-2 rounded-pill w-75 position-relative"
            onClick={() => setLogin(true)}
          >
            <span
              className="ms-3"
              style={{ fontWeight: "bold", color: "#444444" }}
            >
              Đăng nhập
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
