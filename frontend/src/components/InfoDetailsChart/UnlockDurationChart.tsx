import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import COLORS from '../../constant/Colors';
import { Log } from '../common/Logger';

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
  '2022/5/10',
];

const durationSeries = [
  {
    name: 'device id: 123',
    data: [30, 155, 18, 217, 166, 248, 159, 131, 7, 188],
  },
];

const durationData = {
  data: {},
  series: durationSeries,
  options: {
    colors: [COLORS.primary, '#FEB019', '#775DD0'],

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
      },
    },

    plotOptions: {
      heatmap: {
        radius: 3,
        distributed: true,
      },
    },

    dataLabels: {
      enabled: false,
    },

    stroke: {
      width: 2,
      curve: 'smooth',
    },

    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
    },

    tooltip: {
      enabled: true,
      x: {
        show: true,
      },
    },

    xaxis: {
      categories: xaxisCategory,
    },
  },
};

function UnlockDurationChart(props: any) {
  const [barState, setBarState] = useState({
    options: {},
    series: [],
  });
  const fetchData = () => {
    let curDate = new Date();
    Log('ScreenUnlocked fetch');
    // @ts-ignore
    let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));

    axios
      .post(
        'https://digital-phenotyping.herokuapp.com/screenServer/ScreenUnlocked',
        {
          uid: props.uid,
          endDate: 1642299999549,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo!.access}`,
          },
        }
      )
      .then((response) => {
        Log('Fetched ScreenUnlocked data..', response.data);
        let res = durationData;
        let data = response.data;
        let categories = [];
        let series = [
          {
            name: 'times unlocked',
            data: [] as any[],
          },
        ];
        for (let i = 0; i < data[0].length; i++) {
          series[0].data.push(data[2][i]);
          categories.push(new Date(data[0][i]).toISOString().slice(0, 10));
        }
        Log('cate', categories);
        res.options.xaxis.categories = categories;
        res.series = series;
        //response.data[0].splice(3, 1);
        Log(data);
        //@ts-ignore
        setBarState(res);
      });
  };
  useEffect(() => {
    fetchData();
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

export default UnlockDurationChart;
