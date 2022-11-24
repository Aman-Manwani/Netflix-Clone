import React, { useEffect, useState } from "react";
import instance from "./axios";
import './Row.css'
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";

const Row = ({ title, fetchUrl,isLargeRow }) => {
  const [movies, setmovies] = useState([]);
  const [trailerUrl,settrailerUrl] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const request = await instance.get(fetchUrl);
      setmovies(request.data.results);
    };
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height:"390",
    width:"100%",
    playerVars:{
      autoplay:1,
      origin: 'http://localhost:3000'
    }
  }

  const handleclick = (movie) => {
    if (trailerUrl) {
      settrailerUrl('')
    } else {
      movieTrailer(movie?.title || "")
        .then(url => {
          const urlParams = new URLSearchParams(new URL(url).search);
          settrailerUrl(urlParams.get('v'));
        }).catch((error) => console.log(error));
    }
  }

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters">
        {movies.map((movie) => {
          return (
            <img
              onClick={() => {handleclick(movie)}}
              className={`row_poster && ${isLargeRow && "row_posterLarge"}`}
              key={movie.id}
              src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
              alt={movie.name}
            />
          );
        })}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/>}
    </div>
  );
};

export default Row;
