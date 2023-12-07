import { Routes, Route } from "react-router-dom";
import Profile from "./components/pages/Profile";
import "./App.css";
import Login from "./Auth/Login";
import HomePage from "./components/homePage/HomePage";
import { useState } from "react";
import { useEffect } from "react";
import { host } from "./env";

function App() {
  const [dataLogin, setDataLogin] = useState(false)
  console.log(dataLogin)
  useEffect(() => {
    console.log('effect')
    fetch(host + '/logined', {credentials: 'include'})
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
      <Routes>{console.log('test')}
        <Route path="/" element={dataLogin ? <HomePage /> : <Login />}></Route>
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  )
}

export default App;
