import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import COLORS from '../../constant/Colors';
import { Log } from '../common/Logger';

import axios from 'axios';
import styled from 'styled-components';
import DateRangeSelector from '../common/DateRangeSelector';
const dummySMSData = {
  series: [
    {
      name: 'Incoming',
      data: [10, 9, 8, 7, 6],
    },
    {
      name: 'Outgoing',
      data: [1, 2, 3, 4, 5],
    },
  ],
  options: {
    chart: {
      type: 'bar',
      height: 440, 
    },
    colors: ['#008FFB', '#FF4560'],
    plotOptions: {
      bar: {
        horizontal: false, 
        endingShape: 'rounded'
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
      text: 'SMSs Usage',
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
      categories: ['May 1', 'May 2', 'May 3', 'May 4', 'May 5'],
    },
  },
};

function SmsUsageChart(props: any) {
  const [options, setOptions] = useState({})
  const [series, setSeries] = useState([])
  
  const [startDateVal, setStartDateVal] = useState(1641634738549)
  const [endDateVal, setEndDateVal] = useState(1641901876549)
  
  const fetchData = () => {
    let curDate = new Date();
    // @ts-ignore
    let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));

    Log('SMS fetch');
    axios
      .post(
        'https://digital-phenotyping.herokuapp.com/sms/',
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
        Log('Fetched SMS data..', response.data);
        let res = dummySMSData;
        let data = response.data;
        //response.data[0].splice(3, 1);
        res.options.xaxis.categories = data[2];
        let newSeries = [
          {
            name: 'Incoming',
            data: data[0],
          },
          {
            name: 'Outgoing',
            data: data[1],
          },
        ];

        res.series = newSeries;
        if(data.length === 0){
          setOptions({})
          setSeries([])
        }else{
          setOptions(pre => ({
            ...pre,
            xaxis:{
              //@ts-ignore
              ...pre.xaxis,
              categories: data[2]
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
      type='bar'
      width='600'
      height='400'
    />
    </Container>
    
  );
}

export default SmsUsageChart;
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const DateWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;