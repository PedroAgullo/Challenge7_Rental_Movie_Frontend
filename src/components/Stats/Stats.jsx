
import React, { useEffect, useState } from "react";
import {useHistory} from "react-router";
import './Stats.css';
import axios from "axios";
import { Popconfirm, message, Button } from 'antd';
import { connect } from 'react-redux';
import { GETMOVIE } from '../../redux/types';
import { Column } from '@ant-design/charts';



const Stats = (props) => {

    //hooks
    const [estadisticas, setEstadisticas] = useState([]);  
  
    //Equivalente a componentDidMount en componentes de clase (este se ejecuta solo una vez)
    useEffect(() => {
      cantidad();
    }, []);
  
    //Equivalente a componentDidUpdate en componentes de clase
    useEffect(() => {
    });


  const cantidad = async () => {
    try {
      let token = props.credentials.token;


    let res = await axios.get('http://localhost:3005/movies/all',{headers:{'authorization':'Bearer ' + token}});


    console.log("Datos de las movies",res.data);

    let datos = [];
    console.log(datos.length);
    datos = res.data;
    let num = datos.length;

    console.log("Num del array : ", datos.lenght);

    let numRent = 0;
    let numBuy = 0;
    let premium = 10;

      for(let x=0; x < num; x++){
        numRent = numRent + datos[x].numRent;
        numBuy = numBuy + datos[x].numBuy;
      }

      var data = [
        {
          name: 'Ventas',
          Mes: 'Cantidad',
          Cantidad: numBuy,
        },
        {
          name: 'Alquiler',
          Mes: 'Cantidad',
          Cantidad: numRent,
        },
        {
          name:'Premium',
          Mes: 'Cantidad',
          Cantidad: premium
        },
        {
          name:'Total',
          Mes: 'Cantidad',
          Cantidad: numBuy+numRent+10
        }
      ]
      
      setEstadisticas(data);


    } catch (err) {
      console.log(err)
    }
  }

  const ingresos = async () => {
    try {
      let token = props.credentials.token;


    let res = await axios.get('http://localhost:3005/movies/all',{headers:{'authorization':'Bearer ' + token}});


    console.log("Datos de las movies",res.data);

    let datos = [];
    console.log(datos.length);
    datos = res.data;
    let num = datos.length;

    console.log("Num del array : ", datos.lenght);

    let numRent = 0;
    let numBuy = 0;
    let premium = 10;

      for(let x=0; x < num; x++){
        numRent = numRent + datos[x].numRent;
        numBuy = numBuy + datos[x].numBuy;
      }

      var data = [
        {
          name: 'Ventas',
          Mes: 'Cantidad',
          Cantidad: numBuy,
        },
        {
          name: 'Alquiler',
          Mes: 'Cantidad',
          Cantidad: numRent,
        },
        {
          name:'Premium',
          Mes: 'Cantidad',
          Cantidad: 10
        },
        {
          name:'Total',
          Mes: 'Cantidad',
          Cantidad: 10
        }
      ]
      
      setEstadisticas(data);


    } catch (err) {
      console.log(err)
    }
  }



  var config = {
    data: estadisticas,
    isGroup: true,
    xField: 'Mes',
    yField: 'Cantidad',
    seriesField: 'name',
    label: {
      position: 'middle',
      layout: [
        { type: 'interval-adjust-position' },
        { type: 'interval-hide-overlap' },
        { type: 'adjust-color' },
      ],
    },
  };

  return (
    <div>

      <h1>Estadisticas</h1>
      
      <div className="chart"> 
        <Column {...config} />
      </div>
      <div>
        <button onClick={()=>cantidad()}>Totales</button>        
      </div>
      <div>
        <button onClick={()=>ingresos()}>Ingresos</button>        
      </div>

    </div>
    
    );
};

export default connect((state) => ({
  credentials:state.credentials, 
  orders:state.orders
  }))(Stats);
