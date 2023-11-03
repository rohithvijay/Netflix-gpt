import MovieCard from "./MovieCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

const MovieList = ({ title, movies }) => {
  return (
    <div className="px-6 ">
      <h1 className="text-lg md:text-3xl py-4 text-white">{title}</h1>
      <div className="">
        <Swiper spaceBetween={10} slidesPerView={5}>
          {movies?.map((movie) => (
            <SwiperSlide key={movie.id}>
              <MovieCard posterPath={movie.poster_path} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
export default MovieList;
