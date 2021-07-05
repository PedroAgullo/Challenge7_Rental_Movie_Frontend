import React from 'react';
import MenuLateral from '../../components/MenuLateral/MenuLateral';
import { connect } from 'react-redux';
import DataProfile from '../../components/DataProfile/DataProfile';
import DataOrder from '../../components/DataOrder/DataOrder';
import DataMyMovies from '../../components/DataMyMovies/DataMyMovies';
import DataOrderAdmin from '../../components/DataOrderAdmin/DataOrderAdmin';
import DataProfileAdmin from '../../components/DataProfileAdmin/DataProfileAdmin';
import Stats from '../../components/Stats/Stats';
import Configuracion from '../../components/Configuracion/Configuracion';

const Profile = (props) => {

    const traeDatos = () => {
        switch (props.tipodatos) {
            case 'profile':

                return <DataProfile />

            case 'misPedidos':

                return <DataOrder />
           
            case 'myMovies':

                return <DataMyMovies/>
            
            case 'ordersAdmin':

                return <DataOrderAdmin/>


            case 'userAdmin':

                return <DataProfileAdmin/>

            case 'stats':

                return <Stats/>

            case 'configuracion':

                return <Configuracion/>

            default:

                return <DataProfile/>
        }

    }

    return (
        <div>

            <div className="boxPerfilUsuario">
                <MenuLateral />
                <div className="datos">
                    {traeDatos()}
                </div>
            </div>


        </div>
    )

}

export default connect((state) => ({
    user: state.credentials.user,
    tipodatos: state.tipodatos
}))(Profile);