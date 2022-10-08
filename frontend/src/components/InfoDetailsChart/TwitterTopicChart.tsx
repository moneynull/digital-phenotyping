import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import styled from 'styled-components';
import COLORS from '../../constant/Colors';
import { Log } from '../common/Logger';
import axios from 'axios';
import { BASE_URL } from '../../constant/Endpoint';

const dummyHashtagChart = {
  options: {
    series: [{ data: [] as any[] }],
    chart: {
      type: 'bar',
      height: 350,
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
        distributed: true,
      },
    },
    dataLabels: {
      enabled: true,
    },
    xaxis: {
      categories: [] as any[],
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
  },
};
function TwitterTopicChart(props: any) {
  const [options, setOptions] = useState({});
  const [series, setSeries] = useState([]);
  const [hasData, setHasData] = useState(false);

  const fetchData = () => {
    // @ts-ignore
    let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    axios
      .post(
        BASE_URL + '/twitterDataServer/twitterTopics',
        {
          uid: props.uid,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo!.access}`,
          },
        }
      )
      .then((response) => {
        Log('Fetched twitter topic data..', response.data);
        let chart = dummyHashtagChart;
        let resData = response.data.data;

        if (Object.keys(response.data.data).length === 0) {
          setHasData(false);
        } else {
          let categories = [] as any[];
          let newSeries = [];
          for (const [key, val] of Object.entries<any>(resData)) {
            categories.push(key);
            newSeries.push(val);
          }
          chart.options.series = [{ data: newSeries }];
          chart.options.xaxis.categories = categories;

          setOptions((pre) => ({
            ...pre,
            ...dummyHashtagChart.options,
            xaxis: {
              //@ts-ignore
              ...pre.xaxis,
              categories: categories,
            },
          }));
          //@ts-ignore
          setSeries([...[{ data: newSeries }]]);
          setHasData(true);
        }
      });
  };
  useEffect(() => {
    Log('treemap chart...');
    fetchData();
  }, []);

  return (
    <Container>
      {hasData ? (
        <Chart options={options} series={series} type='bar' width='600' height='900' />
      ) : (
        <div>
          Twitter Topics <br></br>No data available.
        </div>
      )}
    </Container>
  );
}

export default TwitterTopicChart;
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const DateWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
