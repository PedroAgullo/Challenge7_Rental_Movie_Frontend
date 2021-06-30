import React from 'react';
import TopRated from '../../components/TopRated/TopRated';
import Popular from '../../components/Popular/Popular';
import Recommendations from '../../components/Recommendations/Recommendations';
import Novedades from '../../components/Novedades/Novedades';


const Home = () => {

    return (
        <div className="HomeDiv">
           <div>
               <TopRated/>
               <Popular/>
               <Recommendations/>
               <Novedades/>
           </div>           
        </div>
    );
}
export default Home;