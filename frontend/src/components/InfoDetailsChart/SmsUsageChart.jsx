import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import COLORS from '../../constant/Colors';

const dummySMSData = {
    series: [{
      name: 'Incoming',
      data: [10,9,8,7,6]
    },
    {
      name: 'Outgoing',
      data: [1, 2, 3, 4, 5]
    }
    ],
    options: {
      chart: {
        type: 'bar',
        height: 440,
        stacked: true
      },
      colors: ['#008FFB', '#FF4560'],
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: '80%',
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 1,
        colors: ["#fff"]
      },
      dataLabels: {
        enabled: true
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
        }
      },
      xaxis: {
        categories: ["May 1","May 2","May 3","May 4","May 5"],
      },
    },
  };

function SmsUsageChart() {
    const [smsState, setSMSState] = useState({
        options: {},
        series: [],
      });
      useEffect(() => {
        setSMSState(dummySMSData);
      }, []);

      return(
        <Chart options={smsState.options} series={smsState.series} type='bar' width='500' />
      )
}

export default SmsUsageChart;