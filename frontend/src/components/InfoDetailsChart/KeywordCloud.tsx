import axios from 'axios';
import { useEffect, useState } from 'react';
import ReactWordcloud, { Word } from 'react-wordcloud';
import { BASE_URL } from '../../constant/Endpoint';

const angles: [number, number] = [-10, 10];
const fontSizes: [number, number] = [20, 80];

const options = {
  enableTooltip: true,
  rotations: 3,
  rotationAngles: angles,
  fontSizes: fontSizes,
};

function KeywordCloud(props: ChartProps) {
  const [keywords, setKeywords] = useState([] as Word[]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    // @ts-ignore
    let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    console.log('UID', props.uid);
    axios
      .post(
        BASE_URL + '/twitterDataServer/twitterWordCloud',
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
        console.log('Fetched keyword data..', response.data);
        let resData = response.data.data;
        console.log('Fetched keyword data.data..', resData);
        let resArr = [];
        for (const [key, val] of Object.entries<number>(resData)) {
          if (val > 3) {
            resArr.push({
              text: key,
              value: val,
            });
          }
        }
        console.log(resArr);
        setKeywords(resArr);
      });
  };
  return (
    <>
      {keywords.length === 0 ? (
        <div>
          Twitter keyword <br></br>No data available.
        </div>
      ) : (
        <ReactWordcloud options={options} words={keywords} />
      )}
    </>
  );
}

export default KeywordCloud;
