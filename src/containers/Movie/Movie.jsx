
import { connect } from 'react-redux';
import React, { useEffect, useState } from "react";
import axios from "axios";
import {notification} from 'antd';
import {useHistory} from 'react-router-dom';
import Recommendations from '../../components/Recommendations/Recommendations';

const Movie = (props) => {

    let history = useHistory();


    //hooks
    const [movieData, setMovieData] = useState([]);  
    const [similarMovie, setSimilarMovie] = useState([]);

    useEffect(() => {
        findMovie();
    }, []);
  
    const compraPeli = async (opcion, precio) => {

        if (!props.credentials.user.id){
            history.push("/register");
            notification.warning({message:'Atencion.',description: "Debes estar registrado comprar, alquilar o ver una película."});
        }

        let idUser = props.credentials.idUser;
        let token = props.credentials.token;
      
        let bodyOrder = {
          idUser : idUser,
          customerId : idUser,
          movieId : props.movie.id,
          photoMovie: props.movie.poster_path,
          title: props.movie.title,
          precio: precio,
          type: opcion
        }

        let bodyMovie = {
            idUser : idUser,
            customerId : idUser,
            movieId : props.movie.id,
            title: props.movie.title,
            precio: precio,
            numPlay: 1,
            numBuy: 1,
            numRent: 1,
            type: opcion,
            genre : props.movie.genre_ids[0],
            poster_path : props.movie.poster_path
          }

        switch (opcion){

            case "Compra" :
                try{

                    console.log("datos que le pasamos a axios",bodyOrder);
                    let res = await axios.post('http://localhost:3005/order',bodyOrder,{headers:{'authorization':'Bearer ' + token}});
                    console.log("Resultado de la compra: ", res.data);
              
                    let res2 = await axios.post('http://localhost:3005/movies/buy',bodyMovie,{headers:{'authorization':'Bearer ' + token}});
                    console.log("Añadimos +1 a numBuy: ", res2.data);                   
                    notification.success({message:'Película comprada.',description: "Ve a tu perfil, mis películas para verla."});

                }catch (err){      
                  notification.warning({message:'Atencion.',description: JSON.stringify(err.response.data.message)});                  
                }
                return;

            case "Alquiler" :
                try{

                    console.log("datos que le pasamos a axios",bodyOrder);
                    let res = await axios.post('http://localhost:3005/order',bodyOrder,{headers:{'authorization':'Bearer ' + token}});
                    console.log("Resultado de la compra: ", res.data);
              
                    let res2 = await axios.post('http://localhost:3005/movies/rent',bodyMovie,{headers:{'authorization':'Bearer ' + token}});
                    console.log("Añadimos +1 a numRent: ", res2.data)
                    notification.success({message:'Pelicula alquilada.',description: "Ve a tu perfil/mis peliculas para poder verla."});
               
                }catch (err){      
                  notification.warning({message:'Atencion.',description: JSON.stringify(err.response.data.message)});
                }
                return;

            default:
                notification.warning({message:'Atencion.',description: "Ha ocurrido un error. Póngase en contacto con el administrador."});
                return;
        }
    }

    const findMovie = async () => {  

        try{
            let body = {
                id: props.movie.id
            }
            console.log("Estoy en findmovie de Movie. body: ", body);
            let res = await axios.post('http://localhost:3005/movies/id',body);  
            setMovieData(res); 
        }catch (err){      
        }  
    }

    const verPeli = async () => {
        history.push("/play");
    }

  const baseImgUrl = "https://image.tmdb.org/t/p"
  const size = "w780"
    if (props.movie?.id) {

      return (
        <div className="boxMovie">
            <div className="up">
                <div className="boxLeft">
                    <div className="posterMovie">
                        <img src={`${baseImgUrl}/${size}${props.movie.poster_path}`}  alt="poster" className="posterMovie"/>
                    </div>
                    <div className="buttonMovieBox">
                        <div className="buttonMovie" onClick={()=>verPeli()}>Reproducir</div>                 
                        <div className="buttonMovie">Favoritos</div>                 
                        <div className="buttonMovie" onClick={()=>compraPeli("Compra", 5)}>Comprar</div>                 
                        <div className="buttonMovie" onClick={()=>compraPeli("Alquiler", 2)}>Alquilar</div>
                    </div>
                </div>

                <div className="boxRight">
                    <div className="titulo"><h1>{props.movie.title}</h1><h3>({props.movie.release_date})</h3></div>
                    <div className="titulo"><h2>SINOPSIS</h2><p>{props.movie.overview}</p></div>
                    <div className="trailer"><h2>TRAILER</h2></div>
                    <iframe width="560" height="315" src={props.trailer} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
            </div>

            <div className="recommen">
                <Recommendations/>
            </div>
        </div>  
      );
    } else {
      return <div>
            ESTAMOS EN MOVIE  - CARGANDO DATOS
         </div>;

    }
}
export default connect((state) => ({
      credentials:state.credentials, 
      movie:state.movie,
      trailer: state.trailer
      }))(Movie);
      