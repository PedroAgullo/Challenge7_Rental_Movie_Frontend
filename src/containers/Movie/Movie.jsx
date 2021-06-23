import './Movie.css';
import { connect } from 'react-redux';
import React, { useEffect, useState } from "react";
import axios from "axios";



const Movie = (props) => {


    //hooks
    const [movieData, setMovieData] = useState([]);  
  
    //Equivalente a componentDidMount en componentes de clase (este se ejecuta solo una vez)
    useEffect(() => {
        findMovie();
    }, []);
  
    //Equivalente a componentDidUpdate en componentes de clase
    useEffect(() => {
    });
  
    //Guarda la movie en redux y nos lleva a la vista de película.
    // const selectMovie = async (movie) => {
    //   try{

    //     props.dispatch({type:GETMOVIE,payload: movie});
    //     history.push('/movie');


    // }catch (err){
    //      console.log(err);      
    //      }      

    // }
  
    const findMovie = async () => {  
        try{
            console.log("Entra en findMovie");
            //GET TOP RATED MOVIES
            let body = {
                id: props.movie.id
            }

            let res = await axios.post('http://localhost:3005/movies/id',body);
            
            console.log("Resultado de la busqueda de pelicula por id: ", res);
            
            setMovieData(res); 
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
                <div className="card" key={index}>
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
         ESTAMOS EN MOVIE CONTAINER - CARGANDO DATOS</div>;

    }
}
export default connect((state) => ({
      credentials:state.credentials, 
      movie:state.movie
      }))(Movie);
      