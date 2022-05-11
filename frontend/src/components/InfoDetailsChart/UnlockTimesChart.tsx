import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import COLORS from '../../constant/Colors';

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

const loacationNumberSeries = [
  {
    name: 'Times Unlocked',
    data: [82, 75, 86, 90, 81, 97, 85, 66, 81, 96],
  },
];

const locationNumberData = {
  series: loacationNumberSeries,
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
      text: 'Times Unlocked',
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

function UnlockTimesChart() {
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
      type='bar'
      width='650'
      height='400'
    />
  );
}

export default UnlockTimesChart;
