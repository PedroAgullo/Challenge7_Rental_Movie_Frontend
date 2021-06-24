
//Nos muestra las clases activas a las que está apuntado el usuario.
import React, { useEffect, useState } from "react";
import './DataMyMovies.css';
import axios from "axios";
import moment from "moment";
import { Popconfirm, message, Button } from 'antd';
import { connect } from 'react-redux';
import { GETORDER } from '../../redux/types';
import {notification} from 'antd';


const DataMyMovies = (props) => {

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

    

      findOrders();
     }catch (err){
        notification.warning({message:'Atencion.',description: JSON.stringify(err.response.data.message)});

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
    //   props.dispatch({type:GETORDER,payload: res.data});

    
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
        <div className="nombreDataRoom"> <h1>MIS PEDIDOS</h1>


            <div className="boxCardDataRoom">
              {orders.map((act, index) => (
                <div className="card" key={index}>
                    <p className="nombre">{act.title}</p>
                    {/* <p className="datosCard">Comienzo: {moment(act.dateStart).format('LLL')}</p>
                    <p className="datosCard">Fin: {moment(act.dateEnd).format('LLL')}</p>
                    <p className="datosCard">Entrenador: {act.nameCoach}</p>
                    <p className="datosCard">Capacidad: {act.members.length}/{act.maxMember}</p> */}
                    <img src={`${baseImgUrl}/${size}${act.photoMovie}`}  alt="poster" className="posterMovie"/>

                  <div clasName="botonCardJoinUser">
                        <div className="demo">
                            <div style={{ marginLeft: 0, clear: 'both', whiteSpace: 'nowrap' }}>
                              <Popconfirm placement="bottom" title="¿Quieres cancelar esta clase?" onConfirm={()=>cancelClass(act._id)} okText="Yes" cancelText="No">
                                <Button>Cancelar</Button>
                              </Popconfirm>
                            </div>
                        </div>
                    </div>
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
