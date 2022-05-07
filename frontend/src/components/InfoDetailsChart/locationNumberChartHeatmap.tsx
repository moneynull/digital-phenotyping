import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import COLORS from '../../constant/Colors';

const xaxisCategory = [
  //'Carlton',
  'Essendon',
  'Boxhill',
  'Fitzroy',
  //'Brunswick',
  //'Sunshine',
  'Brooklyn',
  //'Footscray',
];

const loacationNumberSeries = [
  {
  name: "May 1",
  data: [{x: 'Essendon',y: 2}, {x: 'Brooklyn',y: 9}, {x: 'Fitzroy',y: 1}, {x: 'Boxhill',y: 2}]
  },

  {name: "May 2",
  data: [{x: 'Essendon',y: 4}, {x: 'Brooklyn',y: 4}, {x: 'Fitzroy',y: 3}, {x: 'Boxhill',y: 4}]
  },

  {name: "May 3",
  data: [{x: 'Essendon',y: 9}, {x: 'Brooklyn',y: 2}, {x: 'Fitzroy',y: 4}, {x: 'Boxhill',y: 0}]
  },

  {name: "May 4",
  data: [{x: 'Essendon',y: 0}, {x: 'Brooklyn',y: 3}, {x: 'Fitzroy',y: 9}, {x: 'Boxhill',y: 8}]
  },

  {name: "May 5",
  data: [{x: 'Essendon',y: 1}, {x: 'Brooklyn',y: 1}, {x: 'Fitzroy',y: 0}, {x: 'Boxhill',y: 2}]
  },

  {name: "May 6",
    data: [{x: 'Essendon',y: 2}, {x: 'Brooklyn',y: 7}, {x: 'Fitzroy',y: 1}, {x: 'Boxhill',y: 2}]
    },
  
    {name: "May 7",
    data: [{x: 'Essendon',y: 9}, {x: 'Brooklyn',y: 9}, {x: 'Fitzroy',y: 3}, {x: 'Boxhill',y: 1}]
    },
  
    {name: "May 8",
    data: [{x: 'Essendon',y: 9}, {x: 'Brooklyn',y: 8}, {x: 'Fitzroy',y: 4}, {x: 'Boxhill',y: 7}]
    },
  
    {name: "May 9",
    data: [{x: 'Essendon',y: 3}, {x: 'Brooklyn',y: 3}, {x: 'Fitzroy',y: 9}, {x: 'Boxhill',y: 2}]
    },
  
    {name: "May 10",
    data: [{x: 'Essendon',y: 1}, {x: 'Brooklyn',y: 1}, {x: 'Fitzroy',y: 0}, {x: 'Boxhill',y: 5}]
    }

];

const locationNumberData = {
          
  series: loacationNumberSeries,
  options: {
    chart: {
      height: 350,
      type: 'heatmap'
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '14px',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontWeight: 'bold',
        colors: ['#000000']
      },
    },
    plotOptions: {
      heatmap: {
        colorScale: {
          inverse: true
        }
      }
    },
    colors: ["#F3B415", "#F27036", "#008FFB", "#6A6E94"],
    xaxis: {
      type: 'category',
      categories: xaxisCategory
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

function UnlockLocationNumberChart() {
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
      type='heatmap'
      width='650'
      height='400'
    />
  );
}

export default UnlockLocationNumberChart;
