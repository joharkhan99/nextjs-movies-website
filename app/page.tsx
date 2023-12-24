"use client"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from 'swiper/modules';
import Image from "next/image";
import { useEffect, useState } from "react";


interface Movie {
  poster_path: string,
  backdrop_path: string,
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
    <main className="p-10">
      <Swiper className="flex w-full justify-center items-center"
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        // modules={[Autoplay]}
        slidesPerView={2}
        spaceBetween="30px"
      >
        {
          movies.map((movie, index) => (
          <SwiperSlide key={index}>
            
            <Image src={"https://image.tmdb.org/t/p/w500"+movie.poster_path} layout="fill" alt="" className="object-cover absolute h-full -z-10" />

            <div className="z-20 text-white flex justify-start w-full items-start relative py-24 px-5 pb-2">
              <div className="flex flex-col gap-5 text-sm font-normal">
                <h1 className="text-6xl font-black">
                  Dune 02
                </h1>

                <div className="flex gap-2 items-center text-gray-100">
                  <span>2021</span>
                  <span>PG-13</span>
                  <span>2h 35min</span>
                </div>

                <div className="flex items-center gap-6 text-sm">
                  <button className="p-3 px-7 bg-blue-600 rounded-full text-white">
                    View More
                  </button>
                  <button className="p-3 px-7 bg-gray-600 rounded-full text-white bg-opacity-60">
                    Save to Watchlist
                  </button>
                </div>
              </div>

            
            </div>
          </SwiperSlide>

          ))
        }


      </Swiper>

      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illo, consequatur! Perspiciatis sint asperiores, facilis aut neque obcaecati aspernatur sapiente delectus molestiae dolorem expedita, perferendis doloremque magni, ad ab. Ab, odio.
      </p>
    </main>
  )
}
