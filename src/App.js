import { Routes, Route } from "react-router-dom";
import Profile from "./components/pages/Profile";
import "./App.css";
import Login from "./Auth/Login";
import HomePage from "./components/homePage/HomePage";
import SignUp from "./Auth/Signup";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/profile" element={<Profile />} />
        <Route path="/homepage" element={<HomePage></HomePage>} />
        <Route path="/signup" element={<SignUp></SignUp>} />
        <Route path="/post" ></Route>

      </Routes>
    </>
  )
}

export default App;
