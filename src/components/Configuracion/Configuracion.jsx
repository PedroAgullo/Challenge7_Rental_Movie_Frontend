
import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import Premiumfoto from '../../images/Premium.jpg';
import {notification} from 'antd';
import axios from "axios";
import {LOGIN} from '../../redux/types'

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
            await axios.post('https://elseptimoartebackend.herokuapp.com/customer/infantil',body,{headers:{'authorization':'Bearer ' + token}});
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
            let res = await axios.post('https://elseptimoartebackend.herokuapp.com/order',bodyOrder,{headers:{'authorization':'Bearer ' + token}});
            console.log(res.data);
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
           let res2 = await axios.post('https://elseptimoartebackend.herokuapp.com/customer/premium',body,{headers:{'authorization':'Bearer ' + token}});
          console.log("REsultado cambio premium:", res2.data);
           
          let data = {
            token : props.credentials.token,
            user : (res2.data),
            idUser: props.credentials.idUser,
          }
          console.log(data);
          props.dispatch({type:LOGIN,payload:data});  


        }catch (err){      
        }  

    }

    if (boton === "subscripcion") {
        return (
            <div className="nombreDataRoom"> 
                <div className="tipoDatosConfig">
                  <div className="botonDatosConfig" onClick={()=>setBoton("subscripcion")}>Subscripcion</div>
                  <div className="botonDatosConfig" >Met.Pago</div>
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
                  <div className="botonDatosConfig" >Met.Pago</div>
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