
import React, { useState, useEffect } from "react";
import {connect} from 'react-redux';
import axios from 'axios';
import { GETMOVIE, TRAILER } from '../../redux/types';
import {useHistory} from "react-router";
import InfiniteScroll from "react-infinite-scroll-component";

const Search = (props) => {

    let history = useHistory();

    const [dataMovies, setDataMovies] = useState([]); 
    const [numPages, setNumPages] = useState(1); 
    const [genre, setGenre] = useState("all");
    
    //Guarda la movie en redux y nos lleva a la vista de película.
    const selectMovie = async (movie) => {
        let body = {
            id: movie.id
          } 

        try{      
            let res2 = await axios.post('http://localhost:3005/movies/video',body);
            let res = await axios.post('http://localhost:3005/movies/id', body); 

            props.dispatch({type:TRAILER,payload:res2.data});
            props.dispatch({type:GETMOVIE,payload: res.data});
            history.push('/movie');
      }catch (err){
           console.log(err);      
           }            
    }


    const addPages = async (num) => {
        num = num + 1;
        console.log("addPages, el numero vale : ", num);
        await setNumPages(num);
        return;
    }
    

    //Busca la película con cada tecla que pulsamos
    const searchMovie = async (opc) => {
        let moviesVacio = [];
        await setGenre(opc);
        await setNumPages(1);
        await setDataMovies(moviesVacio);
        let dataSearch = document.getElementById("movieName").value;        
        let body={
          title : dataSearch,
          actor : dataSearch,
          genre : opc,
          num : numPages 
        }

        switch(opc){          
            
            case "all":
                
                try {
                    let res = await axios.post('http://localhost:3005/movies/title',body);
                    await addPages(numPages);
                    await setDataMovies(dataMovies.concat(res.data.results));
                } catch (error) {            
                }        
                return;

                case "topRated":
                
                    try {
                        let res = await axios.get('http://localhost:3005/movies/');
                        await addPages(numPages);
                        await setDataMovies(dataMovies.concat(res.data.results));
                    } catch (error) {            
                    }        
                    return;

                case "novedades":
                
                    try {
                        let res = await axios.get('http://localhost:3005/movies/soon');     
                        await addPages(numPages);
                        await setDataMovies(dataMovies.concat(res.data.results));
                    } catch (error) {            
                    }        
                    return;

                case "popular":
            
                    try {
                        let res = await axios.get('http://localhost:3005/movies/popular');
                        await addPages(numPages);
                        await setDataMovies(dataMovies.concat(res.data.results));
                    } catch (error) {            
                    }        
                    return;                

            default:
                  try {
                      let res2 = await axios.post('http://localhost:3005/movies/genre',body);
                      addPages(numPages);
                      setDataMovies(res2.data.results);
                  } catch (error) {
              
                  }
                return;
        }
    }

    const nextSearch = async (opc) => {
        let dataSearch = document.getElementById("movieName").value;        
        let body={
          title : dataSearch,
          actor : dataSearch,
          genre : opc,
          num : numPages 
        }

        switch(opc){           
            
            case "all":
                
                try {
                    console.log("Body del nextSearch opcion All: ", body);
                    let res = await axios.post('http://localhost:3005/movies/title',body);
                    console.log(res.data.results);   
                    console.log("El numPages vale: ", numPages);
                    addPages(numPages);

                    console.log(dataMovies);
                    setDataMovies(dataMovies.concat(res.data.results));
                } catch (error) {            
                }        
                return;

                case "topRated":
                
                    try {
                        let res = await axios.get('http://localhost:3005/movies/', body);
                        console.log(res.data.results);   
                        console.log("El numPages vale: ", numPages);
                        addPages(numPages);
    
                        setDataMovies(dataMovies.concat(res.data.results));
                    } catch (error) {            
                    }        
                    return;            
                    
                case "novedades":
                
                    try {
                        console.log("Body del nextSearch opcion All: ", body);
                        let res = await axios.get('http://localhost:3005/movies/soon',body);     
                        console.log(res.data.results);   
                        console.log("El numPages vale: ", numPages);
                        addPages(numPages);
    
                        console.log(dataMovies);
                        setDataMovies(dataMovies.concat(res.data.results));
                    } catch (error) {            
                    }        
                    return;            
                    
                case "popular":
                
                    try {
                        console.log("Body del nextSearch opcion All: ", body);
                        let res = await axios.get('http://localhost:3005/movies/popular',body);
                        console.log(res.data.results);   
                        console.log("El numPages vale: ", numPages);
                        addPages(numPages);
    
                        console.log(dataMovies);
                        setDataMovies(dataMovies.concat(res.data.results));
                    } catch (error) {            
                    }        
                    return;            

            default:

                  try {
                      console.log("Entro en genre", body);
                      let res2 = await axios.post('http://localhost:3005/movies/genre',body);
                      console.log("El numPages vale: ", numPages);

                      console.log(res2.data.results);
                      addPages(numPages);

                      setDataMovies(dataMovies.concat(res2.data.results));
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
                <h3>Buscar por:</h3><select id="opcion" onChange={()=>searchMovie(document.getElementById("opcion").value)} className="inputSearch" type="select" name="subscription" required="true" placeholder="Abono"  lenght='30'>
                            <option value="all">Todas las peliculas</option>
                            <option value="topRated">Mejor valoradas</option>
                            <option value="novedades">Novedades</option>
                            <option value="popular">Populares</option>                            
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
            <input type="text" id="movieName" onChange={()=>searchMovie("all")}/>
                        
            </div>            

            <div className="dataMovies">
                <InfiniteScroll dataLength={dataMovies.length} next={()=>nextSearch(genre)} hasMore={true} loader={<div></div>}>
                <div className="boxCardSearch">
                  {dataMovies?.map((act, index) => (
                    <div className="cardSearch" onClick={()=> selectMovie(act)} key={index}>
                    <img src={`${baseImgUrl}/${size}${act.poster_path}`}  alt={act.title} className="posterSearch"/>
                    </div>
                    ))}
                </div>
                </InfiniteScroll>

            </div>
            <div id="visor"></div>
        </div>
    );

}

export default connect((state) => ({
    user: state.credentials.user,
    tipodatos: state.tipodatos,
    trailer:state.trailer
}))(Search);