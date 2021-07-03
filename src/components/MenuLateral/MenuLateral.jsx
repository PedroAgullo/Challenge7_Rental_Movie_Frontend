import React, { useState } from "react";
import { useHistory } from "react-router-dom";
// import "./MenuLateral.css";
import { connect } from "react-redux";
import { CAMBIADATOS} from "../../redux/types";
import { faStar, faAddressCard, faUsers, faShoppingCart, faFilm, faCog, faChartBar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


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

      case "ordersAdmin":
          props.dispatch({ type: CAMBIADATOS, payload: info });
  
         break;
         
      case "userAdmin":
          props.dispatch({ type: CAMBIADATOS, payload: info });
  
        break;

      case "stats":
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
      <div>
        <nav class="sidebar-navigation">
          <ul>
            <li class="active" onClick={() => cambiaDatos("profile")}>
              <FontAwesomeIcon className="iconAdmin" icon={faAddressCard}/>
              <span class="tooltip">Datos Admin</span>
            </li>
            <li onClick={() => cambiaDatos("misPedidos")}>
              <FontAwesomeIcon className="iconAdmin" icon={faShoppingCart}/>
              <span class="tooltip" >Mis pedidos</span>
            </li>
            <li onClick={() => cambiaDatos("myMovies")}>
              <FontAwesomeIcon className="iconAdmin" icon={faFilm}/>
              <span class="tooltip">Mis peliculas</span>
            </li>
            <li onClick={() => cambiaDatos("favoritos")}>
              <FontAwesomeIcon className="iconAdmin" icon={faStar}/>
              <span class="tooltip">Favoritos</span>
            </li>
            <li onClick={() => cambiaDatos("subscription")}>
            <FontAwesomeIcon className="iconAdmin" icon={faCog}/>
            <span class="tooltip">Configuración</span>
            </li>
          </ul>
        </nav>
      </div>
    );
    // return (
    //   <div className="boxLateral">
    //     <div className="lateralMenu">
    //     <div className="tituloVistaAdmin">MENÚ USUARIO</div>
    //       <div className="botomMenuLateral"onClick={() => cambiaDatos("profile")}>Mi perfil</div>
    //       <div className="botomMenuLateral"onClick={() => cambiaDatos("misPedidos")}>Mis pedidos</div>
    //       <div className="botomMenuLateral"onClick={() => cambiaDatos("myMovies")}>Mis películas</div>
    //       <div className="botomMenuLateral"onClick={() => cambiaDatos("favoritos")}>Favoritos</div>
    //       <div className="botomMenuLateral"onClick={() => cambiaDatos("subscription")}>Suscripción</div>          
    //     </div>
    //   </div>
    // );
  }  else {
      return (
        <div>
          <nav class="sidebar-navigation">
	          <ul>
		          <li class="active" onClick={() => cambiaDatos("profile")}>
                <FontAwesomeIcon className="iconAdmin" icon={faAddressCard}/>
			          <span class="tooltip">Datos Admin</span>
		          </li>
		          <li onClick={() => cambiaDatos("ordersAdmin")}>
                <FontAwesomeIcon className="iconAdmin" icon={faShoppingCart}/>
			          <span class="tooltip" >Pedidos</span>
		          </li>
		          <li onClick={() => cambiaDatos("userAdmin")}>
                <FontAwesomeIcon className="iconAdmin" icon={faUsers}/>
			          <span class="tooltip">Usuarios</span>
		          </li>
		          <li onClick={() => cambiaDatos("stats")}>
                <FontAwesomeIcon className="iconAdmin" icon={faChartBar}/>
          			<span class="tooltip">Estadisticas</span>
		          </li>
		          <li >
              <FontAwesomeIcon className="iconAdmin" icon={faCog}/>
			        <span class="tooltip">Configuración</span>
		          </li>
	          </ul>
          </nav>
        </div>
      );
    // return (
    //   <div className="boxLateral">
    //     <div className="lateralMenu">
    //       <div className="tituloVistaAdmin">Administrador</div>
    //       <div className="botomMenuLateral"onClick={() => cambiaDatos("profile")}>Mi perfil</div>
    //       <div className="botomMenuLateral"onClick={() => cambiaDatos("ordersAdmin")}>Ver/editar pedidos</div>
    //       <div className="botomMenuLateral"onClick={() => cambiaDatos("userAdmin")}>Ver/editar clientes</div>
    //       <div className="botomMenuLateral"onClick={() => cambiaDatos("stats")}>Estadísticas :)</div>
    //     </div>
    //   </div>
    // );
  }
};

export default connect((state) => ({
  credentials: state.credentials,
  tipodatos: state.tipodatos,
}))(Menulateral);
