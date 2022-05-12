import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import COLORS from '../../constant/Colors';
import { Log } from '../Logger';
import axios from 'axios';
// dummy data for app time usage
const dummyChartData = {
  options: {
    title: {
      text: 'App Times Used',
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
    fill: {
      colors: [`${COLORS.primary}`],
    },
    chart: {
      id: 'basic-bar',
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
      },
    },
    xaxis: {
      categories: [] as any[],
    },
  },
  series: [
    {
      name: 'Times Used',
      data: [100, 78, 78, 43, 10, 22, 56],
    },
  ],
};

function AppUsageChart() {
  const [barState, setBarState] = useState({
    options: {},
    series: [],
  });
  const fetchData = () => {
    let curDate = new Date();
    axios
      .post('https://digital-phenotyping.herokuapp.com/appForeground/', {
        uid: 1,
        startDate: 1641634738549,
        endDate: 1641901876549,
      })
      .then((response) => {
        Log('Fetched data..', response.data);
        let res = dummyChartData;
        let categories = [];
        let series = [];
        for (let i = 0; i < response.data[0].length; i++) {
          if (response.data[1][i] >= 1) {
            categories.push(response.data[0][i]);
            series.push(response.data[1][i]);
          }
        }

        res.options.xaxis.categories = categories;
        res.series[0].data = series;
        // @ts-ignore
        setBarState(res);
      });
  };
  useEffect(() => {
    Log('App usage chart...');
    fetchData();
    //setBarState(dummyChartData);
  }, []);

  return (
    <Chart
      options={barState.options}
      series={barState.series}
      type='bar'
      width='600'
      height='400'
    />
  );
}

export default AppUsageChart;
