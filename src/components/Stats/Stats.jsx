
import React, { useEffect, useState } from "react";
import {useHistory} from "react-router";
import './Stats.css';
import axios from "axios";
import { Popconfirm, message, Button } from 'antd';
import { connect } from 'react-redux';
import { GETMOVIE } from '../../redux/types';
import { Column } from '@ant-design/charts';



const DemoColumn = (data) => {




  const total = async () => {




  }






  var data = [
    {
      name: 'Ventas',
      Mes: 'Jan.',
      Cantidad: 18.9,
    },
    {
      name: 'Ventas',
      Mes: 'Feb.',
      Cantidad: 28.8,
    },
    {
      name: 'Ventas',
      Mes: 'Mar.',
      Cantidad: 39.3,
    },
    {
      name: 'Ventas',
      Mes: 'Apr.',
      Cantidad: 81.4,
    },
    {
      name: 'Ventas',
      Mes: 'May',
      Cantidad: 47,
    },
    {
      name: 'Ventas',
      Mes: 'Jun.',
      Cantidad: 20.3,
    },
    {
      name: 'Ventas',
      Mes: 'Jul.',
      Cantidad: 24,
    },
    {
      name: 'Ventas',
      Mes: 'Aug.',
      Cantidad: 35.6,
    },
    {
      name: 'Alquiler',
      Mes: 'Jan.',
      Cantidad: 12.4,
    },
    {
      name: 'Alquiler',
      Mes: 'Feb.',
      Cantidad: 23.2,
    },
    {
      name: 'Alquiler',
      Mes: 'Mar.',
      Cantidad: 34.5,
    },
    {
      name: 'Alquiler',
      Mes: 'Apr.',
      Cantidad: 99.7,
    },
    {
      name: 'Alquiler',
      Mes: 'May',
      Cantidad: 52.6,
    },
    {
      name: 'Alquiler',
      Mes: 'Jun.',
      Cantidad: 35.5,
    },
    {
      name: 'Alquiler',
      Mes: 'Jul.',
      Cantidad: 37.4,
    },
    {
      name: 'Alquiler',
      Mes: 'Aug.',
      Cantidad: 42.4,
    },
    {
      name: 'Premium',
      Mes: 'Jan.',
      Cantidad: 12.4,
    },
    {
      name: 'Premium',
      Mes: 'Feb.',
      Cantidad: 23.2,
    },
    {
      name: 'Premium',
      Mes: 'Mar.',
      Cantidad: 34.5,
    },
    {
      name: 'Premium',
      Mes: 'Apr.',
      Cantidad: 99.7,
    },
    {
      name: 'Premium',
      Mes: 'May',
      Cantidad: 52.6,
    },
    {
      name: 'Premium',
      Mes: 'Jun.',
      Cantidad: 35.5,
    },
    {
      name: 'Premium',
      Mes: 'Jul.',
      Cantidad: 37.4,
    },
    {
      name: 'Premium',
      Mes: 'Aug.',
      Cantidad: 42.4,
    },
  ];

  var config = {
    data: data,
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
        <button onClick={()=>total()}>Totales</button>
        
        
      </div>

    </div>
    
    );
};

export default DemoColumn;