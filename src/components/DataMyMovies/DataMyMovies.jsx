
import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from 'react-redux';
import {notification} from 'antd';
import {useHistory} from "react-router";
import { GETMOVIE, TRAILER } from '../../redux/types';
import { act } from "react-dom/cjs/react-dom-test-utils.development";


const DataMyMovies = (props) => {
    let history = useHistory();

    //hooks
    const [orders, setOrders] = useState([]);  

  
    const playMovie = async (movieId) => {
      try {
          let token = props.credentials.token
          let body={
            id : movieId,
            customerId : props.credentials.user.id
          }

        let res2 = await axios.post('https://elseptimoartebackend.herokuapp.com/movies/video',body); 
        await props.dispatch({type:TRAILER,payload:res2.data});
        let res = await axios.post('https://elseptimoartebackend.herokuapp.com/movies/id',body,{headers:{'authorization':'Bearer ' + token}});

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
      let res = await axios.post('https://elseptimoartebackend.herokuapp.com/order/user',body,{headers:{'authorization':'Bearer ' + token}});
     
      let prueba = [];
      prueba = res.data;
       console.log(prueba.lenght);

      console.log(res.data.lenght);

      for (let x =0; x<res.data.lenght; x++){

        if (res.data.type === 'Premium'){
          res.data[x].splice(x,1);
        }
      }

        setOrders(res.data);; 
    }catch (err){     
        console.log(err) ;
        notification.warning({message:'Atencion.',description: JSON.stringify(err.response.data.message)});
    }
  
    }
    
    const baseImgUrl = "https://image.tmdb.org/t/p"
    const size = "w200"

    if (orders[0]?.id) {
      return (
        <div className="nombreDataRoom"> MIS PELICULAS

            <div className="boxCardDataRoom" >
              {orders.map((act, index) => (
                <div className="cardDataRoom" id={act.type} key={index}>
                    <img src={`${baseImgUrl}/${size}${act.photoMovie}`}  alt="poster" className="posterDataMovie" id={act.type} onClick={()=>playMovie(act.movieId)}/> 
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
