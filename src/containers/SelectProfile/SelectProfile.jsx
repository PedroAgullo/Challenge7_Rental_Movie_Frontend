
import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from 'react-redux';
import { GETMOVIE } from '../../redux/types';
import {useHistory} from "react-router";
import infantil from '../../images/infantilProfile.jpg';
import adulto from '../../images/adultProfile.jpg';

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
            <img className="fotoSelect" src={adulto} alt="Perfil adulto" onClick={()=>changeProfile("adulto")}/>
            <h2>Perfil adulto</h2>
          </div>
          <div className="fotoDiv">
            <img className="fotoSelect" src={infantil} alt="Perfil infantil" onClick={()=>changeProfile("infantil")}/>
            <h2>Perfil infantil</h2>
          </div>
          </div>
        </div>  
      );

};

export default connect((state) => ({
  credentials:state.credentials, 
  getroomusers:state.getroomusers
  }))(SelectProfile);
