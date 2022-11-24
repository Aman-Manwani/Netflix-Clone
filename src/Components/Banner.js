import React, { useState, useEffect } from "react";
import instance from "./axios";
import requests from "./Requests";
import './Banner.css';

const base_url = "https://image.tmdb.org/t/p/original/";


const Banner = () => {
  const [movie, setmovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await instance.get(requests.fetchNetFlixOriginals);
      setmovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
    }
    fetchData();
  }, []);

  // console.log(`${base_url}${movie.backdrop_path}`);

  function truncate(str,n){
    return str?.length > n ? str.substr(0,n-1) + '...' : str;
  }

  return (
    <header
      className="banner"
      style={{ 
        backgroundSize: "cover", 
        backgroundImage: `url('${base_url}${movie.backdrop_path}')`,
        color: "white",
        backgroundPosition: "center center",
      }}
    >
      <div className="banner_contents">
        <h1 className="banner_title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner_buttons">
          <button className="banner_button">Play</button>
          <button className="banner_button">My List</button>
          <h1 className="banner_description">
            {truncate(movie?.overview,150)}
          </h1>
        </div>
      </div>
      <div className="fade_bottom">
        
      </div>
    </header>
  );
};

export default Banner;
