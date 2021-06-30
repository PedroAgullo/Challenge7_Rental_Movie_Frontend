
//Nos muestra las clases activas a las que está apuntado el usuario.
import React, { useEffect, useState } from "react";
// import './Popular.css';
import axios from "axios";
import { connect } from 'react-redux';
import { GETMOVIE } from '../../redux/types';
import {useHistory} from "react-router";

const Novedades = (props) => {
  let history = useHistory();

    //hooks
    const [movieData, setMovieData] = useState([]);  
  
    //Equivalente a componentDidMount en componentes de clase (este se ejecuta solo una vez)
    useEffect(() => {
      findPopular();
    }, []);
  
    //Equivalente a componentDidUpdate en componentes de clase
    useEffect(() => {
    });
  
    //Guarda la movie en redux y nos lleva a la vista de película.
    const selectMovie = async (movie) => {
      try{


        props.dispatch({type:GETMOVIE,payload: movie});
        history.push('/movie');



    }catch (err){
         console.log(err);      
         }      

    }
  
    const findPopular = async () => {  
    try{
      //GET TOP RATED MOVIES
      
      let res = await axios.get('http://localhost:3005/movies/soon');
     
      setMovieData(res.data.results); 
  }catch (err){      
  }
  
}
  const baseImgUrl = "https://image.tmdb.org/t/p"
  const size = "w780"

  // if (props.getroomusers[0]?._id) {
    if (movieData[0]?.id) {

      return (
        <div className="popularBoxMovies"> <h1>NOVEDADES</h1>
            <div className="popularBoxCard">
              {movieData.map((act, index) => (
                <div className="popularCard" onClick={()=> selectMovie(act)} key={index}>
                    <img src={`${baseImgUrl}/${size}${act.poster_path}`}  alt="poster" className="poster"/>
                  {/* <p className="datosCard">Fin: {moment(act.dateEnd).format('LLL')}</p>
                  <p className="datosCard">Entrenador: {act.nameCoach}</p>
                  <p className="datosCard">Capacidad: {act.members.length}/{act.maxMember}</p> */}
                </div>
                   ))}

            </div>
        </div>  
      );
    } else {
      return <div>
          NOVEDADES - CARGANDO DATOS</div>;
    }
};

export default connect((state) => ({
  credentials:state.credentials, 
  getroomusers:state.getroomusers
  }))(Novedades);
