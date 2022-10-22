import axios from 'axios';
import { SetStateAction, useEffect, useState } from 'react';
import { GoogleMap, InfoWindow, Marker, LoadScript } from '@react-google-maps/api';
import CircularProgress from '@mui/material/CircularProgress';
import { BASE_URL } from '../../constant/Endpoint';
import DateRangeSelector from '../common/DateRangeSelector';
import { Log } from '../common/Logger';
import ChartContainer from '../common/ChartContainer';
import ChartDataWrapper from '../common/ChartDataWrapper';

function LocationMap(props: ChartProps) {
  const [markerList, setMarkerList] = useState([]);
  const [apiKey, setApiKey] = useState('');

  const [startDateVal, setStartDateVal] = useState(1641634738549);
  const [endDateVal, setEndDateVal] = useState(1641901876549);

  const fetchData = () => {
    let curDate = new Date();
    // @ts-ignore
    let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));

    axios
      .post(
        BASE_URL + '/locationServer/MapCoordinate',
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
        Log('Fetched Location Map coordinate data..', response.data);
        if (response.data.data.length === 0) {
          setMarkerList([]);
        } else {
          //@ts-ignore
          setMarkerList([...response.data.data]);
        }

        setApiKey(response.data.key);
      });
  };
  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (marker: SetStateAction<null>) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  useEffect(() => {
    fetchData();
  }, [startDateVal]);

  return (
    <ChartContainer>
      <ChartDataWrapper>
        <DateRangeSelector setStartDate={setStartDateVal} setEndDate={setEndDateVal} />
      </ChartDataWrapper>
      <div className='info-card-title'>Places visited</div>
      {apiKey !== '' ? (
        <LoadScript googleMapsApiKey={apiKey}>
          <GoogleMap
            onClick={() => setActiveMarker(null)}
            mapContainerStyle={{ width: 600, height: 600, borderRadius: 20 }}
            zoom={18}
            //@ts-ignore
            center={
              markerList.length !== 0
                ? //@ts-ignore
                  markerList[0].position
                : { lat: -37.79982405419514, lng: 144.96449506766206 }
            }
          >
            {markerList.map(({ id, locType, position }) => (
              <Marker key={id} position={position} onClick={() => handleActiveMarker(id)}>
                {activeMarker === id ? (
                  <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                    <div>{locType}</div>
                  </InfoWindow>
                ) : null}
              </Marker>
            ))}
          </GoogleMap>
        </LoadScript>
      ) : (
        <CircularProgress />
      )}
    </ChartContainer>
  );
}

export default LocationMap;
