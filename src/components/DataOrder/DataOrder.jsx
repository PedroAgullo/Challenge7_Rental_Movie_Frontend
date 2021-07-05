
import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { connect } from 'react-redux';
import {notification} from 'antd';

const DataOrder = (props) => {

    //hooks
    const [orders, setOrders] = useState([]);  
  
    useEffect(() => {
      findOderByType("All");
    }, []);

    const findOderByType = async (opc) => {

      let token = props.credentials.token;
      let body = {
        customerId : props.credentials.idUser,
        idUser: props.credentials.idUser,
        id: props.credentials.idUser,
        type: opc        
      }

      switch(opc){
        case "All" : 
        try{
              let res = await axios.post('http://localhost:3005/order/user',body,{headers:{'authorization':'Bearer ' + token}});      
              setOrders(res.data); 
            }catch (err){     
              notification.warning({message:'Atencion.',description: JSON.stringify(err.response.data.message)});
            }  
          return;

        default : 
            try{
              let res = await axios.post('http://localhost:3005/order/idtype',body,{headers:{'authorization':'Bearer ' + token}});      
              setOrders(res.data); 
            }catch (err){     
              notification.warning({message:'Atencion.',description: JSON.stringify(err.response.data.message)});
            }              
          return;
      }
    }
    
   
    const baseImgUrl = "https://image.tmdb.org/t/p"
    const size = "w500"

   if (orders[0]?.id) {
      return (
        <div className="nombreDataRoom"> 
        <div className="tipoDatos">
          <div className="botonDatos" onClick={()=>findOderByType("All")}>Todo</div>
          <div className="botonDatos" onClick={()=>findOderByType("Compra")}>Compras</div>
          <div className="botonDatos" onClick={()=>findOderByType("Alquiler")}>Alquileres</div>
          <div className="botonDatos" onClick={()=>findOderByType("Premium")}>Premium</div>
        </div>
        <div className="boxCardDataRoom">
          {orders.map((act, index) => (
            <div className="cardUser" key={index}>                
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
                      <p className="fecha">ID:  {act.id}</p>
                    </div>    
              
                </div>                      
            </div>
               ))}
        </div>
    </div>  
  );
    } else {
         return (
          <div>
            <div className="nombreDataRoom"> 
              <div className="tipoDatos">
                <div className="botonDatos" onClick={()=>findOderByType("All")}>Todo</div>
                <div className="botonDatos" onClick={()=>findOderByType("Compra")}>Compras</div>
                <div className="botonDatos" onClick={()=>findOderByType("Alquiler")}>Alquileres</div>
                <div className="botonDatos" onClick={()=>findOderByType("Premium")}>Premium</div>
              </div>

              <div>        
                 NO HAY PEDIDOS DE ESTE TIPO.
               </div>        
            </div>
          </div>            
        )     

    }
};

export default connect((state) => ({
  credentials:state.credentials, 
  orders:state.orders
  }))(DataOrder);
