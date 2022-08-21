import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import COLORS from '../../constant/Colors';
import { Log } from '../common/Logger';

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
    data: [14, 15, 15, 20, 4, 12, 22, 28, 17, 7],
  },
];

const locationNumberData = {
  series: [] as any[],
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
      categories: [] as any[],
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: 'top', // top, center, bottom
        },
      },
    },
  },
};

function LocationNumberChart(props: any) {
  const [barState, setBarState] = useState({
    options: {},
    series: [],
  });
  const fetchData = () => {
    let curDate = new Date();
    // @ts-ignore
    let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));

    axios
      .post(
        'https://digital-phenotyping.herokuapp.com/locationServer/NumbersOfLocation',
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
        Log('Fetched Location Number data..', response.data);
        let data = response.data;
        let res = locationNumberData;
        let categories = [];
        let series = [
          {
            name: 'times visited',
            data: [] as any[],
          },
        ];
        for (let i = 0; i < data.length; i++) {
          series[0].data.push(data[i][1]);
          categories.push(new Date(data[i][0]).toISOString().slice(0, 10));
        }
        Log('cate', categories);
        res.options.xaxis.categories = categories;

        res.series = series;
        // @ts-ignore
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
      type='bar'
      width='650'
      height='400'
    />
  );
}

export default LocationNumberChart;
