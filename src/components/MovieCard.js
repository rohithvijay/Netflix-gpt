import { IMG_CDN_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleGptSearchView } from "../utils/gptSlice";

const MovieCard = ({ posterPath, movieId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const movieById = () => {
    if (!posterPath) return null;
    if (showGptSearch) {
      dispatch(toggleGptSearchView(false));
    }
    navigate("/movie/" + movieId);
  };
  return (
    <div
      className="hover:scale-110 transition-all cursor-pointer"
      onClick={movieById}
    >
      <img alt="Movie Card" src={IMG_CDN_URL + posterPath} />
    </div>
  );
};
export default MovieCard;
