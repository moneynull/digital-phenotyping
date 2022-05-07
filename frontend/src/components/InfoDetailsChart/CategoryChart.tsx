import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import COLORS from '../../constant/Colors';

const categories = [
  'Art and Design',
  'Business',
  'Communications',
  'Education',
  'Entertainment',
  'Health and Fitness',
];

const usage = [33, 99, 18, 50, 75, 44];

const colors = ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0', '#00D9E9'];

let dataSeries = [];
for (let i = 0; i < categories.length; i++) {
  let element = {
    x: categories[i],
    y: usage[i],
    color: colors[i],
  };

  dataSeries.push(element);
}

const dummyCategoryData = {
  options: {
    title: {
      text: 'Categories of Apps Usage',
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
      colors: colors,
    },

    chart: {
      id: 'categoryBar',
    },

    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
        distributed: true,
      },
    },

    xaxis: {
      title: {
        text: 'Hours of usage',
        style: {
          fontSize: '13px',
          fontWeight: 200,
          color: `${COLORS.text_2}`,
          cssClass: 'apexcharts-xaxis-label',
        },
      },
    },
  },

  series: [
    {
      name: 'Times Used',
      data: dataSeries,
    },
  ],
};

function CategoryChart() {
  const [barState, setBarState] = useState(dummyCategoryData);
  useEffect(() => {
    //setBarState();
  }, []);

  return (
    <Chart //@ts-ignore
      options={barState.options}
      series={barState.series}
      type='bar'
      width='650'
      height='400'
    />
  );
}

export default CategoryChart;
