import Header from "./Header";
import Status from "./Status";
import Poster from "./Poster"

const HomePage = () => {
  return (
    <div className="bg-secondary bg-opacity-10 pb-5">
      <Header />
      <Status />
      <Poster />
    </div>
  );
};
export default HomePage;
