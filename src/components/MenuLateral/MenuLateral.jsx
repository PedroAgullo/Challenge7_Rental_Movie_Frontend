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

      case "subscription":
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
        <div className="tituloVistaAdmin">MENÚ USUARIO</div>
          <div className="botomMenuLateral"onClick={() => cambiaDatos("profile")}>Perfil</div>
          <div className="botomMenuLateral"onClick={() => cambiaDatos("misPedidos")}>Mis pedidos</div>
          <div className="botomMenuLateral"onClick={() => cambiaDatos("myMovies")}>Mis películas</div>
          <div className="botomMenuLateral"onClick={() => cambiaDatos("favoritos")}>Favoritos</div>
          <div className="botomMenuLateral"onClick={() => cambiaDatos("subscription")}>Suscripción</div>          
        </div>
      </div>
    );
  }  else {
    return (
      <div className="boxLateral">
        <div className="lateralMenu">
          <div className="tituloVistaAdmin">Administrador</div>
          <div className="botomMenuLateral"onClick={() => cambiaDatos("useroom")}>Pedidos</div>
          <div className="botomMenuLateral"onClick={() => cambiaDatos("joinuser")}>ver/editar clientes</div>
          <div className="botomMenuLateral"onClick={() => cambiaDatos("newroom")}>Ver/editar pedidos</div>
          <div className="botomMenuLateral"onClick={() => cambiaDatos("codeqr")}>Vista admin :)</div>
        </div>
      </div>
    );
  }
};

export default connect((state) => ({
  credentials: state.credentials,
  tipodatos: state.tipodatos,
}))(Menulateral);
