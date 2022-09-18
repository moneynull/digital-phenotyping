import axios from 'axios';
import URL from '../../constant/Endpoint';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import styled from 'styled-components';
import COLORS from '../../constant/Colors';
import DateRangeSelector from '../common/DateRangeSelector';
import { Log } from '../common/Logger';

const locationNumberData = {
  series: [] as any[],
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
      text: 'Number of locations visited',
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
      categories: [] as any[],
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

function LocationNumberBarChart(props: any) {
  const [options, setOptions] = useState({});
  const [series, setSeries] = useState([]);

  const [startDateVal, setStartDateVal] = useState(1641634738549);
  const [endDateVal, setEndDateVal] = useState(1641901876549);

  const fetchData = () => {
    let curDate = new Date();
    // @ts-ignore
    let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));

    axios
      .post(
        URL.BASE_URL + '/locationServer/NumbersOfLocation',
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
        Log('Fetched Location Number data..', response.data);
        let data = response.data;
        let res = locationNumberData;
        let categories: any[] = [];
        let newSeries = [
          {
            name: 'times visited',
            data: [] as any[],
          },
        ];
        for (let i = 0; i < data.length; i++) {
          newSeries[0].data.push(data[i][1]);
          categories.push(data[i][0]);
        }
        if (data.length === 0) {
          setOptions({});
          setSeries([]);
        } else {
          setOptions((pre) => ({
            ...pre,
            xaxis: {
              //@ts-ignore
              ...pre.xaxis,
              categories: categories,
            },
          }));
          //@ts-ignore
          setSeries([...newSeries]);
        }
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
      {series.length === 0 ? (
        <div>No data available.</div>
      ) : (
        <Chart options={options} series={series} type='heatmap' width='650' height='400' />
      )}
    </Container>
  );
}

export default LocationNumberBarChart;
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const DateWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
