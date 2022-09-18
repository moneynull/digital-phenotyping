import axios from 'axios';
import URL from '../../constant/Endpoint';
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import styled from 'styled-components';
import COLORS from '../../constant/Colors';
import DateRangeSelector from '../common/DateRangeSelector';
import { Log } from '../common/Logger';

const screenUsageSeries = [];

const screenUsageData = {
  series: [] as any[],
  options: {
    chart: {
      height: 350,
      type: 'heatmap',
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '14px',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontWeight: 'bold',
        colors: ['#000000'],
      },
    },
    plotOptions: {
      heatmap: {
        colorScale: {
          inverse: true,
        },
      },
    },
    colors: ['#008FFB'],
    xaxis: {
      type: 'category',
      categories: [] as any[],
    },
    title: {
      text: 'Screen Usage Frequency',
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

function ScreenUsageHeatMap(props: any) {
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
        URL.BASE_URL + '/screenServer/NumberOfScreen',
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
        Log('Fetched HeatMap data..', response.data);
        let data = response.data;
        let newSeries = [];
        let xAxis: String[] = [];
        for (let i = 0; i < data.length; i++) {
          let screenData = [];
          for (let h = 0; h < 24; h++) {
            screenData.push({
              x: `${h}:00-${h + 1}:00`,
              y: data[i][3][h] !== undefined ? data[i][3][h] : 0,
            });
            xAxis.push(`${h}:00-${h + 1}:00`);
          }

          newSeries.push({
            name: data[i][0],
            data: screenData,
          });
        }
        newSeries.reverse();
        Log('newSeries', newSeries);
        if (data.length === 0) {
          setOptions({});
          setSeries([]);
        } else {
          setOptions((pre) => ({
            ...pre,
            ...screenUsageData.options,
            xaxis: {
              //@ts-ignore
              ...pre.xaxis,
              categories: xAxis,
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

      <Chart options={options} series={series} type='heatmap' width='650' height='400' />
    </Container>
  );
}

export default ScreenUsageHeatMap;
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const DateWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
