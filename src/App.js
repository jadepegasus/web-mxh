import { Routes, Route } from "react-router-dom";
import Profile from "./components/pages/Profile";
import "./App.css";
import Login from "./Auth/Login";
import useFetch from "./unity/useFetch";
import HomePage from "./components/homePage/HomePage";

function App() {
  const [dataLogin] = useFetch('/logined');
  return (
    <>
      <Routes>
        <Route path="/" element={(dataLogin?.status === 'success') ? <HomePage /> : <Login />}></Route>
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  )
}

export default App;
