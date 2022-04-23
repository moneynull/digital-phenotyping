import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import COLORS from '../../constant/Colors';

// dummy data for Calls usage
const dummyCallsData = {
    series: [{
      name: 'Incoming',
      data: [5,4,6,3,7,8,2]
    },
    {
      name: 'Outgoing',
      data: [5,3,1,8,6,7,2]
    },
    {
      name: 'Missed',
      data: [1,1,1,0,1,2,3]
    }
    ],
    options: {
      chart: {
        type: 'bar',
        height: 440,
        stacked: true
      },
      colors: ['#008FFB', '#FF4560','#775DD0'],
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
        }
      },
      xaxis: {
        categories: ["May 1","May 2","May 3","May 4","May 5","May 6","May 7"],
      },
    },
  };

function CallsUsageChart() {
    const [callsState, setCallsState] = useState({
        options: {},
        series: [],
      });
      useEffect(() => {
        setCallsState(dummyCallsData);
      }, []);

      return(
        <Chart options={callsState.options} series={callsState.series} type='bar' width='500' height='350' />
      )
}

export default CallsUsageChart;