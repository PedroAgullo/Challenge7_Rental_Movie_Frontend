import React from 'react';
import './Home.css';
import TopRated from '../../components/TopRated/TopRated';
import Latest from '../../components/Latest/Latest';




const Home = () => {

    // let res = await axios.get('http://localhost:3005/movies/');
    // console.log(res.data);
    return (
        <div className="HomeDiv">
           Estoy en Home
           <div className="carrusel1">
               <TopRated/>
               <Latest/>
           </div>
           
        </div>
    );
}
export default Home;