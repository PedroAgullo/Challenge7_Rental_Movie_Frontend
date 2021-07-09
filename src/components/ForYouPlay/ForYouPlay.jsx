
import React, { useEffect, useState } from "react";
import {useHistory} from "react-router";
import axios from "axios";
import { connect } from 'react-redux';
import { GETMOVIE, TRAILER } from '../../redux/types';
import {notification} from 'antd';


const ForYouPlay = (props) => {
  let history = useHistory();

    //hooks
    const [movieData, setMovieData] = useState([]);  
  
    useEffect(() => {
      findRecommendations();
    }, []);

  
    //Guarda la movie en redux y nos lleva a la vista de película.
    const selectMovie = async (movie) => {
      let body = {
        id: movie.id
      } 

      try{
        let res2 = await axios.post('https://elseptimoartebackend.herokuapp.com/movies/video',body); 
        await props.dispatch({type:TRAILER,payload:res2.data});
        await props.dispatch({type:GETMOVIE,payload: movie});
        history.push('/movie');
    }catch (err){
         }      

    }
  
  const findRecommendations = async () => { 
    let body = {
      id: props.credentials.user.lastPlay
    } 

    try{

      let res = await axios.post('https://elseptimoartebackend.herokuapp.com/movies/recommendations', body);
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
        <div className="playBoxMovies"> <h2>POR TU ÚLTIMA VISUALIZACIÓN</h2>
            <div className="playBoxCard">
              {movieData.map((act, index) => (
                <div className="playCard" onClick={()=> selectMovie(act)} key={index}>
                    <img src={`${baseImgUrl}/${size}${act.poster_path}`}  alt="poster" className="poster"/>
                </div>
                   ))}
            </div>
        </div>  
      );
    } else {
      return <div>
          BASADAS EN TU ÚLTIMA VISUALIZACIÓN - CARGANDO DATOS</div>;
    }
};

export default connect((state) => ({
  credentials:state.credentials,
  movie:state.movie, 
  getroomusers:state.getroomusers
  }))(ForYouPlay);
