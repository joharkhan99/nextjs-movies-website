"use client"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from 'swiper/modules';
import Image from "next/image";
import { useEffect, useState } from "react";


interface Movie {
  poster_path: string,
  backdrop_path: string,
  title: string,
  overview: string,
}

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);

  const API_URL =
    "https://api.themoviedb.org/3/trending/movie/day?language=en-US";

    const fetchData = async () => {
      console.log(process.env.NEXT_PUBLIC_API_KEY);
      try {
          const response = await fetch(API_URL, {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
            },
          });
          const data = await response.json();
          const fetchedMovies:Movie[] = data.results;
          console.log(fetchedMovies);

          setMovies(fetchedMovies);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    useEffect(() => {
      fetchData();
    }, []);



  return (
    <main className="container mx-auto py-10">
      <Swiper className="flex w-full justify-center items-center"
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        slidesPerView={2}
        spaceBetween="30px"
      >
        {
          movies.map((movie, index) => (
          <SwiperSlide key={index} className="rounded-xl overflow-hidden">
            <div className="h-64">
              <Image src={"https://image.tmdb.org/t/p/w500"+movie.poster_path} layout="fill" alt="" className="object-cover absolute -z-10" />
            </div>
          </SwiperSlide>
          ))
        }
      </Swiper>

<div className="my-10">

  <h1 className="text-3xl text-white mb-3 font-black">
    Trending Movies
  </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-7 gap-5">

        {
          movies.map((movie, index) => (
            <div key={index} className="overflow-hidden rounded-xl relative z-10">
              <div className="h-72 w-full">
                <Image src={"https://image.tmdb.org/t/p/w500"+movie.poster_path} width={400} height={0} alt="" className="object-cover" />
              </div>

              <div className="z-50 p-5 pb-3">
                <h1 className="text-white text-2xl font-bold">{movie.title}</h1>
              </div>



            </div>
          ))
        }
      </div>
</div>





    </main>
  )
}
