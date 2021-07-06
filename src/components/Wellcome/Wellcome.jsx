
import React from 'react';
import {connect} from 'react-redux';
// import Premiumfoto from '../../images/Premium.jpg';
// import Logo1 from '../../images/Logo4.jpg';
import {notification} from 'antd';
import {useHistory} from "react-router";

const Wellcome = (props) => {

    let history = useHistory();

    let buyPremium = () => {
        if (props.credentials?.token === "" || props.credentials?.token === undefined) {
            notification.warning({message:'Registrate o haz login',description: "Para acceder a las ventajas de ser premium, regístrate o haz login." });   
        }else{
            history.push('profile');
        }
    }

    return (
        <div className="SearchDiv">
            <div className="box">
                <div>
                    <img src="" alt="Logo" className="fotoWellcome"/>
                </div>
                <div>
                    <p>Bienvenidos a "El Séptimo Arte". Tu servicio de video bajo de manda.</p>
                    <p>Con nosotros podrás acceder a una biblioteca de cientos de películas.</p>
                    <p>Alquila o compra una película para verla cuantas veces quiera.</p>                
                </div>
            </div>

            <div className="box">
                <div>
                    <img src="" id="fotopremium"alt="Premium" className="fotoWellcome" onClick={()=>buyPremium()}/>
                </div>
                <div>
                    <p>Con nuestra subscripción Premium  accederás a todas nuestras películas.</p> 
                    <p> Con la versión Premium obtiense acceso a una zona infantil. </p>
                    <p>Dispones de un control parental para limitar el acceso a las películas que tú quieras.</p>
                </div>
            </div>
        </div>
    );
}

export default connect((state) => ({
    user: state.credentials.user,
    tipodatos: state.tipodatos,
    credentials:state.credentials
}))(Wellcome);