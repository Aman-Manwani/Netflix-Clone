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
    // console.log(movie)
    if (trailerUrl) {
      settrailerUrl('')
    } else {
      movieTrailer(movie.title || "")
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


// import React, { useEffect, useState } from "react";
// import axios from "./axios";
// import "./Row.css";
// import YouTube from 'react-youtube';
// import movieTrailer from "movie-trailer";

// const base_url = "https://image.tmdb.org/t/p/original/";

// export default function Row({ title, fetchUrl, isLargeRow }) {
//   const [movies, setMovies] = useState([]);
//   const [trailerUrl, setTrailerUrl] = useState('');

//   useEffect(() => {
//     const fetchData = async () => {
//       const request = await axios.get(fetchUrl);
//       // console.log(request);
//       setMovies(request.data.results);
//       // here request.data.results is an array
//       return request;
//     };

//     fetchData();
//   }, [fetchUrl]);

//   const opts = {
//     height: '390',
//     width: '100%',
//     playerVars: {
//       autoplay: 1,
//       origin: 'http://localhost:3000'
//     },
//   }

//   const handleClick = (movie) => {
//     // console.table(movie?.title)
//     if (trailerUrl) {
//       setTrailerUrl('')
//     } else {
//       movieTrailer(movie?.title || "")
//         .then(url => {
//           const urlParams = new URLSearchParams(new URL(url).search);
//           setTrailerUrl(urlParams.get('v'));
//         }).catch((error) => console.log(error));
//     }
//   }

//   // console.log(movies);
//   return (
//     <div className="row">
//       {/* title */}
//       <h2 className="subHeads">{title}</h2>
//       {/* container */}
//       <div className="row_posters">
//         {/* posters of movie */}
//         {movies.map((movie) => (
//           <img
//             key={movie.id}
//             onClick={() => handleClick(movie)}
//             className={`movieBox ${isLargeRow && "movieBox_Large"}`}
//             src={`${base_url}${
//               isLargeRow ? movie.poster_path : movie.backdrop_path
//             }`}
//             alt={movie.name}
//           />
//         ))}
//       </div>
//       {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/>}
//     </div>
//   );
// }