import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);

  return (
    movies.nowPlayingMovies && (
      <div className="bg-black">
        <div className="relative z-20">
          <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />    
          <MovieList title={"Top Rated"} movies={movies.topRatedMovies} />     
          <MovieList title={"Popular"} movies={movies.popularMovies} />         
          <MovieList
            title={"Upcoming Movies"}
            movies={movies.upcomingMovies}
          />
        </div>
      </div>
    )
  );
};
export default SecondaryContainer;
