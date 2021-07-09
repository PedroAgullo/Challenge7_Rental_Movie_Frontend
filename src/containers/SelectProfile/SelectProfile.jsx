
import React from "react";
import { connect } from 'react-redux';
import {useHistory} from "react-router";
import Infantil from '../../images/infantilProfile.jpg';
import Adulto from '../../images/adultProfile.jpg';

const SelectProfile = (props) => {
  let history = useHistory();

  const changeProfile = async (opc) => {  
    if (opc === "infantil"){
      history.push('/infantil');
    }else{
      history.push('/profile');
    }  
  };

      return (
        <div className="selectBox"> 
        <div>
          <h1>ELIGE UN PERFIL</h1>
        </div>
          <div className="fotoBox">

          <div className="fotoDiv">
            <img className="fotoSelect" src={Adulto} alt="Perfil adulto" onClick={()=>changeProfile("adulto")}/>
            <h2>Perfil adulto</h2>
          </div>
          <div className="fotoDiv">
            <img className="fotoSelect" src={Infantil} alt="Perfil infantil" onClick={()=>changeProfile("infantil")}/>
            <h2>Perfil infantil</h2>
          </div>
          </div>
        </div>  
      );

};

export default connect((state) => ({
  credentials:state.credentials, 
  }))(SelectProfile);
