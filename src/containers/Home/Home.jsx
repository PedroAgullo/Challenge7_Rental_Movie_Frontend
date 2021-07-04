import React from 'react';
import TopRated from '../../components/TopRated/TopRated';
import Popular from '../../components/Popular/Popular';
import Novedades from '../../components/Novedades/Novedades';
import Wellcome from '../../components/Wellcome/Wellcome';


const Home = () => {

    return (
        <div className="HomeDiv">
                <TopRated/>
                <Popular/>
                <Novedades/>
                <Wellcome/>
        </div>
    );
}
export default Home;