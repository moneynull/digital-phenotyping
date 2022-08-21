import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import COLORS from '../../constant/Colors';
import { Log } from '../common/Logger';

// dummy data for Calls usage
const dummyCallsData = {
  series: [] as any[],
  options: {
    chart: {
      type: 'bar',
      height: 440,
      stacked: true,
    },
    colors: ['#008FFB', '#FF4560', '#775DD0'],
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
      text: 'Calls Usage',
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
      categories: [] as any[],
    },
  },
};

function CallsUsageChart(props: any) {
  const [callsState, setCallsState] = useState({
    options: {},
    series: [],
  });
  const fetchData = () => {
    let curDate = new Date();
    // @ts-ignore
    let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));

    axios
      .post(
        'https://digital-phenotyping.herokuapp.com/dataServer/calls',
        {
          uid: props.uid,
          startDate: 1641634738549,
          endDate: 1642309999999,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo!.access}`,
          },
        }
      )
      .then((response) => {
        console.log('Fetched data..', response.data.data);
        let res = dummyCallsData;
        let data = response.data.data;
        let series = [
          {
            name: 'Incoming',
            data: data[0],
          },
          {
            name: 'Outgoing',
            data: data[1],
          },
          {
            name: 'Missed',
            data: data[2],
          },
        ];
        for (let i = 0; i < data[0].length; i++) {
          data[3][i] = data[3][i].slice(0, 10);
        }
        res.options.xaxis.categories = data[3];
        res.series = series;
        // @ts-ignore
        setCallsState(res);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Chart
      options={callsState.options}
      series={callsState.series}
      type='bar'
      width='650'
      height='400'
    />
  );
}

export default CallsUsageChart;
