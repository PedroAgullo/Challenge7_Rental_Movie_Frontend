
//Nos muestra las clases activas a las que está apuntado el usuario.
import React, { useEffect, useState } from "react";
import {useHistory} from "react-router";
// import './Recommendations.css';
import axios from "axios";
// import { Popconfirm, message, Button } from 'antd';
import { connect } from 'react-redux';
import { GETMOVIE } from '../../redux/types';
import {notification} from 'antd';

const Recommendations = (props) => {
  
  let history = useHistory();
    //hooks
    const [movieData, setMovieData] = useState([]);  
  
    //Equivalente a componentDidMount en componentes de clase (este se ejecuta solo una vez)
    useEffect(() => {
      findRecommendations();
    }, []);
  
    //Equivalente a componentDidUpdate en componentes de clase
    useEffect(() => {
    });
  
    //Guarda la movie en redux y nos lleva a la vista de película.
    const selectMovie = async (movie) => {
      try{
        await props.dispatch({type:GETMOVIE,payload: movie});
        await findRecommendations();
        // history.push('/movie');

    }catch (err){
         console.log(err);      
         }      

    }
  
  const findRecommendations = async () => { 
    console.log("Estoy entrando.");
    let body = {
      id: props.movie.id
    } 
      console.log("Antes del axios en redommendations", body);

    try{

      let res = await axios.post('http://localhost:3005/movies/recommendations', body);
      console.log("Recommendations",res.data.results);
      setMovieData(res.data.results); 
    }catch (err){      
      notification.warning({message:'Atencion.',description: JSON.stringify(err.response)});          
      // .response.data.message
    }
  
  }

  const baseImgUrl = "https://image.tmdb.org/t/p"
  const size = "w500"
    if (movieData[0]?.id) {
      return (
        <div className="recomBoxMovies"> <h1>Para tí</h1>
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
          RECOMENDACIONES - CARGANDO DATOS</div>;
    }
};

export default connect((state) => ({
  credentials:state.credentials,
  movie:state.movie, 
  getroomusers:state.getroomusers
  }))(Recommendations);
