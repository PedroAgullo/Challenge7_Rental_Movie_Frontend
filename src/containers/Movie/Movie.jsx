// import './Movie.css';
import { connect } from 'react-redux';
import React, { useEffect, useState } from "react";
import axios from "axios";
import {notification} from 'antd';
import {useHistory} from 'react-router-dom';
// import 'antd/dist/antd.css';
import Recommendations from '../../components/Recommendations/Recommendations';

const Movie = (props) => {

    let history = useHistory();


    //hooks
    const [movieData, setMovieData] = useState([]);  
    const [similarMovie, setSimilarMovie] = useState([]);

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
                    notification.success({message:'Película comprada.',description: "Ve a tu perfil, mis películas para verla."});

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


  const baseImgUrl = "https://image.tmdb.org/t/p"
  const size = "w780"
  // if (props.getroomusers[0]?._id) {
    if (props.movie?.id) {

      return (
        <div className="boxMovie">
            <div className="up">
                <div className="boxLeft">
                    <div className="posterMovie">
                        <img src={`${baseImgUrl}/${size}${props.movie.poster_path}`}  alt="poster" className="posterMovie"/>
                    </div>
                    <div className="buttonMovieBox">
                        <div className="buttonMovie">Favoritos</div>                 
                        <div className="buttonMovie" onClick={()=>compraPeli("comprar", 5)}>Comprar</div>                 
                        <div className="buttonMovie" onClick={()=>compraPeli("alquilar", 2)}>Alquilar</div>
                    </div>

                </div>

                <div className="boxRight">
                    <div className="titulo"><h1>{props.movie.title}</h1><h3>({props.movie.release_date})</h3></div>
                    <div className="titulo"><h3>SINOPSIS</h3><p>{props.movie.overview}</p></div>
                    <div className="trailer"><h3>TRAILER</h3>                     </div>
                    <iframe width="560" height="315" src={props.trailer} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

                </div>
            </div>


            <div className="recommen">PENSAMOS QUE PODRÍA PODRÍA INTERESARTE
                <Recommendations/>
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
      movie:state.movie,
      trailer: state.trailer
      }))(Movie);
      