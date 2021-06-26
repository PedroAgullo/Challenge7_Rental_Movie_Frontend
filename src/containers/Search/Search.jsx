
import React, { useEffect, useState } from "react";
import './Search.css';
import {connect} from 'react-redux';
import axios from 'axios';
import { GETMOVIE } from '../../redux/types';
import {useHistory} from "react-router";


const Search = (props) => {

    let history = useHistory();

    const [dataMovies, setDataMovies] = useState([]); 


    //Guarda la movie en redux y nos lleva a la vista de película.
    const selectMovie = async (movie) => {
        try{      
          props.dispatch({type:GETMOVIE,payload: movie});
          history.push('/movie');
      }catch (err){
           console.log(err);      
           }            
    }

    //Busca la película con cada tecla que pulsamos
    const searchMovie = async () => {

        let dataSearch = document.getElementById("movieName").value;        
        let body={
          title : dataSearch,
          actor : dataSearch
        }
        try {
            let res = await axios.post('http://localhost:3005/movies/title',body);
            console.log(res.data.results);
            setDataMovies(res.data.results);
        } catch (error) {
    
        }
    }


    const baseImgUrl = "https://image.tmdb.org/t/p"
    const size = "w500"


    return (
        <div className="SearchDiv">
            <div className="searchBar">
                <input type="text" id="movieName"onChange={()=>searchMovie()}/>
            </div>

            <div className="dataMovies">
            <div className="boxCardSearch">
              {dataMovies?.map((act, index) => (
                <div className="card" onClick={()=> selectMovie(act)} key={index}>
                    <img src={`${baseImgUrl}/${size}${act.poster_path}`}  alt="poster" className="poster"/>
                  {/* <p className="datosCard">Fin: {moment(act.dateEnd).format('LLL')}</p>
                  <p className="datosCard">Entrenador: {act.nameCoach}</p>
                  <p className="datosCard">Capacidad: {act.members.length}/{act.maxMember}</p> */}
                </div>
                   ))}
            </div>
            </div>
        </div>
    );
}

export default connect((state) => ({
    user: state.credentials.user,
    tipodatos: state.tipodatos
}))(Search);