import { Routes, Route } from "react-router-dom";
import Profile from "./components/pages/Profile";
import "./App.css";
import Login from "./Auth/Login";
import HomePage from "./components/homePage/HomePage";
import SignUp from "./Auth/Signup";
import PosterPage from "./components/pages/PosterPage";
import ImageView from './components/image/ImageView'
// import { useSelector } from "react-redux";

function App() {
  // const user = useSelector((state) => state.authReducer.authData);
  return (
    <>
      <ImageView></ImageView>

      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/profile" element={<Profile />} />
        <Route path="/homepage" element={<HomePage></HomePage>} />
        <Route path="/signup" element={<SignUp></SignUp>} />
        <Route path="/post" element={<PosterPage></PosterPage>}></Route>

      </Routes>
    </>
  )
}

export default App;
