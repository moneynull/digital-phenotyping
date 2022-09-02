import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import styled from 'styled-components';
import COLORS from '../../constant/Colors';
import DateRangeSelector from '../common/DateRangeSelector';
import { Log } from '../common/Logger';

const loacationNumberSeries = [];

const locationNumberData = {
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
    colors: ['#F3B415', '#F27036', '#008FFB', '#6A6E94'],
    xaxis: {
      type: 'category',
      categories: [] as any[],
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

function LocationNumberHeatMapChart(props: any) {
  const [options, setOptions] = useState({})
  const [series, setSeries] = useState([])

  const [startDateVal, setStartDateVal] = useState(1641634738549)
  const [endDateVal, setEndDateVal] = useState(1641901876549)
  
  const fetchData = () => {
    let curDate = new Date();
    // @ts-ignore
    let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));

    axios
      .post(
        'https://digital-phenotyping.herokuapp.com/locationServer/NumbersOfLocation',
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
        for (let i = 0; i < data.length; i++) {
          newSeries.push({
            name:  data[i][0],
            data: [
              { x: data[0][2][0] !== undefined ? data[0][2][0] :"street_address", y: data[i][3][0] !== undefined ? data[i][3][0] : 0 },
              { x: data[0][2][1] !== undefined ? data[0][2][1] :"university", y: data[i][3][1] !== undefined ? data[i][3][1] : 0 },
              { x: data[0][2][2]!== undefined ? data[0][2][2] :"establishment", y: data[i][3][2] !== undefined ? data[i][3][2] : 0 },
              { x: data[0][2][3]!== undefined ? data[0][2][3] :"premise", y: data[i][3][3] !== undefined ? data[i][3][3] : 0 },
            ],
          });
        }
        Log('newSeries', newSeries); 
        if(data.length === 0){
          setOptions({})
          setSeries([])
        }else{
          setOptions(pre => ({
            ...pre,
            ...locationNumberData.options,
            xaxis:{
              //@ts-ignore
              ...pre.xaxis,
              categories:data[0][2]
            }
          }))
          //@ts-ignore
          setSeries([ ...newSeries])
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
      
    <Chart
      options={options}
      series={series}
      type='heatmap'
      width='650'
      height='400'
    />
    </Container>
  );
}

export default LocationNumberHeatMapChart;
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const DateWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;