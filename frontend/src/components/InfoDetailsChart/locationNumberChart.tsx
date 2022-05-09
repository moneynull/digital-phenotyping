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
    name: 'device: phone',
    data: [0, 2, 3, 5, 1, 2, 4, 2, 7, 1],
  },
  {
    name: 'device: laptop',
    data: [7, 5, 0, 1, 4, 3, 4, 9, 2, 3],
  },
];

const locationNumberData = {
  series: loacationNumberSeries,
  options: {
    chart: {
      id: 'fb',
      group: 'social',
      type: 'line',
      height: 160
    },
    colors: ['#008FFB', '#00E396'],

    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
    },

    dataLabels: {
      enabled: true,
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
      type='line'
      width='650'
      height='400'
    />
  );
}

export default LocationNumberChart;
