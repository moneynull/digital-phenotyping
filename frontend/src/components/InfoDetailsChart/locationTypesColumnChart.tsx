import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import COLORS from '../../constant/Colors';

const xaxisCategory = [
  'zoo',
  'pharmacy',
  'university',
  'zoo',
  'gym',
  'bank',
];

const loacationNumberSeries = [
  {
    name: 'times visited',
    data: [2, 5, 1, 4, 3, 2],
  }
];

const locationNumberData = {
  series: loacationNumberSeries,
  options: {
    chart: {
      height: 350,
      type: 'bar',
    },
    colors: ['#008FFB', '#00E396'],

    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
    },


    title: {
      text: 'Place Types Visited',
      align: 'left',
      margin: 10,
      offsetX: 0,
      offsetY: 0,
      floating: false,
      style: {
        fontSize: '14px',
        fontWeight: 'bold',
        color: `${COLORS.text_2}`,
      },
    },
    xaxis: {
      categories: xaxisCategory,
    
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: 'top', // top, center, bottom
        },
      }
    },
  },

};

function LocationTypesColumnChart() {
  const [barState, setBarState] = useState({
    options: {},
    series: [],
  });
  useEffect(() => {
    //@ts-ignore
    setBarState(locationNumberData);
  }, []);

  return (
    <Chart
      options={barState.options}
      series={barState.series}
      type='bar'
      width='650'
      height='400'
    />
  );
}

export default LocationTypesColumnChart;
