import axios from 'axios';
import { SetStateAction, useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import styled from 'styled-components';
import COLORS from '../../constant/Colors';
import DateRangeSelector from '../common/DateRangeSelector';
import { Log } from '../common/Logger';
import { GoogleMap, InfoWindow, Marker, LoadScript } from "@react-google-maps/api";
import { useLoadScript } from "@react-google-maps/api";
import CircularProgress from '@mui/material/CircularProgress';

 

function LocationMap(props: any) {
   
  const [markerList, setMarkerList] = useState([])
  const [apiKey, setApiKey] = useState('')

  const [startDateVal, setStartDateVal] = useState(1641634738549)
  const [endDateVal, setEndDateVal] = useState(1641901876549)
  
  const fetchData = () => {
    let curDate = new Date();
    // @ts-ignore
    let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));

    axios
      .post(
        'https://digital-phenotyping.herokuapp.com/locationServer/MapCoordinate',
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
        if(response.data.data.length === 0){
          setMarkerList([])
        }else{
          //@ts-ignore
          setMarkerList([...response.data.data])
        }
        
        //setApiKey(response.data.key)
        setApiKey("AIzaSyBX1z5nvjcjzyxSMT-QCVS3ERu6Y3iNSb0")
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
    <Container>
      <DateWrapper>
        <DateRangeSelector setStartDate={setStartDateVal} setEndDate={setEndDateVal} />
      </DateWrapper>
      <Title>Places visited</Title>
      {apiKey !== '' ? 
      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap
          onClick={()=>setActiveMarker(null)}
          mapContainerStyle={{width:600,height:600,borderRadius:20}}
          zoom={18}
          //@ts-ignore
          center={markerList.length !== 0 ? markerList[0].position : {lat:-37.79982405419514,lng: 144.96449506766206}}
        >
          {markerList.map(({ id, locType, position }) => (
        <Marker
          key={id}
          position={position}
          onClick={() => handleActiveMarker(id)}
        >
          {activeMarker === id ? (
            <InfoWindow onCloseClick={() => setActiveMarker(null)}>
              <div>{locType}</div>
            </InfoWindow>
          ) : null}
        </Marker>
      ))}
        </GoogleMap>
        </LoadScript> :<CircularProgress />
      }
    </Container> 
  );
}

export default LocationMap;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const DateWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;
const Title = styled.div`
  font-size: 20px;
  color: ${COLORS.text}
`