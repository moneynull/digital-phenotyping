import axios from 'axios';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import COLORS from '../../constant/Colors';
import { BASE_URL } from '../../constant/Endpoint';
import ChartContainer from '../common/ChartContainer';
import ChartDataWrapper from '../common/ChartDataWrapper';
import DateRangeSelector from '../common/DateRangeSelector';
import { Log } from '../common/Logger';

const dummyCategoryData = {
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
        text: 'times',
        style: {
          fontSize: '13px',
          fontWeight: 200,
          color: `${COLORS.text_2}`,
          cssClass: 'apexcharts-xaxis-label',
        },
      },
    },
    title: {
      text: 'Categories of App Usage',
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

function CategoryChart(props: ChartProps) {
  const [options, setOptions] = useState({});
  const [series, setSeries] = useState([]);
  const [hasData, setHasData] = useState(false);
  const [startDateVal, setStartDateVal] = useState(1641634738549);
  const [endDateVal, setEndDateVal] = useState(1641901876549);
  const fetchData = () => {
    // @ts-ignore
    let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    console.log(startDateVal);
    console.log(endDateVal);
    axios
      .post(
        BASE_URL + '/appForeground/AppCategory',
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
        Log('Fetched categroy data..', response.data);
        let chart = dummyCategoryData;
        let resData = response.data;
        console.log(resData.category.length);
        if (resData.category.length === 0) {
          setHasData(false);
        } else {
          let categories = [] as string[];
          let newSeries = [];
          let idx = resData.category.indexOf(null);
          if (idx !== -1) {
            resData.category[idx] = 'Unknown';
          }
          for (const [key, val] of Object.entries<number>(resData)) {
            categories.push(key);
            newSeries.push(val);
          }
          chart.options.series = [{ data: newSeries }];
          chart.options.xaxis.categories = categories;

          setOptions((pre) => ({
            ...pre,
            ...dummyCategoryData.options,
            xaxis: {
              //@ts-ignore
              ...pre.xaxis,
              categories: resData.category,
            },
          }));
          //@ts-ignore
          setSeries([...[{ data: resData.count }]]);
          setHasData(true);
        }
      });
  };
  useEffect(() => {
    Log('App category chart...');
    fetchData();
  }, [startDateVal]);
  return (
    <ChartContainer>
      <ChartDataWrapper>
        <DateRangeSelector setStartDate={setStartDateVal} setEndDate={setEndDateVal} />
      </ChartDataWrapper>
      {hasData ? (
        <Chart options={options} series={series} type='bar' width='650' height='400' />
      ) : (
        <div>
          App Categories <br></br>No data available.
        </div>
      )}
    </ChartContainer>
  );
}

export default CategoryChart;
