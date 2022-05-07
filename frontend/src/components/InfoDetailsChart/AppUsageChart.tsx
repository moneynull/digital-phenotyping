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
      categories: [],
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
      .post('http://ec2-52-64-190-37.ap-southeast-2.compute.amazonaws.com:80/appForeground/', {
        uid: '1',
        startDate: '1641029938549',
        endDate: '1641675274282',
      })
      .then((response) => {
        Log('Fetched data..', response.data);
        let res = dummyChartData;

        response.data[0].splice(3, 1);
        res.options.xaxis.categories = response.data[0];

        response.data[1].splice(3, 1);
        res.series[0].data = response.data[1];
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
