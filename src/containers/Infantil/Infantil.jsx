
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import { connect } from 'react-redux';
import { GETMOVIE, TRAILER } from '../../redux/types';
import {useHistory} from "react-router";

const Infantil = (props) => {
  
  let history = useHistory();

    //hooks
    const [dataMovies, setDataMovies] = useState([]); 
    const [numPages, setNumPages] = useState(1); 

    //Equivalente a componentDidMount en componentes de clase (este se ejecuta solo una vez)
    useEffect(() => {
      findFamiliar();
    }, []);
  
    //Guarda la movie en redux y nos lleva a la vista de película.
    const selectMovie = async (movie) => {

      let body = {
        id: movie.id
      } 

      try{
        let res2 = await axios.post('http://localhost:3005/movies/video',body); 
        await props.dispatch({type:TRAILER,payload:res2.data});
        props.dispatch({type:GETMOVIE,payload: movie});
        history.push('/play');
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

    const findFamiliar = async () => {  
      setNumPages(1);
      setDataMovies([]);
      let body={
          genre : "10751",
          num : numPages  
        }     

    try{
        console.log("Entro en findFamiliar");
        let res = await axios.post('http://localhost:3005/movies/genre',body);  
        await addPages(numPages);
   
        await setDataMovies(dataMovies.concat(res.data.results));
      }catch (err){      
    }  
  }

  const nextSearch = async () => {
    console.log("estoy en NextSearch");
    let body={
      genre : "10751",
      num : numPages  
    }      

    console.log("Hola", dataMovies);
    let res = await axios.post('http://localhost:3005/movies/genre',body);   
    await addPages(numPages);  
    await setDataMovies(dataMovies.concat(res.data.results));
  }

  const baseImgUrl = "https://image.tmdb.org/t/p"
  const size = "w780"

    if (dataMovies[0]?.id) {

      return (
        <div className="infantilBoxMovies">
          <InfiniteScroll dataLength={dataMovies.length} next={()=>nextSearch()} hasMore={true} loader={<h4>Loading...</h4>}>
            <div className="infantilBoxCard">
              {dataMovies.map((act, index) => (
                <div className="infantilCard" onClick={()=> selectMovie(act)} key={index}>
                  <img src={`${baseImgUrl}/${size}${act.poster_path}`}  alt="poster" className="posterInfantil"/>
                </div>
                   ))}
            </div>
            </InfiniteScroll>
            <div id="visor"></div>

        </div>  
      );
    } else {
      return <div>
          PELÍCULAS PARA LOS MÁS PEQUES DE LA CASA - CARGANDO DATOS</div>;
    }
};

export default connect((state) => ({
  credentials:state.credentials, 
  getroomusers:state.getroomusers,
  trailer:state.trailer
  }))(Infantil);
