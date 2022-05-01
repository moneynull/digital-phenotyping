import { duration } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import COLORS from '../../constant/Colors';

// function that auto generate some random number
function generateData(){
    let arr = [];
    for(let i=0; i<32; ++i){
      arr.push({x: i, y: Math.floor((Math.random() * 12 * 60) + 1)});
    }
    return arr;
}

// TODO!!!!   apply backend api
// auto generated fake data for a year
const durationSeries = [{
    name: 'January',
    data: generateData()
    },
    {
      name: 'February',
      data: generateData()
    },
    {
      name: 'March',
      data: generateData()
    },
    {
      name: 'April',
      data: generateData()
    },
    {
      name: 'May',
      data: generateData()
    },
    {
      name: 'June',
      data: generateData()
    },
    {
      name: 'July',
      data: generateData() 
    },
    {
      name: 'August',
      data: generateData() 
    },
    {
      name: 'September',
      data: generateData() 
    },
    {
      name: 'October',
      data: generateData() 
    },
    {
      name: 'November',
      data: generateData() 
    },
    {
      name: 'December',
      data: generateData() 
    }
]

const durationData = {
    data: {},
    series: durationSeries,
    options: {
      colors: [COLORS.primary],

      plotOptions: {
        heatmap: {
          radius: 3,
          distributed: true,
        }
      },

      dataLabels: {
        enabled: false
      },

      stroke: {
        width: 2
      },

      title: {
        text: 'Screen Unlocked Duration (in minutes)',
        align: 'center',
        margin: 10,
        offsetX: 0,
        offsetY: 0,
        floating: false,
        style: {
          fontSize: '14px',
          fontWeight: 'bold',
          color: `${COLORS.text_2}`,
        }
      },

      tooltip: {
          enabled: true,
          x: {
              show: true
          }
      },

      xaxis: {
          type: 'numberic',
          min: 0,
          max: 31
      }
    },


  };

function UnlockDurationChart() {
    const [barState, setBarState] = useState({
      options: {},
      series: [],
    });
    useEffect(() => {
      setBarState(durationData);
    }, []);
    
    return(
        <Chart options={barState.options} series={barState.series} type='heatmap' width='650' height='400' />
    )
}

export default UnlockDurationChart;