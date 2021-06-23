import React from 'react';
import './Home.css';
import TopRated from '../../components/TopRated/TopRated';
import Popular from '../../components/Popular/Popular';




const Home = () => {

    // let res = await axios.get('http://localhost:3005/movies/');
    // console.log(res.data);
    return (
        <div className="HomeDiv">
           Estoy en Home
           <div className="carrusel1">
               <TopRated/>
               <Popular/>
           </div>
           
        </div>
    );
}
export default Home;