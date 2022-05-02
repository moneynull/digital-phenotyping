import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import COLORS from '../../constant/Colors';

// TODO!!!!   apply backend api
// auto generated fake data for a year
const xaxisCategory = [
  '2022/5/1',
  '2022/5/2',
  '2022/5/3',
  '2022/5/4',
  '2022/5/5',
  '2022/5/6',
  '2022/5/7',
  '2022/5/8',
  '2022/5/9',
  '2022/5/10'
]

const durationSeries = [
  {
    name: 'device id: 123',
    data: [30, 155, 18, 217, 166, 248, 159, 131, 7, 188]
  },
  {
    name: 'device id: 666',
    data: [187, 256, 3, 76, 199, 55, 185, 111, 48, 92]
  }
]

const durationData = {
    data: {},
    series: durationSeries,
    options: {
      colors: [COLORS.primary, "#FEB019", "#775DD0"],

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
        width: 2,
        curve: 'smooth'
      },

      grid: {
        xaxis: {
          lines: {
            show: true
          }
        }
      },

      tooltip: {
          enabled: true,
          x: {
              show: true
          }
      },

      xaxis: {
        categories: xaxisCategory
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
        <Chart options={barState.options} series={barState.series} type='line' width='650' height='400' />
    )
}

export default UnlockDurationChart;