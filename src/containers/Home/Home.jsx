import React from 'react';
// import './Home.css';
import TopRated from '../../components/TopRated/TopRated';
import Popular from '../../components/Popular/Popular';
import Recommendations from '../../components/Recommendations/Recommendations';



const Home = () => {

    // let res = await axios.get('http://localhost:3005/movies/');
    // console.log(res.data);
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