import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';
import COLORS from '../../constant/Colors';
import { Log } from '../common/Logger';
import { BASE_URL } from '../../constant/Endpoint';
import DateRangeSelector from '../common/DateRangeSelector';
import ChartContainer from '../common/ChartContainer';
import ChartDataWrapper from '../common/ChartDataWrapper';
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

function SmsUsageChart(props: ChartProps) {
  const [options, setOptions] = useState(dummySMSData.options);
  const [series, setSeries] = useState(dummySMSData.series);
  const [hasData, setHasData] = useState(false);
  const [startDateVal, setStartDateVal] = useState(1641634738549);
  const [endDateVal, setEndDateVal] = useState(1641901876549);

  const fetchData = () => {
    let curDate = new Date();
    // @ts-ignore
    let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));

    Log('SMS fetch');
    axios
      .post(
        BASE_URL + '/sms/',
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
        if (data.length === 0) {
          setOptions(dummySMSData.options);
          setSeries(dummySMSData.series);
          setHasData(false);
        } else {
          setOptions((pre) => ({
            ...pre,
            xaxis: {
              //@ts-ignore
              ...pre.xaxis,
              categories: data[2],
            },
          }));
          //@ts-ignore
          setSeries([...newSeries]);
          setHasData(true);
        }
      });
  };
  useEffect(() => {
    fetchData();
  }, [startDateVal]);

  return (
    <ChartContainer>
      <ChartDataWrapper>
        <DateRangeSelector setStartDate={setStartDateVal} setEndDate={setEndDateVal} />
      </ChartDataWrapper>
      {hasData ? (
        <Chart
          //@ts-ignore
          options={options}
          series={series}
          type='bar'
          width='600'
          height='400'
        />
      ) : (
        <div>
          SMS Usage <br></br>No data available.
        </div>
      )}
    </ChartContainer>
  );
}

export default SmsUsageChart;
