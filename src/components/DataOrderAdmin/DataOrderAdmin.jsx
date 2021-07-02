
import React, { useEffect, useState } from "react";
import axios from "axios";
import { message } from 'antd';
import { connect } from 'react-redux';
import {notification} from 'antd';
import moment from "moment";



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
        <div className="nombreDataRoom"> 
            <div className="tipoDatos">
              <div className="botonDatos">Todo</div>
              <div className="botonDatos">Ventas</div>
              <div className="botonDatos">Alquileres</div>
              <div className="botonDatos">Premium</div>
            </div>
            <div className="boxCardDataRoom">
              {orders.map((act, index) => (
                <div className="cardAdmin" key={index}>                
                    <div>                    
                        <img src={`${baseImgUrl}/${size}${act.photoMovie}`}  alt="poster" className="posterDataMovieVentas"/>
                    </div>  
                    <div className="cardAdminRight">
                        <div className="dato">
                          <p className="">{act.title}</p>                        
                          <p className="fecha">Fecha: {moment(act.createdAt).format('LL')}</p>
                        </div>
                        <div className="dato">
                          <p className="fecha">Tipo:  {act.type}</p>
                          <p className="fecha">Precio: {act.precio}€</p>                  
                        </div>           
                        <div className="dato">
                          <p className="fecha">ID Cliente :  {act.customerId}</p>
                          <p className="fecha">ID Compra: {act.id}</p>                  
                        </div>                
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
