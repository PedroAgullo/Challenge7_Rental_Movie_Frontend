import axios from 'axios';
import {useHistory} from 'react-router-dom';
// import "./Login.css";
import {notification, message} from 'antd';
// import 'antd/dist/antd.css'
import {connect} from 'react-redux';
import {LOGIN} from '../../redux/types'
import React, { useEffect, useState } from "react";


const Login = (props) => {

    let history = useHistory();

    //Hooks
    const [credentials, setCredentials] = useState({email:'', password:''});
    const [msgError, setMensajeError] = useState('');
   

    useEffect(()=>{
        const listener = event => {
            if (event.code === "Enter" || event.code === "NumpadEnter") {
                logeame();
            }
        };
        document.addEventListener("keydown", listener);
        return () => {
            document.removeEventListener("keydown", listener);
        };
    },[credentials]);


    //Handle
    const updateCredentials = (e) => {
        setCredentials ({...credentials, [e.target.name]: e.target.value});
    }

    const logeame = async () => {

        //Primero, testeamos los datos
            
        if (! /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(credentials.email) ) {
             setMensajeError('Introduce el formato de email valido ejemplo@ejemplo.com');
             return;
        }
        console.log ("Credentials : ", credentials);
        //Luego, generamos el body de datos
        let body = {
            email : credentials.email,
            password : credentials.password
        }
        
        //Axios      
            try {
                console.log("Datos que pasamos por body: ", body);
                var res = await axios.post('http://localhost:3005/login', body);
                console.log("Resultado del backend: ", res.data);

                // let perfil = document.getElementById("opciones").value;                
                let data = {
                    token : res.data.token,
                    user : (res.data.customer),
                    idUser: res.data.customer.id,
                }


                let description = ("Bienvenido " + res.data.customer.name + " " + res.data.customer.lastName1 + ".");
                notification.success({message:'Login correcto.',description: description});

                //Guardo en RDX
                props.dispatch({type:LOGIN,payload:data});
                console.log(res.data);
                console.log("premium:", res.data.customer.premium);
                console.log("infantil:", res.data.customer.infantil);
                if ((res.data.customer.premium === true) && (res.data.customer.infantil=== true)){
                    history.push("/infantil")
                }
                               
                //Redireccion           
                history.push("/");

            } catch (err) {      
                    notification.warning({message:'Atencion.',description: JSON.stringify(err.response.data.message)});          
                    notification.warning({message:'Atencion.',description: "Usuario o password incorrecto."});              
            }
    }

    return (

        <div>          

            <div className = "vistaLogin">        
                <div className = "loginCard"> 
                    <div className="espacioBlanco"></div>
                    <div class="form">
                        <input type="text" id="email" class="form__input" name="email" autocomplete="off" placeholder=" "  onChange={updateCredentials}></input>
                        <label for="email" class="form__label">Email</label>
                    </div>
                    <div class="form">
                        <input type="password" id="email" class="form__input" name="password" autocomplete="off" placeholder=" "  onChange={updateCredentials}></input>
                        <label for="email" class="form__label">Password</label>
                    </div>
                    
                    <div className = "sendButton" onClick={()=>logeame()}>Acción!</div>
                    <div>{msgError}</div>
                </div>        
            </div>   
        </div>
    )
}

export default connect()(Login);