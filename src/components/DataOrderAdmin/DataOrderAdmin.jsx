
import React, { useEffect, useState } from "react";
import axios from "axios";
import { message } from 'antd';
import { connect } from 'react-redux';
import {notification} from 'antd';
import moment from "moment";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const DataOrderAdmin = (props) => {

    //hooks
    const [orders, setOrders] = useState([]);  
 

    //Equivalente a componentDidMount en componentes de clase (este se ejecuta solo una vez)
    useEffect(() => {
      findOderByType("All")
    }, []);
  
    // Borra order.
    const deleteOrder = async (orderId) => {
      try{

        let token = props.credentials.token;

        const body = {
          id : orderId
        }

        let res = await axios.post('https://elseptimoartebackend.herokuapp.com/order/delete',body,{headers:{'authorization':'Bearer ' + token}});      
        message.info('Pedido eliminado.');
        findOderByType("All");
     }catch (err){
        notification.warning({message:'Atencion.',description: JSON.stringify(err.response.data.message)});
        }      
    }

    //Encuentra pedido por tipo (compra, alquiler, premiun, todos);
    const findOderByType = async (opc) => {

      let token = props.credentials.token;
      let body = {
        customerId : props.credentials.idUser,
        idUser: props.credentials.idUser,
        type: opc        
      }
      switch(opc){
        case "All" : 
        try{
              let res = await axios.post('https://elseptimoartebackend.herokuapp.com/order/all',body,{headers:{'authorization':'Bearer ' + token}});      
              setOrders(res.data); 
            }catch (err){     
              notification.warning({message:'Atencion.',description: JSON.stringify(err.response.data.message)});
            }  
          return;

        default : 
            try{
              let res = await axios.post('https://elseptimoartebackend.herokuapp.com/order/type',body,{headers:{'authorization':'Bearer ' + token}});      
              setOrders(res.data); 
            }catch (err){     
              notification.warning({message:'Atencion.',description: JSON.stringify(err.response.data.message)});
            }              
          return;
      }
    }

    
    const baseImgUrl = "https://image.tmdb.org/t/p"
    const size = "w200"
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
                          <p className="fecha">Precio: {act.precio}???</p>                  
                        </div>           
                        <div className="dato">
                          <p className="fecha">ID Cliente :  {act.customerId}</p>
                          <p className="fecha">ID Compra: {act.id}</p>                  
                        </div>    
                        <div className="datoVacio"></div>
                        <div className="datoIcon">
                          <FontAwesomeIcon className="iconOrderAdmin" icon={faEdit}/>
                          <FontAwesomeIcon onClick={()=>deleteOrder(act.id)} className="iconOrderAdmin" icon={faTrashAlt}/>

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
                 NO HAYA PEDIDOS DE ESTE TIPO.
               </div>        
            </div>
          </div>            
        )
    }
};

export default connect((state) => ({
  credentials:state.credentials, 
  orders:state.orders
  }))(DataOrderAdmin);
