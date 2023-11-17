import { Routes, Route } from "react-router-dom";
import HomePage from "../homePage/HomePage";
import Header from "../homePage/Header";
import MyProfile from "./MyProfie";
import Profile from "./Profile";

const Home = () => {
  return (
    <>
    <Header/>
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/myprofile" element={<MyProfile />} />
        <Route path="/profile" element={<Profile />} />
    </Routes>
    </>
  );
};
export default Home;
