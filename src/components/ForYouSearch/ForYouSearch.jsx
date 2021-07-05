
import React, { useEffect, useState } from "react";
import {useHistory} from "react-router";
import axios from "axios";
import { connect } from 'react-redux';
import { GETMOVIE, TRAILER } from '../../redux/types';
import {notification} from 'antd';

const ForYouSearch = (props) => {
  let history = useHistory();

  let history = useHistory();
    //hooks
    const [movieData, setMovieData] = useState([]);  
  
    //Equivalente a componentDidMount en componentes de clase (este se ejecuta solo una vez)
    useEffect(() => {
      findRecommendations();
    }, []);
  
     //Guarda la movie en redux y nos lleva a la vista de película.
    const selectMovie = async (movie) => {

      let body = {
        id: movie.id
      } 

      try{
        let res2 = await axios.post('http://localhost:3005/movies/video',body); 
        await props.dispatch({type:TRAILER,payload:res2.data});
        await props.dispatch({type:GETMOVIE,payload: movie});
        history.push('/movie');

    }catch (err){
         }      

    }
  
  const findRecommendations = async () => { 
    let body = {
      id: props.movie.id
    } 

    try{
      let res = await axios.post('http://localhost:3005/movies/recommendations', body);
      let resultado = [];
      for(let x=0; x<10; x++){
        resultado.push(res.data.results[x]);
      }
      setMovieData(resultado);
    }catch (err){      
      notification.warning({message:'Atencion.',description: JSON.stringify(err.response)});          
    }
  
  }

  const baseImgUrl = "https://image.tmdb.org/t/p"
  const size = "w780"
    if (movieData[0]?.id) {
      return (
        <div className="recomBoxMovies"> <h1>BASADAS EN TU ÚLTIMA BÚSQUEDA</h1>
            <div className="recomBoxCard">
              {movieData.map((act, index) => (
                <div className="recomCard" onClick={()=> selectMovie(act)} key={index}>
                    <img src={`${baseImgUrl}/${size}${act.poster_path}`}  alt="poster" className="poster"/>
                </div>
                   ))}
            </div>
        </div>  
      );
    } else {
      return <div>
          BASADAS EN TU ÚLTIMA BÚSQUEDA - CARGANDO DATOS</div>;
    }
};

export default connect((state) => ({
  credentials:state.credentials,
  movie:state.movie, 
  getroomusers:state.getroomusers
  }))(ForYouSearch);
