
// import './DataProfile.css';
// import PhotoProfile from '../../images/defaultFoto.png';
// import PhotoProfile from '../../images/Avatar1.jpg';
import moment from 'moment';
import { connect } from 'react-redux';
import React, { useEffect, useState } from "react";
import axios from 'axios';
import {UPDATE} from '../../redux/types'
import {notification} from 'antd';

const DataProfile = (props) => {
       
        //Hooks
        const [profile, setProfile] = useState([]); 
        const [datosUser, setDatosUser] = useState(
            {
                address: props.credentials.user.address,
                postalCode: props.credentials.user.postalCode,
                city: props.credentials.user.city,
                phone: props.credentials.user.phone
        });        

    const [errors, setErrors] = useState({
        eName : '',
        eLastName1: '',
        eLastName2: '',
        eEmail: '',
        ePassword: '',
        eBirthday: '',
        eAddress: '',
        epostalCode: '',
        eCity: '',
        eDni: '',
        eTelephone: ''        
    });

    useEffect(() => {
        setProfile(1);
      }, []);

    let user = props.credentials.user;   

    const changeState = (info) => {        
        setProfile(info);
    }

    const [newMessage, setNewMessage] = useState([]);

    //Handlers (manejadores)

    const updateFormulario = (e) => {
        setDatosUser({...datosUser, [e.target.name]: e.target.value});
    }

    const checkError = (arg) => {
        switch (arg){
            case 'name':
                
                if(datosUser.name.length < 1){
                    setErrors({...errors, eName: 'El campo nombre no puede estar vacío.'});
                }else if(datosUser.name.length < 2){
                    setErrors({...errors, eName: 'El nombre debe de tener al menos 2 caracteres'});
                }else if (! /^[a-z ,.'-]+$/i.test(datosUser.name) ) {
                    setErrors({...errors, eName: 'Introduce el formato de nombre valido'}); 
                }else{
                    setErrors({...errors, eName: ''});
                }
            break;
            
            case 'lastName1':
                if(datosUser.lastName1.length < 1){
                    setErrors({...errors, eLastName1: 'El campo Apellido no puede estar vacío.'});
                }else if (datosUser.lastName1.length < 2){
                    setErrors({...errors, eLastName1: 'El apellido debe de tener al menos 2 caracteres'});
                }else if (! /^[a-z ,.'-]+$/i.test(datosUser.lastName1) ) {
                    setErrors({...errors, eLastName1: 'Introduce el formato de apellido valido'});     
                }else{
                    setErrors({...errors, eLastName1: ''});
                }                
            break;

            case 'lastName2':
                if(datosUser.lastName2.length < 1){
                    setErrors({...errors, eLastName2: 'El campo Apellido no puede estar vacío.'});
                }else if (datosUser.lastName2.length < 4){
                    setErrors({...errors, eLastName2: 'El campo Apellido debe de tener 4 caracteres'});
                }else if (! /^[a-z ,.'-]+$/i.test(datosUser.lastName2) ) {
                    setErrors({...errors, eLastName2: 'Introduce el formato de apellido valido'}); 
                }else{
                    setErrors({...errors, eLastName2: ''});
                }                
            break;


            case 'email':
                if(datosUser.email.length < 1){
                    setErrors({...errors, eEmail: 'El campo email no puede estar vacío.'});
                }else if (datosUser.email.length < 4){
                    setErrors({...errors, eEmail: 'El email debe de tener 4 caracteres'});
                }else if (! /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(datosUser.email) ) {
                    setErrors({...errors, eEmail: 'Introduce el formato de email valido ejemplo@ejemplo.com'});                    
                }else{
                    setErrors({...errors, eEmail: ''});
                }
                
            break;

            case 'password':
                if(datosUser.password.length < 1){
                    setErrors({...errors, ePassword: 'El campo password no puede estar vacío.'});
                }else if (datosUser.password.length < 6){
                    setErrors({...errors, ePassword: 'El password debe de tener al menos 6 caracteres'});
                }else if (!/^\+?[0-9]{6}/.test(datosUser.password) ) {
                    setErrors({...errors, ePassword: 'Introduce el password valido'}); 
                }else{
                    setErrors({...errors, ePassword: ''});
                }                
            break;          

            case 'address':
                if(datosUser.address.length < 1){
                    setErrors({...errors, eAddress: 'El campo direccion no puede estar vacío.'});
                }else if  (!/^(?=.{3,40}$)[a-zA-ZñÑ 1-9 , /]+(?:[-'\s][a-zA-Z]+[-!$%^&*()_+|~=`{}";'<>?,.]+)*$/.test(datosUser.address)){
                    setErrors({...errors, eAddress: 'La direccion debe ser alfanumerica'});
                }else{
                    setErrors({...errors, eAddress: ''});
                }                
            break;

            case 'city':
                if(datosUser.city.length < 1){
                    setErrors({...errors, eCity: 'El campo ciudad no puede estar vacío.'});
                }else if  (! /^[a-z ,.'-]+$/i.test(datosUser.city) ) {
                    setErrors({...errors, eCity: 'El campo ciudad solo puede contener letras'});
                }else{
                    setErrors({...errors, eCity: ''});
                }                
            break;

            case 'postalCode':
                if(datosUser.postalCode.length < 1){
                    setErrors({...errors, epostalCode: 'El campo codigo postal no puede estar vacío.'});
                }else if (! /[\d()+-]{5}/g.test(datosUser.postalCode)) {
                    setErrors({...errors, epostalCode: 'El campo codig postal solo puede tener 5 números.'});
                }else{
                    setErrors({...errors, epostalCode: ''});
                }                
            break;

            case 'dni':
                if(datosUser.dni.length < 1){
                    setErrors({...errors, eDni: 'El campo DNI no puede estar vacío.'});
                }else if  (! /^\d{8}[a-zA-Z]$/.test(datosUser.dni) ){
                    setErrors({...errors, eDni: 'Formato de DNI incorrecto.'});
                }else{
                    setErrors({...errors, eDni: ''});
                }
            break;

            case 'telephone':
                if(datosUser.phone.length < 1){
                    setErrors({...errors, ePhone: 'El campo telefono no puede estar vacío.'});
                }else if (datosUser.ePhone.length < 9){
                    setErrors({...errors, ephone: 'El campo telefono debe de tener 9 números'});
                }else if (! /[\d()+-]{9}/g.test(datosUser.phone)) {
                    setErrors({...errors, ePhone: 'Introduce el formato de teléfono valido 999999999'});                        
                }else{
                    setErrors({...errors, ePhone: ''});
                }
            break;
        }
    }

    const saveData = async (info) => {       
            try {
                let token = props.credentials.token;
                let idUser = props.credentials.user.id;
                let address = datosUser.address;
                let city = datosUser.city;
                let phone = datosUser.phone;
        
                let body = {
                    id : idUser,
                    customerId : idUser,
                    idUser : idUser,
                    address : address,
                    city : city,
                    phone : phone,
                    postalcode: datosUser.postalCode  
                }


                let res = await axios.post('http://localhost:3005/customer/update',body,{headers:{'authorization':'Bearer ' + token}});

                let data = {
                    token: token,
                    user : res.data,
                    idUser: idUser,
                    perfil: "user"
                }

                props.dispatch({type:UPDATE,payload:data});
                notification.success({message:'Atencion.',description: "Datos actualizados correctamente."});

                setProfile(info);
            
             } catch (error) {            
        }        
    }

    if (profile === 1) {
        return (
            <div>
                <div className="tituloDataProfile"><h1>Perfil del usuario</h1></div>
                    <div className="tipoDatos">
                        <div className="botonDatos" onClick={(()=>changeState(2))}>Editar</div>
                     </div>
                     
                <div className="boxDataProfileUser">

                    <div className="infoUser2">
                        <div class="form">
                            <input type="text" id="name" class="form__input" name="name" autocomplete="off" placeholder=" " value={user.name} readonly="readonly"></input>
                            <label for="name" class="form__label">Nombre</label>
                        </div>
                        <div class="form">
                            <input type="text" id="lastName1" class="form__input" name="lastName1" autocomplete="off" placeholder=" " value={user.lastName1} readonly="readonly"></input>
                            <label for="lastName1" class="form__label">Primer apellido</label>
                        </div>
                        <div class="form">
                            <input type="text" id="lastName2" class="form__input" name="lastName2" autocomplete="off" placeholder=" " value={user.lastName2} readonly="readonly"></input>
                            <label for="lastName2" class="form__label">Segundo apellido</label>
                        </div>
                        <div class="form">
                            <input type="text" id="email" class="form__input" name="email" autocomplete="off" placeholder=" " value={user.email} readonly="readonly"></input>
                            <label for="email" class="form__label">Email</label>
                        </div>
                        <div class="form">
                            <input type="password" id="password" class="form__input" name="password" autocomplete="off" placeholder=" " value="********" readonly="readonly"></input>
                            <label for="password" class="form__label">Password</label>
                        </div>
                    </div>

                    <div className="infoUser2">
                        <div class="form">
                            <input type="text" id="address" class="form__input" name="address" autocomplete="off" placeholder=" " value={user.address} readonly="readonly"></input>
                            <label for="address" class="form__label">Dirección</label>
                        </div>
                        <div class="form">
                            <input type="text" id="city" class="form__input" name="city" autocomplete="off" placeholder=" " value={user.city} readonly="readonly"></input>
                            <label for="city" class="form__label">Ciudad</label>
                        </div>
                        <div class="form">
                            <input type="text" id="postalCode" class="form__input" name="postalCode" autocomplete="off" placeholder=" " value={user.postalCode} readonly="readonly"></input>
                            <label for="postalCode" class="form__label">Código postal</label>
                        </div>
                        <div class="form">
                            <input type="text" id="phone" class="form__input" name="phone" autocomplete="off" placeholder=" " value={user.phone} readonly="readonly"></input>
                            <label for="phone" class="form__label">Telephone</label>
                        </div>
                        <div class="form">
                            <input type="Date" id="birthday" class="form__input" name="birthday" autocomplete="off" placeholder=" " value={moment(user.birthday).format('L')} readonly="readonly"></input>
                            <label for="birthday" class="form__label">Fecha nacimiento</label>
                        </div>
                    </div>

                </div>

            </div>
        )
    }else {
        return (
            <div>
                <div className="tituloDataProfile"><h1>Perfil del usuario</h1></div>
                <div className="tipoDatos">
                    <div className="botonDatos" onClick={(()=>saveData(1))}>Guardar</div>
                    <div className="botonDatos" onClick={(()=>changeState(1))}>Volver</div>
                </div>
                     
                <div className="boxDataProfileUser">
                    <div className="infoUs">
                        <div class="form">       
                            <input type="text" id="name" class="form__input" name="name" autocomplete="off" placeholder=" " value={user.name} readonly="readonly"></input>                     
                            <label for="name" class="form__label">Nombre</label>
                        </div>
                        <div class="form">
                            <input type="text" id="lastName1" class="form__input" name="lastName1" autocomplete="off" placeholder=" " value={user.lastName1} readonly="readonly"></input>
                            <label for="lastName1" class="form__label">Primer apellido</label>
                        </div>
                        <div class="form">
                            <input type="text" id="lastName2" class="form__input" name="lastName2" autocomplete="off" placeholder=" " value={user.lastName2} readonly="readonly"></input>
                            <label for="lastName2" class="form__label">Segundo apellido</label>
                        </div>
                        <div class="form">
                            <input type="text" id="email" class="form__input" name="email" autocomplete="off" placeholder=" " value={user.email} readonly="readonly"></input>
                            <label for="email" class="form__label">Email</label>
                        </div>
                        <div class="form">
                            <input type="password" id="password" class="form__input" name="password" autocomplete="off" placeholder=" " value="********" readonly="readonly"></input>
                            <label for="password" class="form__label">Password</label>
                        </div>
                    </div>

                    <div className="infoUser2">
                        <div class="form">
                            <input type="text" id="address" class="form__input" name="address" autoComplete="off" placeholder={user.address}  onChange={updateFormulario} onBlur={()=>checkError("address")}></input>
                            <label for="address" class="form__label">Dirección</label>
                        </div>
                        <div class="form">
                            <input type="text" id="city" class="form__input" name="city" autocomplete="off" placeholder={user.city}  onChange={updateFormulario} onBlur={()=>checkError("city")}></input>
                            <label for="city" class="form__label">Ciudad</label>
                        </div>
                        <div class="form">
                            <input type="text" id="postalCode" class="form__input" name="postalCode" autocomplete="off" placeholder={user.postalCode} onChange={updateFormulario} onBlur={()=>checkError("postalCode")}></input>
                            <label for="postalCode" class="form__label">Código postal</label>
                        </div>
                        <div class="form">
                            <input type="text" id="phone" class="form__input" name="phone" autocomplete="off" placeholder={user.phone} onChange={updateFormulario} onBlur={()=>checkError("phone")} ></input>
                            <label for="phone" class="form__label">Telephone</label>
                        </div>
                        <div class="form">
                            <input type="Date" id="birthday" class="form__input" name="birthday" autocomplete="off" placeholder=" " value={moment(user.birthday).format('L')} readonly="readonly"></input>
                            <label for="birthday" class="form__label">Fecha nacimiento</label>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default connect((state)=>({
    credentials:state.credentials,
}))(DataProfile);