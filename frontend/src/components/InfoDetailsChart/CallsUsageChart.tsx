import axios from 'axios';
import URL from '../../constant/Endpoint';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import styled from 'styled-components';
import COLORS from '../../constant/Colors';
import DateRangeSelector from '../common/DateRangeSelector';

// dummy data for Calls usage
const dummyCallsData = {
  series: [] as any[],
  options: {
    chart: {
      type: 'bar',
      height: 440,
    },
    colors: ['#008FFB', '#FF4560', '#775DD0'],
    plotOptions: {
      bar: {
        horizontal: false,
        endingShape: 'rounded',
      },
    },
    stroke: {
      width: 1,
      colors: ['#fff'],
    },
    dataLabels: {
      enabled: true,
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
      },
    },
    xaxis: {
      categories: [] as any[],
    },
  },
};

function CallsUsageChart(props: any) {
  const [options, setOptions] = useState(dummyCallsData.options);
  const [series, setSeries] = useState(dummyCallsData.series);

  const [startDateVal, setStartDateVal] = useState(1641634738549);
  const [endDateVal, setEndDateVal] = useState(1641901876549);

  const fetchData = () => {
    // @ts-ignore
    let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));

    axios
      .post(
        URL.BASE_URL + '/dataServer/calls',
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
        console.log('Fetched data..', response.data.data);
        let res = dummyCallsData;
        let data = response.data.data;
        let newSeries = [
          {
            name: 'Incoming',
            data: data[0],
          },
          {
            name: 'Outgoing',
            data: data[1],
          },
          {
            name: 'Missed',
            data: data[2],
          },
        ];
        res.options.xaxis.categories = data[3];
        res.series = newSeries;
        console.log(res.options.xaxis.categories);
        setOptions((pre) => ({
          ...pre,
          xaxis: {
            //@ts-ignore
            ...pre.xaxis,
            categories: data[3],
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
    <Container>
      <DateWrapper>
        <DateRangeSelector setStartDate={setStartDateVal} setEndDate={setEndDateVal} />
      </DateWrapper>
      <Chart
        //@ts-ignore
        options={options}
        series={series}
        type='bar'
        width='650'
        height='400'
      />
    </Container>
  );
}

export default CallsUsageChart;
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const DateWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
