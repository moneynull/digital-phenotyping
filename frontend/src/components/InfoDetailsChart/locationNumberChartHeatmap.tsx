import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import COLORS from '../../constant/Colors';
import { Log } from '../common/Logger';

const loacationNumberSeries = [];

const locationNumberData = {
  series: [] as any[],
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
      categories: [] as any[],
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

function LocationNumberHeatMapChart(props: any) {
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
        Log('Fetched HeatMap data..', response.data);
        let data = response.data;
        let res = locationNumberData;
        let series = [];
        for (let i = 0; i < data.length; i++) {
          series.push({
            name: new Date(data[i][0]).toISOString().slice(0, 10),
            data: [
              { x: data[0][2][0], y: data[i][3][0] },
              { x: data[0][2][1], y: data[i][3][1] },
              { x: data[0][2][2], y: data[i][3][2] },
              { x: data[0][2][3], y: data[i][3][3] },
            ],
          });
        }
        Log('series', series);
        res.options.xaxis.categories = data[0][2];
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
      type='heatmap'
      width='650'
      height='400'
    />
  );
}

export default LocationNumberHeatMapChart;
