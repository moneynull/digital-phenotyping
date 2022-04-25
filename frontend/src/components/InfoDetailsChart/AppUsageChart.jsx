import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import COLORS from '../../constant/Colors';

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
        categories: [
          'Twitter',
          'Google Map',
          'Facebook',
          'ESPN',
          'Domain Real Estate',
          'Champions League Official',
          'ASUS Weather',
        ],
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
    useEffect(() => {
      setBarState(dummyChartData);
    }, []);
    
    return(
        <Chart options={barState.options} series={barState.series} type='bar' width='500' height='350' />
    )
}

export default AppUsageChart;