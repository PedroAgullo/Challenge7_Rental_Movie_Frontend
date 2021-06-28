import './Movie.css';
import { connect } from 'react-redux';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { GETORDER } from '../../redux/types';
import { Button, notification, Space } from 'antd';
import { useHistory } from 'react-router-dom';
import 'antd/dist/antd.css'


const Movie = (props) => {

    let history = useHistory();


    //hooks
    const [movieData, setMovieData] = useState([]);  
  
    //Equivalente a componentDidMount en componentes de clase (este se ejecuta solo una vez)
    useEffect(() => {
        findMovie();
    }, []);
  
    //Equivalente a componentDidUpdate en componentes de clase
    useEffect(() => {
    });  
  
    const compraPeli = async (opcion, precio) => {

        if (!props.credentials.user.id){
            history.push("/register");
            notification.warning({message:'Atencion.',description: "Debes estar registrado para realizar esta acción."});
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

            case "comprar" :
                try{

                    console.log("datos que le pasamos a axios",bodyOrder);
                    let res = await axios.post('http://localhost:3005/order',bodyOrder,{headers:{'authorization':'Bearer ' + token}});
                    console.log("Resultado de la compra: ", res.data);
              
                    // props.dispatch({type:GETORDER,payload: res.data});
              
                    // setTimeout(() => {
                    //   setOrders(res.data);;
                    // }, 0)
                    
                    let res2 = await axios.post('http://localhost:3005/movies/buy',bodyMovie,{headers:{'authorization':'Bearer ' + token}});
                    console.log("Añadimos +1 a numBuy: ", res2.data);                   
               
                }catch (err){      
                  notification.warning({message:'Atencion.',description: JSON.stringify(err.response.data.message)});                  
                }
                return;

            case "alquilar" :
                try{

                    console.log("datos que le pasamos a axios",bodyOrder);
                    let res = await axios.post('http://localhost:3005/order',bodyOrder,{headers:{'authorization':'Bearer ' + token}});
                    console.log("Resultado de la compra: ", res.data);
              
                    // props.dispatch({type:GETORDER,payload: res.data});
              
                    // setTimeout(() => {
                    //   setOrders(res.data);;
                    // }, 0)
                    
                    let res2 = await axios.post('http://localhost:3005/movies/rent',bodyMovie,{headers:{'authorization':'Bearer ' + token}});
                    console.log("Añadimos +1 a numRent: ", res2.data)
                   
               
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
  const size = "w500"
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
                    <div clasname="buttonMovie" onClick={()=>compraPeli("comprar", 5)}>Comprar</div>                 
                    <div clasname="buttonMovie" onClick={()=>compraPeli("alquilar", 2)}>Alquilar</div>
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
      