import "./App.css";
import Login from "./Auth/Login";
// import SignUp from "./Auth/Sign up";
import HomePage from './components/homePage/HomePage'
import useFetch from "./unity/useFetch";


function App() {
  const [dataLogin] = useFetch('/logined');
  return (
    <>
      {(dataLogin?.status === 'success') ? <HomePage /> : <Login />}
    </>
  )
}

export default App;
