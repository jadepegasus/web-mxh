import "./App.css";
import Login from "./Auth/Login";
import useFetch from "./unity/useFetch";
import Home from "./components/pages/Home";


function App() {
  const [dataLogin] = useFetch('/logined');
  return (
    <>
      {(dataLogin?.status === 'success') ? <Home /> : <Login />}
    </>
  )
}

export default App;
