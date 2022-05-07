import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import COLORS from '../../constant/Colors';
import { Log } from '../Logger';

import axios from 'axios';
const dummySMSData = {
  series: [
    {
      name: 'Incoming',
      data: [10, 9, 8, 7, 6],
    },
    {
      name: 'Outgoing',
      data: [1, 2, 3, 4, 5],
    },
  ],
  options: {
    chart: {
      type: 'bar',
      height: 440,
      stacked: true,
    },
    colors: ['#008FFB', '#FF4560'],
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '80%',
      },
    },
    stroke: {
      width: 1,
      colors: ['#fff'],
    },
    dataLabels: {
      enabled: true,
    },

    title: {
      text: 'SMSs Usage',
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
    xaxis: {
      categories: ['May 1', 'May 2', 'May 3', 'May 4', 'May 5'],
    },
  },
};

function SmsUsageChart() {
  const [smsState, setSMSState] = useState({
    options: {},
    series: [],
  });
  const fetchData = () => {
    let curDate = new Date();
    axios
      .post('http://ec2-52-64-190-37.ap-southeast-2.compute.amazonaws.com:80/sms/', {
        uid: '1',
        startDate: '1641029938549',
        endDate: '1641675274282',
      })
      .then((response) => {
        Log('Fetched data..', response.data);
        let res = dummySMSData;

        //response.data[0].splice(3, 1);
        //res.options.xaxis.categories = response.data[0];

        //response.data[1].splice(3, 1);
        //res.series[0].data = response.data[1];
        //setBarState(res);
      });
  };
  useEffect(() => {
    fetchData();
    //@ts-ignore
    setSMSState(dummySMSData);
  }, []);

  return (
    <Chart
      options={smsState.options}
      series={smsState.series}
      type='bar'
      width='600'
      height='400'
    />
  );
}

export default SmsUsageChart;
