
//Nos muestra las clases activas a las que está apuntado el usuario.
import React, { useEffect, useState } from "react";
import {useHistory} from "react-router";
import './TopRated.css';
import axios from "axios";
// import { Popconfirm, message, Button } from 'antd';
import { connect } from 'react-redux';
import { GETMOVIE } from '../../redux/types';



const TopRated = (props) => {
  
  let history = useHistory();
    //hooks
    const [movieData, setMovieData] = useState([]);  
  
    //Equivalente a componentDidMount en componentes de clase (este se ejecuta solo una vez)
    useEffect(() => {
        findTopRated();
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
  
    const findTopRated = async () => {  
    try{
      //GET TOP RATED MOVIES
      let res = await axios.get('http://localhost:3005/movies/');
      setMovieData(res.data.results); 
  }catch (err){      
  }
  
}

  const baseImgUrl = "https://image.tmdb.org/t/p"
  const size = "w200"

  // if (props.getroomusers[0]?._id) {
    if (movieData[0]?.id) {


      














      return (
        <div className="TopRatedBoxMovies"> <h1>TOP RATED</h1>
            <div className="boxCard">
              {movieData.map((act, index) => (
                <div className="card" onClick={()=> selectMovie(act)} key={index}>
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
          TOP RATED - CARGANDO DATOS</div>;
    }
};

export default connect((state) => ({
//   credentials:state.credentials, 
//   getroomusers:state.getroomusers
  }))(TopRated);
