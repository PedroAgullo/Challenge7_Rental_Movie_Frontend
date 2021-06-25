
//Nos muestra las clases activas a las que está apuntado el usuario.
import React, { useEffect, useState } from "react";
import './DataOrderAdmin.css';
import axios from "axios";
import { Popconfirm, message, Button } from 'antd';
import { connect } from 'react-redux';
import {notification} from 'antd';


const DataOrderAdmin = (props) => {

    //hooks
    const [orders, setOrders] = useState([]);  
  
    //Equivalente a componentDidMount en componentes de clase (este se ejecuta solo una vez)
    useEffect(() => {
      findAllOrders();
    }, []);
  
    //Equivalente a componentDidUpdate en componentes de clase
    useEffect(() => {
    });
  
    //CANCELA LA CLASE
    const cancelClass = async (roomId) => {
      try{
        message.info('Clase cancelada.');

      let token = props.credentials.token;
      let idUser = props.credentials.idUser;


      let body = {
        id : roomId,
        member : idUser
      }

      let res = await axios.post('http://localhost:3005/room/leave',body,{headers:{'authorization':'Bearer ' + token}});

      findAllOrders();
     }catch (err){
        notification.warning({message:'Atencion.',description: JSON.stringify(err.response.data.message)});
        }      
    }

    const findAllOrders = async () => {  
    try{

      let idUser = props.credentials.idUser;
      let token = props.credentials.token;
    
      let body = {
        customerId : idUser,
        idUser: idUser        
      }

      let res = await axios.post('http://localhost:3005/order/all',body,{headers:{'authorization':'Bearer ' + token}});
     
      console.log("Datos devueltos del backend: ", res.data);    
      setOrders(res.data);; 

    }catch (err){     
        console.log(err) ;
        notification.warning({message:'Atencion.',description: JSON.stringify(err.response.data.message)});
    }
  
    }
    
    const baseImgUrl = "https://image.tmdb.org/t/p"
    const size = "w200"
    console.log("Datos del Hook orders:", orders);
   if (orders[0]?.id) {
      return (
        <div className="nombreDataRoom"> <h1>Todos los pedidos</h1>

            <div className="boxCardDataRoom">
              {orders.map((act, index) => (
                <div className="card" key={index}>                
                    <div>                    
                        <img src={`${baseImgUrl}/${size}${act.photoMovie}`}  alt="poster" className="posterMovie"/>
                    </div>
                        
                    <div>
                        <p className="nombre">{act.title}</p>
                        <p className="fecha">Fecha compra: {act.createdAt}</p>
                        <p className="fecha">Precio: {act.precio}€</p>
                    </div>
                </div>

                   ))}

            </div>
        </div>  
      );
    } else {
      return <div>
            ESTAMOS EN TODOS LOS PEDIDOS (ADMIN)
        </div>        

    }
};

export default connect((state) => ({
  credentials:state.credentials, 
  orders:state.orders
  }))(DataOrderAdmin);
