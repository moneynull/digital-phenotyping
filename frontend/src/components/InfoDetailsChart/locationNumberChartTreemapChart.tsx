import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import COLORS from '../../constant/Colors';

const locationNumberData = {
          
  series: [
    {
      data: [
        {x: 'Essendon',y: 18},
        {x: 'Carlton',y: 19},
        {x: 'Box hill',y: 14},
        {x: 'Fitzroy',y: 5},
        { x: 'Collingwood',y: 8},
        { x: 'Docklands',y: 3},
        { x: 'Malvern',y: 7},
        { x: 'Burwood',y: 3},
      ]
    }
  ],
  options: {
    legend: {
      show: false
    },
    chart: {
      height: 350,
      type: 'treemap'
    },
    title: {
      text: 'places visted on May 1st',
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
  }



}

function UnlockLocationNumberTreemapChart() {
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
      type='treemap'
      width='650'
      height='400'
    />
  );
}

export default UnlockLocationNumberTreemapChart;
