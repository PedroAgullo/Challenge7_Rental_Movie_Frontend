
import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import Premiumfoto from '../../images/Premium.jpg';
import {notification} from 'antd';
import axios from "axios";

const Configuracion = (props) => {

    const [boton, setBoton] = useState("subscripcion");   

    useEffect(() => {
    }, []);
    

    const infantilChange = async (opc) => {

        let idUser = props.credentials.idUser;
        let token = props.credentials.token;

        let body = {
          idUser : idUser,
          customerId : idUser,
          infantil: opc
        }
        try{
            await axios.post('http://localhost:3005/customer/infantil',body,{headers:{'authorization':'Bearer ' + token}});
            notification.success({message:'Cambio realizado.',description: "Cambios realizados correctamente."});
        }catch (err){      
        //   notification.warning({message:'Atencion.',description: JSON.stringify(err.response.data.message)});                  
        }      
    }

    const compraPremium = async (precio) => {

        let idUser = props.credentials.idUser;
        let token = props.credentials.token;
        let bodyOrder = {
          idUser : idUser,
          customerId : idUser,
          movieId : 0,
          photoMovie: "https://github.com/PedroAgullo/Challenge7_Rental_Movie_Frontend/blob/develop/src/Images/Premium.jpg?raw=true",
          title: "Premium",
          precio: precio,
          type: "Premium"
        }

        try{
            await axios.post('http://localhost:3005/order',bodyOrder,{headers:{'authorization':'Bearer ' + token}});
            notification.success({message:'Compra realizada.',description: "A partir de ahora puedes acceder a todas las ventajas de ser Premium."})
        }catch (err){      
        //   notification.warning({message:'Atencion.',description: JSON.stringify(err.response.data.message)});                  
        }   
        
        

          let body = {
          idUser : idUser,
          customerId : idUser,
          id: idUser,
          premium: true
        }
        try{
            await axios.post('http://localhost:3005/customer/premium',body,{headers:{'authorization':'Bearer ' + token}});
        }catch (err){      
        }  
    }

    if (boton === "subscripcion") {
        return (
            <div className="nombreDataRoom"> 
                <div className="tipoDatosConfig">
                  <div className="botonDatosConfig" onClick={()=>setBoton("subscripcion")}>Subscripcion</div>
                  <div className="botonDatosConfig" onClick={()=>setBoton("pago")}>Met.Pago</div>
                  <div className="botonDatosConfig" onClick={()=>setBoton("infantil")}>Ctrl.Parental</div>
                </div>

                <div className="boxCardDataRoom">
                    <img src={Premiumfoto} id="fotopremium"alt="Premium" className="fotoWellcome" onClick=""/> 
                    <div className="botonDatosConfig" onClick={()=>compraPremium(25)}>Comprar</div>
               
                </div>
                
            </div>  
    );
      } else if(boton === "infantil") {
           return (
            <div>
              <div className="nombreDataRoom"> 
              <div className="tipoDatosConfig">
                  <div className="botonDatosConfig" onClick={()=>setBoton("subscripcion")}>Subscripcion</div>
                  <div className="botonDatosConfig" onClick={()=>setBoton("pago")}>Met.Pago</div>
                  <div className="botonDatosConfig" onClick={()=>setBoton("infantil")}>Ctrl.Parental</div>
                </div>                
                    <h3>Desde aquí puedes activar o desactivar el perfin infaltil.</h3>
                <div className="botonPremium">        
                    <div className="botonDatosConfig" onClick={()=>infantilChange(true)}>Activar</div>
                    <div className="botonDatosConfig" onClick={()=>infantilChange(false)}>Desactivar</div>
                 </div>        
              </div>
            </div>            
          )    
        }
}
export default connect((state) => ({
    credentials: state.credentials,
    tipodatos: state.tipodatos
}))(Configuracion);