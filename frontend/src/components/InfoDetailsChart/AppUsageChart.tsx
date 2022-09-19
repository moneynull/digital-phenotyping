import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import styled from 'styled-components';
import COLORS from '../../constant/Colors';
import { Log } from '../common/Logger';
import axios from 'axios';
import URL from '../../constant/Endpoint';
import DateRangeSelector from '../common/DateRangeSelector';
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
    labels: [] as any[],
  },
  series: [] as any[],
};

function AppUsageChart(props: any) {
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
        URL.BASE_URL + '/appForeground/',
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
        let categories = [] as any[];
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
    <Container>
      <DateWrapper>
        <DateRangeSelector setStartDate={setStartDateVal} setEndDate={setEndDateVal} />
      </DateWrapper>
      {series.length === 0 ? (
        <div>No data available.</div>
      ) : (
        <Chart options={options} series={series} type='pie' width='600' height='400' />
      )}
    </Container>
  );
}

export default AppUsageChart;
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const DateWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
