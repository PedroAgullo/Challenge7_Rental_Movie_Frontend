
import React, { useEffect, useState } from "react";
import {useHistory} from "react-router";
import axios from "axios";
import { connect } from 'react-redux';
import { GETMOVIE, TRAILER } from '../../redux/types';

const TopRated = (props) => {
  let history = useHistory();

    //hooks
    const [movieData, setMovieData] = useState([]);  
  
    useEffect(() => {
        findTopRated();
    }, []);
  
    //Guarda la movie en redux y nos lleva a la vista de película.
    const selectMovie = async (movie) => {
      
      let body = {
        id: movie.id
      } 

      try{
        let res2 = await axios.post('http://localhost:3005/movies/video',body); 
        await props.dispatch({type:TRAILER,payload:res2.data});
        props.dispatch({type:GETMOVIE,payload: movie});
        history.push('/movie');
    }catch (err){
         }      
    }
  
    const findTopRated = async () => {  
    try{
      let res = await axios.get('http://localhost:3005/movies/');
      let resultado = [];
      for(let x=0; x<10; x++){
        resultado.push(res.data.results[x]);
      }
      setMovieData(resultado); 
    }catch (err){      
  }  
}

  const baseImgUrl = "https://image.tmdb.org/t/p"
  const size = "w780"

    if (movieData[0]?.id) {
      return (
        <div className="TopRatedBoxMovies"> <h2>MEJOR VALORADOS</h2>
            <div className="boxCardTopRated">
              {movieData.map((act, index) => (
                <div className="cardTopRated" onClick={()=> selectMovie(act)} key={index}>
                    <img src={`${baseImgUrl}/${size}${act.poster_path}`}  alt="poster" className="poster"/>
                </div>
                   ))}

            </div>
        </div>  
      );
    } else {
      return <div>
          TOP RATED - CARGANDO DATOS</div>;
    }
};

export default connect((state) => ({
  credentials:state.credentials,
  movie:state.movie, 
  getroomusers:state.getroomusers
  }))(TopRated);
