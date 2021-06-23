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
    console.log(props.movie.id);
  // if (props.getroomusers[0]?._id) {
    if (props.movie?.id) {

      return (
        <div className="boxMovie"> <h1></h1>
            <div className="boxLeft">
                <div className="posterMovie">
                    <img src={`${baseImgUrl}/${size}${props.movie.poster_path}`}  alt="poster" className="posterMovie"/>
                </div>
                <div className="buttonMovieBox">
                    <div clasname="buttonMovie">Favoritos</div>                 
                    <div clasname="buttonMovie">Comprar</div>                 
                    <div clasname="buttonMovie">Reproducir</div>                 

                </div>

            </div>

            <div className="boxRight"></div>
        </div>  
      );
    } else {
      return <div>
            ESTAMOS EN MOVIE CONTAINER - CARGANDO DATOS
         </div>;

    }
}
export default connect((state) => ({
      credentials:state.credentials, 
      movie:state.movie
      }))(Movie);
      