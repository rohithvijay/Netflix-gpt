import Header from "./Header";
import GptSearch from "./GptSearch";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import VideoBackground from "./VideoBackground";
import useMovieDetails from "../hooks/useMovieDetails";
import VideoTitle from "./VideoTitle";

const Movie = () => {
  let showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const { id } = useParams();

  useMovieDetails(id);
  const movies = useSelector((store) => store.movies.movieDetails);

  return (
    <div>
      <Header movieId={id} />
      {showGptSearch ? (
        <GptSearch />
      ) : (
        <>
          <div className="bg-black md:pt-0">
            <VideoTitle
              title={movies?.original_title}
              overview={movies?.overview}
            />
            <VideoBackground movieId={id} />
          </div>
        </>
      )}
    </div>
  );
};
export default Movie;
