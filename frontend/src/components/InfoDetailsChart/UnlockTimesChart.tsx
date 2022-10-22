import axios from 'axios';
import { BASE_URL } from '../../constant/Endpoint';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import COLORS from '../../constant/Colors';
import DateRangeSelector from '../common/DateRangeSelector';
import { Log } from '../common/Logger';
import ChartContainer from '../common/ChartContainer';
import ChartDataWrapper from '../common/ChartDataWrapper';

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

const screenDummayData = {
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

function UnlockTimesChart(props: ChartProps) {
  const [options, setOptions] = useState({});
  const [series, setSeries] = useState([]);

  const [startDateVal, setStartDateVal] = useState(1641634738549);
  const [endDateVal, setEndDateVal] = useState(1641901876549);

  const fetchData = () => {
    let curDate = new Date();
    Log('ScreenUnlocked fetch');
    // @ts-ignore
    let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));

    axios
      .post(
        BASE_URL + '/screenServer/ScreenUnlocked',
        {
          uid: props.uid,
          startDate: startDateVal,
          endDate: endDateVal,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo!.access}`,
          },
        }
      )
      .then((response) => {
        Log('Fetched ScreenUnlocked data..', response.data);
        let res = screenDummayData;
        let data = response.data;
        let categories: string[] = [];
        let newSeries = [
          {
            name: 'times unlocked',
            data: [] as number[],
          },
        ];
        for (let i = 0; i < data[0].length; i++) {
          newSeries[0].data.push(data[1][i]);
          categories.push(new Date(data[0][i]).toISOString().slice(0, 10));
        }
        Log('cate', categories);
        res.options.xaxis.categories = categories;
        res.series = newSeries;
        //response.data[0].splice(3, 1);
        Log(data);
        setOptions((pre) => ({
          ...pre,
          ...screenDummayData.options,
          xaxis: {
            //@ts-ignore
            ...pre.xaxis,
            categories: categories,
          },
        }));
        //@ts-ignore
        setSeries([...newSeries]);
      });
  };
  useEffect(() => {
    fetchData();
  }, [startDateVal]);

  return (
    <ChartContainer>
      <ChartDataWrapper>
        <DateRangeSelector setStartDate={setStartDateVal} setEndDate={setEndDateVal} />
      </ChartDataWrapper>

      <Chart options={options} series={series} type='bar' width='650' height='400' />
    </ChartContainer>
  );
}

export default UnlockTimesChart;
