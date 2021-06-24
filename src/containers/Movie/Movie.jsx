import './Movie.css';
import { connect } from 'react-redux';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { GETORDER } from '../../redux/types';
import {notification} from 'antd';



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
  
    const compraPeli = async () => {
        console.log("Entramos a comprar la peli");


        try{

            let idUser = props.credentials.idUser;
            let token = props.credentials.token;
          
            let body = {
              idUser : idUser,
              customerId : idUser,
              movieId : props.movie.id,
              photoMovie: props.movie.poster_path,
              title: props.movie.title,
              precio: 5,
            }
            console.log("datos que le pasamos a axios",body);
            let res = await axios.post('http://localhost:3005/order',body,{headers:{'authorization':'Bearer ' + token}});
           console.log("Resultado de la compra: ", res.data);
      
            // props.dispatch({type:GETORDER,payload: res.data});
      
            // setTimeout(() => {
            //   setOrders(res.data);;
            // }, 0)
        
           
       
        }catch (err){      
          notification.warning({message:'Atencion.',description: JSON.stringify(err.response.data.message)});
        }
    }


    const findMovie = async () => {  
        try{
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
    if (props.movie?.id) {

      return (
        <div className="boxMovie"> <h1></h1>
            <div className="boxLeft">
                <div className="posterMovie">
                    <img src={`${baseImgUrl}/${size}${props.movie.poster_path}`}  alt="poster" className="posterMovie"/>
                </div>
                <div className="buttonMovieBox">
                    <div clasname="buttonMovie">Favoritos</div>                 
                    <div clasname="buttonMovie" onClick={()=>compraPeli()}>Comprar</div>                 
                    <div clasname="buttonMovie">Reproducir</div>
                </div>

            </div>

            <div className="boxRight">
                <div className="titulo"><h1>{props.movie.title}</h1><h3>({props.movie.release_date})</h3></div>

            </div>
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
      