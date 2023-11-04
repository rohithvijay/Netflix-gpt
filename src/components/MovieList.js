import MovieCard from "./MovieCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import 'swiper/css/navigation';
import { Navigation} from 'swiper/modules';

const MovieList = ({ title, movies }) => {
  return (
    <div className="px-6 ">
      <h1 className="text-lg md:text-3xl py-4 text-white">{title}</h1>
      <div className="">
        <Swiper
          modules={[Navigation]}
          navigation
          slidesPerView={8}
          breakpoints={{
            320: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
            1280: {
              slidesPerView: 8,
              spaceBetween: 20,
            },
          }}
        >
          {movies?.map((movie) => (
            <SwiperSlide key={movie.id}>
              <MovieCard key={movie.id} movieId={movie.id} posterPath={movie.poster_path} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
export default MovieList;
