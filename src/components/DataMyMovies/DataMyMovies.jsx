
//Nos muestra las clases activas a las que está apuntado el usuario.
import React, { useEffect, useState } from "react";
// import './DataMyMovies.css';
import axios from "axios";
import { connect } from 'react-redux';
import {notification} from 'antd';
import {useHistory} from "react-router";
import { GETMOVIE, TRAILER } from '../../redux/types';


const DataMyMovies = (props) => {
    let history = useHistory();
    //hooks
    const [orders, setOrders] = useState([]);  
  
    //Equivalente a componentDidMount en componentes de clase (este se ejecuta solo una vez)
    useEffect(() => {
      findOrders();
    }, []);
  
    //CANCELA LA CLASE
    const playMovie = async (movieId) => {
      try {
          let token = props.credentials.token
          let body={
            id : movieId,
            customerId : props.credentials.user.id
          }

        let res2 = await axios.post('http://localhost:3005/movies/video',body); 
        await props.dispatch({type:TRAILER,payload:res2.data});
        let res = await axios.post('http://localhost:3005/movies/id',body,{headers:{'authorization':'Bearer ' + token}});

        props.dispatch({type:GETMOVIE,payload: res.data});
        history.push('/movie');
      } catch (error) {
        
      }
    }

    const findOrders = async () => {  
    try{      
      let idUser = props.credentials.idUser;
      let token = props.credentials.token;
    
      let body = {
        customerId : idUser,
        idUser: idUser        
      }
      let res = await axios.post('http://localhost:3005/order/user',body,{headers:{'authorization':'Bearer ' + token}});
     
    //  props.dispatch({type:GETORDER,payload: res.data});

    
        setOrders(res.data);; 
    }catch (err){     
        notification.warning({message:'Atencion.',description: JSON.stringify(err.response.data.message)});
    }
  
    }
    
    const baseImgUrl = "https://image.tmdb.org/t/p"
    const size = "w200"

    if (orders[0]?.id) {
      return (
        <div className="nombreDataRoom"> <h1>MIS PELICULAS</h1>

            <div className="boxCardDataRoom">
              {orders.map((act, index) => (
                <div className="cardDataRoom" key={index}>
                    <img src={`${baseImgUrl}/${size}${act.photoMovie}`}  alt="poster" className="posterDataMovie" onClick={()=>playMovie(act.movieId)}/> 
                </div>
                   ))}

            </div>
        </div>  
      );
    } else {
      return <div>
          <h1>NO TIENES PELICULAS </h1>
        </div>        

    }
};

export default connect((state) => ({
  credentials:state.credentials, 
  orders:state.orders,
  trailer:state.trailer
  }))(DataMyMovies);
