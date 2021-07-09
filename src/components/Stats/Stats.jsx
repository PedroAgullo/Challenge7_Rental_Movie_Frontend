
import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from 'react-redux';
import { Column } from '@ant-design/charts';



const Stats = (props) => {

    //hooks
    const [estadisticas, setEstadisticas] = useState([]);  
  
    useEffect(() => {
      cantidad();
    }, []);
  
  const cantidad = async () => {
    try {
      let token = props.credentials.token;

      let res = await axios.post('https://elseptimoartebackend.herokuapp.com/order/all',{headers:{'authorization':'Bearer ' + token}});

    let numRent = 0;
    let numBuy = 0;
    let numPremium = 0;

    res.data.map((act, index) => {
      if(act.type === "Compra"){
        numBuy += 1;
      }else if(act.type === "Alquiler"){
        numRent += 1;
      }else if(act.type === "Premium"){
        numPremium += 1;
      }
    });

      var data = [
        {
          name: 'Ventas',
          Mes: 'Unidades vendidas',
          Cantidad: numBuy,
        },
        {
          name: 'Alquiler',
          Mes: 'Unidades vendidas',                    
          Cantidad: numRent,
        },
        {
          name:'Premium',
          Mes: 'Unidades vendidas',                    
          Cantidad: numPremium
        },
        {
          name:'Total',
          Mes: 'Unidades vendidas',
          Cantidad: numBuy+numRent+numPremium
        }
      ]
      
      setEstadisticas(data);

    } catch (err) {
    }
  }

  const ingresos = async () => {
    try {
      let token = props.credentials.token;

    let res = await axios.post('https://elseptimoartebackend.herokuapp.com/order/all',{headers:{'authorization':'Bearer ' + token}});

    let numRent = 0;
    let numBuy = 0;
    let numPremium = 0;

    res.data.map((act, index) => {
      if(act.type === "Compra"){
        numBuy += act.precio;
      }else if(act.type === "Alquiler"){
        numRent += act.precio;
      }else if(act.type === "Premium"){
        numPremium += act.precio;
      }
    });

      var data = [
        {
          name: 'Ventas',
          Mes: 'Ingresos en €',
          Cantidad: numBuy,
        },
        {
          name: 'Alquiler',
          Mes: 'Ingresos en €',
          Cantidad: numRent,
        },
        {
          name:'Premium',
          Mes: 'Ingresos en €',
          Cantidad: numPremium
        },
        {
          name:'Total',
          Mes: 'Ingresos en €',
          Cantidad: numBuy + numRent + numPremium
        }
      ]
     
      setEstadisticas(data);

    } catch (err) {
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
      <div className="tipoDatos">
        <div className="botonDatos" onClick={(()=>cantidad())}>Ventas</div>
        <div className="botonDatos" onClick={(()=>ingresos())}>Ingresos</div>

      </div>
    </div>
    
    );
};

export default connect((state) => ({
  credentials:state.credentials, 
  orders:state.orders
  }))(Stats);
