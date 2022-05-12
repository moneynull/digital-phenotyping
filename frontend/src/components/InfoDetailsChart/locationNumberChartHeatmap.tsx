import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import COLORS from '../../constant/Colors';
import { Log } from '../Logger';

const xaxisCategory = [
  //'Carlton',
  'Essendon',
  'Boxhill',
  'Fitzroy',
  //'Brunswick',
  //'Sunshine',
  'Brooklyn',
  'Total',
  //'Footscray',
];

const loacationNumberSeries = [
  {
    name: 'May 1',
    data: [
      { x: 'Essendon', y: 2 },
      { x: 'Brooklyn', y: 9 },
      { x: 'Fitzroy', y: 1 },
      { x: 'Boxhill', y: 2 },
      { x: 'Total', y: 14 },
    ],
  },

  {
    name: 'May 2',
    data: [
      { x: 'Essendon', y: 4 },
      { x: 'Brooklyn', y: 4 },
      { x: 'Fitzroy', y: 3 },
      { x: 'Boxhill', y: 4 },
      { x: 'Total', y: 15 },
    ],
  },

  {
    name: 'May 3',
    data: [
      { x: 'Essendon', y: 9 },
      { x: 'Brooklyn', y: 2 },
      { x: 'Fitzroy', y: 4 },
      { x: 'Boxhill', y: 0 },
      { x: 'Total', y: 15 },
    ],
  },

  {
    name: 'May 4',
    data: [
      { x: 'Essendon', y: 0 },
      { x: 'Brooklyn', y: 3 },
      { x: 'Fitzroy', y: 9 },
      { x: 'Boxhill', y: 8 },
      { x: 'Total', y: 20 },
    ],
  },

  {
    name: 'May 5',
    data: [
      { x: 'Essendon', y: 1 },
      { x: 'Brooklyn', y: 1 },
      { x: 'Fitzroy', y: 0 },
      { x: 'Boxhill', y: 2 },
      { x: 'Total', y: 4 },
    ],
  },

  {
    name: 'May 6',
    data: [
      { x: 'Essendon', y: 2 },
      { x: 'Brooklyn', y: 7 },
      { x: 'Fitzroy', y: 1 },
      { x: 'Boxhill', y: 2 },
      { x: 'Total', y: 12 },
    ],
  },

  {
    name: 'May 7',
    data: [
      { x: 'Essendon', y: 9 },
      { x: 'Brooklyn', y: 9 },
      { x: 'Fitzroy', y: 3 },
      { x: 'Boxhill', y: 1 },
      { x: 'Total', y: 22 },
    ],
  },

  {
    name: 'May 8',
    data: [
      { x: 'Essendon', y: 9 },
      { x: 'Brooklyn', y: 8 },
      { x: 'Fitzroy', y: 4 },
      { x: 'Boxhill', y: 7 },
      { x: 'Total', y: 28 },
    ],
  },

  {
    name: 'May 9',
    data: [
      { x: 'Essendon', y: 3 },
      { x: 'Brooklyn', y: 3 },
      { x: 'Fitzroy', y: 9 },
      { x: 'Boxhill', y: 2 },
      { x: 'Total', y: 17 },
    ],
  },

  {
    name: 'May 10',
    data: [
      { x: 'Essendon', y: 1 },
      { x: 'Brooklyn', y: 1 },
      { x: 'Fitzroy', y: 0 },
      { x: 'Boxhill', y: 5 },
      { x: 'Total', y: 7 },
    ],
  },
];

const locationNumberData = {
  series: loacationNumberSeries,
  options: {
    chart: {
      height: 350,
      type: 'heatmap',
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '14px',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontWeight: 'bold',
        colors: ['#000000'],
      },
    },
    plotOptions: {
      heatmap: {
        colorScale: {
          inverse: true,
        },
      },
    },
    colors: ['#F3B415', '#F27036', '#008FFB', '#6A6E94'],
    xaxis: {
      type: 'category',
      categories: xaxisCategory,
    },
    title: {
      text: 'locations visited & frequency',
      align: 'center',
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
  },
};

function LocationNumberHeatMapChart() {
  const [barState, setBarState] = useState({
    options: {},
    series: [],
  });
  const fetchData = () => {
    let curDate = new Date();
    axios
      .post('https://digital-phenotyping.herokuapp.com/locationServer/NumbersOfLocation', {
        uid: '1',
        startDate: '1641634738549',
        endDate: '1641901876549',
      })
      .then((response) => {
        Log('Fetched data..', response.data);
        // let res = locationNumberData;
        // let categories = [];
        // let series = [];
        // for (let i = 0; i < response.data[0].length; i++) {
        //   if (response.data[1][i] >= 1) {
        //     categories.push(response.data[0][i]);
        //     series.push(response.data[1][i]);
        //   }
        // }

        // res.options.xaxis.categories = categories;
        // res.series[0].data = series;
        // @ts-ignore
        // setBarState(res);
      });
  };
  useEffect(() => {
    //@ts-ignore
    setBarState(locationNumberData);
    fetchData();
  }, []);

  return (
    <Chart
      options={barState.options}
      series={barState.series}
      type='heatmap'
      width='650'
      height='400'
    />
  );
}

export default LocationNumberHeatMapChart;
