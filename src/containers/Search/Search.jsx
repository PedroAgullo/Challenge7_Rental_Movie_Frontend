
import React, { useEffect, useState } from "react";
import './Search.css';
import {connect} from 'react-redux';
import axios from 'axios';
import { GETMOVIE } from '../../redux/types';
import {useHistory} from "react-router";
import {notification, message} from 'antd';
import 'antd/dist/antd.css'

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
    const searchMovie = async (opc) => {

        let dataSearch = document.getElementById("movieName").value;        
        let body={
          title : dataSearch,
          actor : dataSearch,
          genre : opc 
        }

        switch(opc){           
            
            case "all":
                
                try {
                    let res = await axios.post('http://localhost:3005/movies/title',body);
                    console.log(res.data.results);
                    setDataMovies(res.data.results);
                } catch (error) {
            
                }
        
                return;

            default:

                  try {
                      console.log("Entro en genre");
                      let res2 = await axios.post('http://localhost:3005/movies/genre',body);
                      console.log(res2.data.results);
                      setDataMovies(res2.data.results);
                  } catch (error) {
              
                  }
                return;
        }
    }


    const baseImgUrl = "https://image.tmdb.org/t/p"
    const size = "w500"


    return (
        <div className="SearchDiv">
            <div className="searchBar">
                <input type="text" id="movieName" onChange={()=>searchMovie("all")}/>
                Buscar por :<select id="opcion" onChange={()=>searchMovie(document.getElementById("opcion").value)} className="inputBase" type="select" name="subscription" required="true" placeholder="Abono"  lenght='30'>
                            <option value="EMAIL">Todas las peliculas</option>
                            <option value="28">Acción</option>
                            <option value="12">Aventura</option>
                            <option value="16">Animacion</option>
                            <option value="35">Comedia</option>
                            <option value="80">Crimen</option>
                            <option value="99">Documental</option>
                            <option value="18">Drama</option>
                            <option value="10751">Familiar</option>
                            <option value="14">Fantasia</option>
                            <option value="36">Historia</option>
                            <option value="27">Horror</option>
                            <option value="10402">Musical</option>
                            <option value="9648">Misterio</option>
                            <option value="10749">Romance</option>
                            <option value="878">Ciencia ficción</option>
                            <option value="10770">TV Movie</option>
                            <option value="53">Thriller</option>
                            <option value="10752">Guerra</option>
                            <option value="37">Western</option>                            
                        </select>  
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