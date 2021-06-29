
//Nos muestra las clases activas a las que está apuntado el usuario.
import React, { useEffect, useState } from "react";
// import './DataMyMovies.css';
import axios from "axios";
import { connect } from 'react-redux';
import {notification} from 'antd';
import {useHistory} from "react-router";
import { GETMOVIE } from '../../redux/types';


const DataMyMovies = (props) => {
    let history = useHistory();
    //hooks
    const [orders, setOrders] = useState([]);  
  
    //Equivalente a componentDidMount en componentes de clase (este se ejecuta solo una vez)
    useEffect(() => {
      findOrders();
    }, []);
  
    //Equivalente a componentDidUpdate en componentes de clase
    useEffect(() => {
    });
  
    //CANCELA LA CLASE
    const playMovie = async (movieId) => {
      try {
          console.log("Entro en playMovie:");
          let token = props.credentials.token
          let body={
            id : movieId,
            customerId : props.credentials.user.id
          }


        let res = await axios.post('http://localhost:3005/movies/id',body,{headers:{'authorization':'Bearer ' + token}});
          console.log("Resultado: ", res.data);

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
     
      console.log("Datos devueltos del backend: ", res.data);
    //  props.dispatch({type:GETORDER,payload: res.data});
    console.log('datos de mis pedidos: ', res.data);

    
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
        <div className="nombreDataRoom"> <h1>MIS PELICULAS</h1>

            <div className="boxCardDataRoom">
              {orders.map((act, index) => (
                <div className="card" key={index}>
                    <img src={`${baseImgUrl}/${size}${act.photoMovie}`}  alt="poster" className="posterDataMovie" onClick={()=>playMovie(act.id)}/> 
                </div>
                   ))}

            </div>
        </div>  
      );
    } else {
      return <div>
            ESTAMOS EN MIS PEDIDOS (SIN DATOS)         
        </div>        

    }
};

export default connect((state) => ({
  credentials:state.credentials, 
  orders:state.orders
  }))(DataMyMovies);
