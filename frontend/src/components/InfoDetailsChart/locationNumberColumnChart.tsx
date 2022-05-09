import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import COLORS from '../../constant/Colors';

const xaxisCategory = [
  'May 1',
  'May 2',
  'May 3',
  'May 4',
  'May 5',
  'May 6',
  'May 7',
  'May 8',
  'May 9',
  'May 10',
];

const loacationNumberSeries = [
  {
    name: 'times visited',
    data: [0, 2, 3, 5, 1, 2, 4, 2, 7, 1],
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
      text: 'Number of locations visited',
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

function LocationNumberChart() {
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

export default LocationNumberChart;
