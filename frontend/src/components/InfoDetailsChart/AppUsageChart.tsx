import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';
import COLORS from '../../constant/Colors';
import { Log } from '../common/Logger';
import { BASE_URL } from '../../constant/Endpoint';
import DateRangeSelector from '../common/DateRangeSelector';
import ChartContainer from '../common/ChartContainer';
import ChartDataWrapper from '../common/ChartDataWrapper';
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
    chart: {
      width: 380,
      type: 'pie',
    },
    labels: [] as string[],
  },
  series: [] as number[],
};

function AppUsageChart(props: ChartProps) {
  const [options, setOptions] = useState({});
  const [series, setSeries] = useState([]);
  const [startDateVal, setStartDateVal] = useState(1641634738549);
  const [endDateVal, setEndDateVal] = useState(1641901876549);

  const fetchData = () => {
    // @ts-ignore
    let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    console.log(startDateVal);
    console.log(endDateVal);
    axios
      .post(
        BASE_URL + '/appForeground/',
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
        Log('Fetched data..', response.data);
        let res = dummyChartData;
        let categories = [] as string[];
        let newSeries = [];
        for (let i = 0; i < response.data[0].length; i++) {
          if (response.data[1][i] >= 1) {
            categories.push(response.data[0][i]);
            newSeries.push(Math.round(response.data[1][i] * 100) / 100);
          }
        }

        res.options.labels = categories;
        res.series = newSeries;
        setOptions((pre) => ({
          ...pre,
          //@ts-ignore
          labels: categories,
        }));
        //@ts-ignore
        setSeries([...newSeries]);
      });
  };
  useEffect(() => {
    Log('App usage chart...');
    fetchData();
    //setBarState(dummyChartData);
  }, [startDateVal]);

  return (
    <ChartContainer>
      <ChartDataWrapper>
        <DateRangeSelector setStartDate={setStartDateVal} setEndDate={setEndDateVal} />
      </ChartDataWrapper>
      {series.length === 0 ? (
        <div>No data available.</div>
      ) : (
        <Chart options={options} series={series} type='pie' width='600' height='400' />
      )}
    </ChartContainer>
  );
}

export default AppUsageChart;
