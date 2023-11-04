import { useEffect } from "react";
import { LOGO } from "../utils/constants";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleGptSearchView, clearGptSearchResult } from "../utils/gptSlice";
import { SUPPORTED_LANGUAGES } from "../utils/constants";
import { changeLanguage } from "../utils/configSlice";
import { faSignOut, faHome, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = ({ movieId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const language = useSelector((store) => store.config.lang);
  
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        if (movieId) {
          navigate("/movie/" + movieId);
        } else {
          navigate("/browse");
        }
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    // Unsubscribe when component unmounts
    return () => unsubscribe();
  }, []);
  const handleHomeClick = () => {
    dispatch(toggleGptSearchView(false));
    navigate("/browse");
  };
  const handleGptSearchClick = () => {
    // Toggle GPT Search
    dispatch(toggleGptSearchView(true));
    dispatch(clearGptSearchResult());
    navigate("/browse");
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="fixed w-full px-8 py-2 bg-gradient-to-b from-black z-50 flex flex-col md:flex-row justify-between items-center">
      <img className="w-24 sm:w-44 mx-auto md:mx-0" src={LOGO} alt="logo" />
      {user && (
        <div className="flex p-2 justify-between items-center">
          <select
            className="p-0 sm:p-2 m-2 text-white bg-transparent focus:outline-none cursor-pointer" value={language}
            onChange={handleLanguageChange}
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option
                key={lang.identifier}
                value={lang.identifier}
                className="bg-black"
              >
                {lang.name}
              </option>
            ))}
          </select>
          <button
            className="mx-2 bg-transparent text-white rounded-lg"
            onClick={handleHomeClick}
          >
            <FontAwesomeIcon icon={faHome} />
          </button>
          <button
            className="mx-2 bg-transparent text-white rounded-lg"
            onClick={handleGptSearchClick}
          >
            <FontAwesomeIcon icon={faSearch} />
          </button>
          <img
            className="hidden md:block w-10 h-10 rounded-full mx-2"
            alt="usericon"
            src={user?.photoURL}
          />
          <span className="text-white mr-5">{user.displayName}</span>
          <button
            onClick={handleSignOut}
            className="font-bold text-white text-2xl"
          >
            <FontAwesomeIcon icon={faSignOut} />
          </button>
        </div>
      )}
    </div>
  );
};
export default Header;
