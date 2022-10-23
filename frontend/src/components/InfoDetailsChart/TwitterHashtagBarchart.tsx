import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';
import COLORS from '../../constant/Colors';
import { Log } from '../common/Logger';
import { BASE_URL } from '../../constant/Endpoint';
import ChartContainer from '../common/ChartContainer';

// dummy data for app time usage
const colors = ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0', '#00D9E9'];

const dummyHashtagChart = {
  options: {
    series: [{ data: [] as number[] }],
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
      categories: [] as string[],
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
  },
};
function TwitterHashtagBarchart(props: ChartProps) {
  const [options, setOptions] = useState({});
  const [series, setSeries] = useState([] as ApexAxisChartSeries);
  const [hasData, setHasData] = useState(false);

  const fetchData = () => {
    // @ts-ignore
    let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    axios
      .post(
        BASE_URL + '/twitterDataServer/twitterHashtag',
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
        Log('Fetched hashtag barchart data..', response.data);
        let chart = dummyHashtagChart;
        let resData = response.data.data;
        if (Object.keys(response.data.data).length === 0) {
          setHasData(false);
        } else {
          let categories = [] as string[];
          let newSeries = [];
          for (const [key, val] of Object.entries<number>(resData)) {
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
    //setBarState(dummyChartData);
  }, []);

  return (
    <ChartContainer>
      {hasData ? (
        <Chart options={options} series={series} type='bar' width='600' height='400' />
      ) : (
        <div>
          Twitter Hashtag <br></br>No data available.
        </div>
      )}
    </ChartContainer>
  );
}

export default TwitterHashtagBarchart;
