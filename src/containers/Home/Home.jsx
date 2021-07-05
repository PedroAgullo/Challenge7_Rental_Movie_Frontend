import React from 'react';
import TopRated from '../../components/TopRated/TopRated';
import Popular from '../../components/Popular/Popular';
import Novedades from '../../components/Novedades/Novedades';
import Wellcome from '../../components/Wellcome/Wellcome';
import ForYouPlay from '../../components/ForYouPlay/ForYouPlay';
import { connect } from 'react-redux';


const Home = (props) => {


    if (props.credentials?.token !== '') {
        return (
//RETURN PERSONALIZADO CON RECOMENDACIONES POR ULTIMA PELICULA VISTA Y BUSCADA

            <div className="HomeDiv">
                <ForYouPlay/>
                <TopRated/>
                <Popular/>
                <Novedades/>
                <Wellcome/>
        </div>
        
        );
    }else if (props.credentials?.token === ''){
        return(

            <div className="HomeDiv">
                <TopRated/>
                <Popular/>
                <Novedades/>
                <Wellcome/>            
            </div>
        )
    }
}
export default connect((state) => ({
    credentials:state.credentials, 
    }))(Home);
  