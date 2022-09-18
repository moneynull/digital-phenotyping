import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import styled from 'styled-components';
import COLORS from '../../constant/Colors';
import { Log } from '../common/Logger';
import axios from 'axios'; 
import DateRangeSelector from '../common/DateRangeSelector';
// dummy data for app time usage
const colors = ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0', '#00D9E9'];

const dummyHashtagChart= {
  options : {
    series: [{data: [] as any []}],
    chart: {
    type: 'bar',
    height: 350,
  },
  plotOptions: {
    bar: {
      borderRadius: 4,
      horizontal: true,
      distributed: true,
    }
    
  },
  dataLabels: {
    enabled: true
  },
  xaxis: {
    categories: [] as any [],
    title: {
      text: 'Hours of usage',
      style: {
        fontSize: '13px',
        fontWeight: 200,
        color: `${COLORS.text_2}`,
        cssClass: 'apexcharts-xaxis-label',
      },
    },
  },
  title: {
    text: 'Twitter hashtags & Occurancy frequencies',
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
  fill: {
    colors: colors,
  },
  
  }
};
function TwitterHashtagBarchart(props: any) {
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
        Log('Fetched hashtag barchart data..', response.data);
        let chart = dummyHashtagChart
        let resData = response.data.data

        
        let categories = [] as any[];
        let newSeries = [];
        for(const [key , val] of Object.entries<any>(resData)){
          
          categories.push(key);
          newSeries.push(val);
          
        }
        chart.options.series = [{ data :newSeries}];
        chart.options.xaxis.categories = categories;
 
        setOptions(pre => ({
          ...pre,
          ...dummyHashtagChart.options,
          xaxis:{
            //@ts-ignore
            ...pre.xaxis,
            categories:categories
          }
        }))
        //@ts-ignore
        setSeries([ ...[{ data :newSeries}]]) 
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
        type='bar'
        width='600'
        height='400'
      />
    </Container>
  );
}

export default TwitterHashtagBarchart;
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const DateWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`; 