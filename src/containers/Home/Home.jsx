import React from 'react';
import TopRated from '../../components/TopRated/TopRated';
import Popular from '../../components/Popular/Popular';
import Novedades from '../../components/Novedades/Novedades';


const Home = () => {

    return (
        <div className="HomeDiv">
           <div>
               <TopRated/>
               <Popular/>
               <Novedades/>
           </div>           
        </div>
    );
}
export default Home;