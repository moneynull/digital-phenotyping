import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import PhonelinkIcon from '@mui/icons-material/Phonelink';
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import AccessTimeFilledRoundedIcon from '@mui/icons-material/AccessTimeFilledRounded';
import TwitterIcon from '@mui/icons-material/Twitter';
import NavTitle from '../../components/common/NavTitle';
import SearchBar from '../../components/common/SearchBar';
import NameAvatar from '../../components/common/NameAvatar';
import COLORS from '../../constant/Colors';
import CardContainer from '../../components/common/CardContainer';
import SectionTitle from '../../components/common/SectionTitle';
import { Log } from '../../components/common/Logger';
import AppUsageChart from '../../components/InfoDetailsChart/AppUsageChart';
import SmsUsageChart from '../../components/InfoDetailsChart/SmsUsageChart';
import CategoryChart from '../../components/InfoDetailsChart/CategoryChart';
import CallsUsageChart from '../../components/InfoDetailsChart/CallsUsageChart';
import UnlockDurationChart from '../../components/InfoDetailsChart/UnlockDurationChart';
import LocationNumberHeatMapChart from '../../components/InfoDetailsChart/LocationNumberHeatMapChart';
import UnlockTimesChart from '../../components/InfoDetailsChart/UnlockTimesChart';
import KeywordCloud from '../../components/InfoDetailsChart/KeywordCloud';
import LocationNumberBarChart from '../../components/InfoDetailsChart/LocationNumberBarChart';
import LocationMap from '../../components/InfoDetailsChart/LocationMap';
import ScreenUsageHeatMap from '../../components/InfoDetailsChart/ScreenUsageHeatMap';
import UpdateInfo from '../../components/InfoDetailsChart/UpdateInfo';
import TwitterHashtagBarchart from '../../components/InfoDetailsChart/TwitterHashtagBarchart';
import TwitterTopicChart from '../../components/InfoDetailsChart/TwitterTopicChart';
import CallsTraceChart from '../../components/InfoDetailsChart/CallsTraceChart';
import SmsTraceChart from '../../components/InfoDetailsChart/SmsTraceChart';
import RowFlexContainer from '../../components/common/RowFlexContainer';

