import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import styled from 'styled-components';
import COLORS from '../../constant/Colors';
import { Log } from '../common/Logger';
import axios from 'axios'; 
import DateRangeSelector from '../common/DateRangeSelector';
// dummy data for app time usage
const dummyChartData = {
  
  series: [
    {
      data: [
        {x: 'New Delhi',y: 218},
        {x: 'Kolkata',y: 149},
        {x: 'Mumbai',y: 184},
        {x: 'Ahmedabad',y: 55},
        {x: 'Bangaluru',y: 84},
        {x: 'Pune',y: 31},
        {x: 'Chennai',y: 70},
        {x: 'Jaipur',y: 30},
        {x: 'Surat',y: 44},
        {x: 'Hyderabad',y: 68},
        {x: 'Lucknow',y: 28},
        {x: 'Indore',y: 19},
        {x: 'Kanpur',y: 29}
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
      text: 'Basic Treemap'
    }
  },
}; 

function AppUsageChart(props: any) {
  const [options, setOptions] = useState({})
  const [series, setSeries] = useState([])
  
  const [startDateVal, setStartDateVal] = useState(1641634738549)
  const [endDateVal, setEndDateVal] = useState(1641901876549)
  
  const fetchData = () => { 
    // @ts-ignore
    let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    console.log(startDateVal)
    console.log(endDateVal)
    axios
      .post(
        'https://digital-phenotyping.herokuapp.com/twitterDataServer/twitterHashtag',
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
        Log('Fetched hashtag data..', response.data);
        let chart = dummyChartData
        let resData = response.data.data
        
        let categories = [] as any[];
        let newSeries = [];
        for(const [key , val] of Object.entries<any>(resData)){

          
          categories.push(key);
          newSeries.push({x:key,y:val});
          
        }
  
      
        const series = [{ data: newSeries }];

        chart.series = series;
 

        setOptions(pre => ({
          ...pre,
          //@ts-ignore
          labels: categories
        }))
        //@ts-ignore
        setSeries([ ...series]) 
      });
  };
  useEffect(() => {
    Log('treemap chart...');
    fetchData();
    //setBarState(dummyChartData);
  }, [startDateVal]);
 
  return (
    <Container>

      <Chart
        options={options}
        series={series}
        type='treemap'
        width='600'
        height='400'
      />
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