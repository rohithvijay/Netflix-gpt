import { BG_URL } from "../utils/constants";
import GptMovieSuggestions from "./GptMovieSuggestions";
import GptSearchBar from "./GptSearchBar";

const GPTSearch = () => {
  return (
    <>
      <div className="bg-custom-image w-full h-full min-h-screen bg-cover flex flex-col justify-center items-center">
        <div className="w-full top-0 flex flex-col justify-center">
          <GptSearchBar />
          <GptMovieSuggestions />
        </div>
      </div>
    </>
  );
};
export default GPTSearch;