function InfoDetailsPage() {
  let navigate = useNavigate();
  let location = useLocation();
  const [patientId, setPatientId] = useState(1);
  const [clientName, setClientName] = useState('');
  const [curSelected, setCurSelected] = useState('Application');
  const [loadingPage, setLoadingpage] = useState(true);

  let token = sessionStorage.getItem('userInfo');
  let stateFromPrePage: { clientInfo: iUserInfo } = location.state as { clientInfo: iUserInfo };
  useEffect(() => {
    if (!token || stateFromPrePage.clientInfo === null) {
      navigate('/');
      return;
    }
    setPatientId(stateFromPrePage.clientInfo.uid);
    setLoadingpage(false);
  }, []);
  const selected = (name: string) => {
    Log(name);
    if (name === curSelected) {
      setCurSelected('ClientInfo');
    } else {
      setCurSelected(name);
    }
  };

  // chart to show when clicking application button
  const appChart = (
    <RowFlexContainer>
      <CardContainer>
        <AppUsageChart uid={patientId} />
      </CardContainer>
      <CardContainer>
        <CategoryChart uid={patientId} />
      </CardContainer>
    </RowFlexContainer>
  );

  // chart to show when clicking communication button
  const comChart = (
    <>
      <RowFlexContainer>
        <CardContainer>
          <SmsUsageChart uid={patientId} />
        </CardContainer>
        <CardContainer>
          <CallsUsageChart uid={patientId} />
        </CardContainer>
      </RowFlexContainer>
      <RowFlexContainer>
        <CardContainer>
          <SmsTraceChart uid={patientId} />
        </CardContainer>
        <CardContainer>
          <CallsTraceChart uid={patientId} />
        </CardContainer>
      </RowFlexContainer>
    </>
  );

  // chart to show when clicking locations button
  const locChart = (
    <>
      <RowFlexContainer>
        <CardContainer>
          <LocationNumberHeatMapChart uid={patientId} />
        </CardContainer>
        <CardContainer>
          <LocationNumberBarChart uid={patientId} />
        </CardContainer>
      </RowFlexContainer>
      <RowFlexContainer>
        <CardContainer>
          <LocationMap uid={patientId} />
        </CardContainer>
      </RowFlexContainer>
    </>
  );

  // chart to show when clicking screen button
  const screenChart = (
    <>
      <RowFlexContainer>
        <CardContainer>
          <UnlockDurationChart uid={patientId} />
        </CardContainer>
        <CardContainer>
          <UnlockTimesChart uid={patientId} />
        </CardContainer>
      </RowFlexContainer>
      <RowFlexContainer>
        <CardContainer>
          <ScreenUsageHeatMap uid={patientId} />
        </CardContainer>
      </RowFlexContainer>
    </>
  );

  const tagCloud = (
    <>
      <RowFlexContainer>
        <CardContainer>
          <KeywordCloud uid={patientId} />
        </CardContainer>
        <CardContainer>
          <TwitterHashtagBarchart uid={patientId} />
        </CardContainer>
      </RowFlexContainer>
      <RowFlexContainer>
        <CardContainer>
          <TwitterTopicChart uid={patientId} />
        </CardContainer>
      </RowFlexContainer>
    </>
  );

  const defaultGreeting = (
    <CardContainer>
      <UpdateInfo clientInfo={stateFromPrePage.clientInfo} />
    </CardContainer>
  );

  // define the acutal chart that need to show
  let show = (type: string) => {
    switch (type) {
      case 'Applications':
        return appChart;
      case 'Communication':
        return comChart;
      case 'Locations':
        return locChart;
      case 'Screen':
        return screenChart;
      case 'Twitter':
        return tagCloud;
      default:
        return defaultGreeting;
    }
  };
  const chartToShow = show(curSelected);
  const navBack = () => {};

  return (
    <div className='page-container'>
      {loadingPage ? (
        <></>
      ) : (
        <>
          <div className='page-header' onClick={navBack}>
            <Link style={{ textDecoration: 'none' }} to='/homepage'>
              <NavTitle title='Client Details' showArrowBack={true} />
            </Link>
            <SearchBar />
            <div className='page-spacer' />
            <NameAvatar />
          </div>
          <div className='chart-container'>
            {/* AWARE Icon on the right */}
            <div className='aware-apps-container'>
              <SectionTitle title={'AWARE Information'} />
              <Grid
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                container
                rowSpacing={3}
                direction='row'
                justifyContent='flex-start'
                alignItems='baseline'
              >
                <Grid onClick={() => selected('Applications')} item xs={2}>
                  <IconText curSelected={curSelected} name='Applications'>
                    <PhonelinkIcon sx={{ fontSize: 80 }} />
                    <div className='info-page-app-name'>Applications</div>
                  </IconText>
                </Grid>
                <Grid item onClick={() => selected('Communication')} xs={2}>
                  <IconText curSelected={curSelected} name='Communication'>
                    <ChatRoundedIcon sx={{ fontSize: 80 }} />
                    <div className='info-page-app-name'>Communication</div>
                  </IconText>
                </Grid>
                <Grid item onClick={() => selected('Locations')} xs={2}>
                  <IconText curSelected={curSelected} name='Locations'>
                    <LocationOnRoundedIcon sx={{ fontSize: 80 }} />
                    <div className='info-page-app-name'>Locations</div>
                  </IconText>
                </Grid>
                <Grid item onClick={() => selected('Screen')} xs={2}>
                  <IconText curSelected={curSelected} name='Screen'>
                    <AccessTimeFilledRoundedIcon sx={{ fontSize: 80 }} />
                    <div className='info-page-app-name'>Screen</div>
                  </IconText>
                </Grid>
                <Grid item onClick={() => selected('Twitter')} xs={2}>
                  <IconText curSelected={curSelected} name='Twitter'>
                    <TwitterIcon sx={{ fontSize: 80 }} />
                    <div className='info-page-app-name'>Twitter</div>
                  </IconText>
                </Grid>
              </Grid>
            </div>
          </div>
          {chartToShow}
        </>
      )}
    </div>
  );
}

interface Props {
  curSelected: string;
  name: string;
}
const IconText = styled.div<Props>`
  padding: 10px;
  &:hover {
    cursor: pointer;
  }
  color: ${(props: Props) => (props.name === props.curSelected ? COLORS.white : COLORS.text)};
  background-color: ${(props: Props) =>
    props.name === props.curSelected ? COLORS.primary : COLORS.white};
  border-radius: 10px;
  box-shadow: 2px 2px 15px 1px ${COLORS.shadow};
  display: flex;
  width: 180px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export default InfoDetailsPage;
