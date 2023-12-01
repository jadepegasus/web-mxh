import { Routes, Route } from "react-router-dom";
import Profile from "./components/pages/Profile";
import "./App.css";
import Login from "./Auth/Login";
import HomePage from "./components/homePage/HomePage";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [dataLogin, setDataLogin] = useState(false)
  useEffect(() => {
    fetch('/logined')
      .then(res => {
        return res.json()
      })
      .then(data => {
        if (data.status === 'success')
          setDataLogin(true)
      })
  }, [])
  return (
    <>
      <Routes>
        <Route path="/" element={dataLogin ? <HomePage /> : <Login />}></Route>
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  )
}

export default App;
