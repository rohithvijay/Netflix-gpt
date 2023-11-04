import openai from "../utils/openai";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult, clearGptSearchResult } from "../utils/gptSlice";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loader from "./Loader";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setErrorMessage("");
  };

  const clearInput = () => {
    setInputValue("");
    dispatch(clearGptSearchResult());
  };

  // search movie in TMDB
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();

    return json.results;
  };

  const handleGptSearchClick = async () => {
    // Make an API call to GPT API and get Movie Results
    if (searchText.current.value.length === 0) {
      const errorMessage = "Enter something";
      setErrorMessage(errorMessage);
      return;
    }
    setLoading(true);

    const gptQuery =
      "Act as a Movie Recommendation system and suggest some movies for the query : " +
      searchText.current.value +
      ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Akkare Akkare Akkare, Pattanaprevesham, Nadodi, kireedam, amaram";

    const gptResults = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-3.5-turbo",
    });

    if (!gptResults.choices) {
      // TODO: Write Error Handling
    }

    const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");
    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));

    const tmdbResults = await Promise.all(promiseArray);
    setLoading(false);

    dispatch(
      addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
    );
  };


  return (   
    <div className="flex items-center flex-col mt-24 sm:mt-16">
      <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>
      <form
        className="w-full md:w-1/2 bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="relative col-span-7 md:col-span-9 m-4">
          <input
            ref={searchText}
            type="text"
            className="p-4 w-full rounded-lg text-xs sm:text-lg h-10 md:h-16 pr-7 md:pr-14"
            value={inputValue}
            onChange={handleInputChange}
            placeholder={lang[langKey].gptSearchPlaceholder}
          />
          {inputValue.length > 0 && (
            <FontAwesomeIcon
              icon={faClose}
              className="absolute right-3 md:right-5 top-3 md:top-3 text-2xl font-bold cursor-pointer h-4 md:h-10"
              onClick={clearInput}
            />
          )}
        </div>

        <button
          className="col-span-5 md:col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg text-xs sm:text-lg h-10 md:h-16"
          onClick={handleGptSearchClick}
        >
          {lang[langKey].search}
        </button>
        {loading ? <Loader /> : null}
      </form>
    </div>
    
  );
};
export default GptSearchBar;
