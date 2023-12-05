import Browse from "./Browse";
import Login from "./Login";
import Movie from "./Movie";
import { Routes, Route } from "react-router-dom";

const Body = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/movie/:id" element={<Movie />} />
        <Route path="/browse" element={<Browse />} />
      </Routes>
    </div>
  );
};
export default Body;
