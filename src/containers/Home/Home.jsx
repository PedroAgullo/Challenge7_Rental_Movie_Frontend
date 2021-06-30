import React from 'react';
import TopRated from '../../components/TopRated/TopRated';
import Popular from '../../components/Popular/Popular';
import Recommendations from '../../components/Recommendations/Recommendations';


const Home = () => {

    return (
        <div className="HomeDiv">
           <div className="carrusel1">
               <TopRated/>
               <Popular/>
               <Recommendations/>


           </div>
           
        </div>
    );
}
export default Home;