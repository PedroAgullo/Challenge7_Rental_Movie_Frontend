import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./MenuLateral.css";
import { connect } from "react-redux";
import { CAMBIADATOS} from "../../redux/types";

const Menulateral = (props) => {


  let history = useHistory();
  let credentials = props.credentials;
  const [useroom, setUseroom] = useState([]);

  const cambiaDatos = async (info) => {
    switch (info) {
      case "profile":
        props.dispatch({ type: CAMBIADATOS, payload: info });

        break;

      case "misPedidos":
        props.dispatch({ type: CAMBIADATOS, payload: info });

        break;


      case "myMovies":
        props.dispatch({ type: CAMBIADATOS, payload: info });

        break;

      case "favoritos":
        props.dispatch({ type: CAMBIADATOS, payload: info });

        break;

      case "payment":
        props.dispatch({ type: CAMBIADATOS, payload: info });

        break;

      default:

        break;
    }
  };

  //IFS PARA MOSTRAR UN MENU SEGUN EL TIPO DE USUARIO QUE ACCEDE A LA APLICACIÓN
  if (props?.credentials?.user?.admin === false) 
  {
    return (
      <div className="boxLateral">
        <div className="lateralMenu">
          <div className="botomMenuLateral"onClick={() => cambiaDatos("profile")}>Perfil</div>
          <div className="botomMenuLateral"onClick={() => cambiaDatos("misPedidos")}>Mis pedidos</div>
          <div className="botomMenuLateral"onClick={() => cambiaDatos("myMovies")}>Mis películas</div>
          <div className="botomMenuLateral"onClick={() => cambiaDatos("favoritos")}>Favoritos</div>
          <div className="botomMenuLateral"onClick={() => cambiaDatos("payment")}>Suscripción</div>          
        </div>
      </div>
    );
  }  else {
    return (
      <div className="boxLateral">
        <div className="lateralMenu">
          <div className="tituloVistaAdmin">Vista Administrador</div>
          <div className="botomMenuLateral"onClick={() => cambiaDatos("profile")}>Profile</div>
          <div className="botomMenuLateral"onClick={() => cambiaDatos("useroom")}>Mis Clases</div>
          <div className="botomMenuLateral"onClick={() => cambiaDatos("joinuser")}>Ver/editar clases activas</div>
          <div className="botomMenuLateral"onClick={() => cambiaDatos("newroom")}>Crear/editar Sala</div>
          <div className="botomMenuLateral"onClick={() => cambiaDatos("newcoach")}>Crear/editar Coach</div>
          <div className="botomMenuLateral"onClick={() => cambiaDatos("newuser")}>Crear/Editar Cliente</div>
          <div className="botomMenuLateral"onClick={() => cambiaDatos("codeqr")}>Acceso GYM</div>
        </div>
      </div>
    );
  }
};

export default connect((state) => ({
  credentials: state.credentials,
  tipodatos: state.tipodatos,
}))(Menulateral);
