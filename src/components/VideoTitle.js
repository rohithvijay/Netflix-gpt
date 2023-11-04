import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import lang from "../utils/languageConstants";
import { useSelector } from "react-redux";

const VideoTitle = ({ title, overview }) => {
  const langKey = useSelector((store) => store.config.lang);

  return (
    <div className="w-full h-screen aspect-video flex flex-col justify-center px-5 md:px-24 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-xl md:text-3xl font-bold">{title}</h1>
      <p className="hidden md:inline-block py-6 text-md w-1/2">{overview}</p>
      <div className="my-4 md:m-0">
        <button className=" bg-white text-black py-1 md:py-3 px-3 md:px-8 text-lg  rounded-lg hover:bg-opacity-80">
        <FontAwesomeIcon icon={faPlayCircle} className="pr-2 text-xl"/>
          {lang[langKey].play}
        </button>
        <button className="hidden md:inline-block mx-2  bg-gray-500 text-white md:py-3 px-3 md:px-8 text-lg bg-opacity-50 rounded-lg">
        {lang[langKey].moreInfo}
        </button>
      </div>
    </div>
  );
};
export default VideoTitle;
