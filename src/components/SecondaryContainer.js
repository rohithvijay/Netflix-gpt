import { useSelector } from "react-redux";
import MovieList from "./MovieList";
import lang from "../utils/languageConstants";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  const langKey = useSelector((store) => store.config.lang);

  return (
    movies.nowPlayingMovies && (
      <div className="bg-black">
        <div className="relative z-20">
          <MovieList title={lang[langKey].nowPlaying} movies={movies.nowPlayingMovies} />    
          <MovieList title={lang[langKey].topRated} movies={movies.topRatedMovies} />     
          <MovieList title={lang[langKey].popular} movies={movies.popularMovies} />         
          <MovieList
            title={lang[langKey].upcomingMovies}
            movies={movies.upcomingMovies}
          />
        </div>
      </div>
    )
  );
};
export default SecondaryContainer;
