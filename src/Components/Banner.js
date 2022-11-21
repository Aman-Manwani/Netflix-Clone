import React, { useState,useEffect } from 'react'
import instance from './axios';
import requests from './Requests';

const Banner = () => {
    const [movie,setmovie]=useState([]);

    useEffect(()=>{
        async function fetchData (){
            const request = await instance.get(requests.fetchNetFlixOriginals);
            // console.log(request);
            setmovie(request.data.results[Math.floor(Math.random()*request.data.results.length-1)]);     
            // console.log(movie);   
        }
        fetchData();
    },[]);

    console.log(movie);

  return (
    <header>
      <div className='banner_contents'>
        <h1>
            
        </h1>
      </div>
    </header>
  )
}

export default Banner;
