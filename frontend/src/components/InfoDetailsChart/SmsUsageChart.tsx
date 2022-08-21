import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import COLORS from '../../constant/Colors';
import { Log } from '../common/Logger';

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

function SmsUsageChart(props: any) {
  const [smsState, setSMSState] = useState({
    options: {},
    series: [],
  });
  const fetchData = () => {
    let curDate = new Date();
    // @ts-ignore
    let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));

    Log('SMS fetch');
    axios
      .post(
        'https://digital-phenotyping.herokuapp.com/sms/',
        {
          uid: props.uid,
          startDate: 1641634738549,
          endDate: 1642209999999,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo!.access}`,
          },
        }
      )
      .then((response) => {
        Log('Fetched SMS data..', response.data);
        let res = dummySMSData;
        let data = response.data;
        //response.data[0].splice(3, 1);
        res.options.xaxis.categories = data[2];
        let series = [
          {
            name: 'Incoming',
            data: data[0],
          },
          {
            name: 'Outgoing',
            data: data[1],
          },
        ];

        res.series = series;
        // @ts-ignore
        setSMSState(res);
      });
  };
  useEffect(() => {
    fetchData();
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
