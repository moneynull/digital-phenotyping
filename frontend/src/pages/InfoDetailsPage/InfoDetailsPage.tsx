import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import NavTitle from '../../components/common/NavTitle';
import SearchBar from '../../components/common/SearchBar';
import NameAvatar from '../../components/common/NameAvatar';
import COLORS from '../../constant/Colors';
import CardContainer from '../../components/common/CardContainer';
import SectionTitle from '../../components/common/SectionTitle';
import PhonelinkIcon from '@mui/icons-material/Phonelink';
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import AccessTimeFilledRoundedIcon from '@mui/icons-material/AccessTimeFilledRounded';
import TwitterIcon from '@mui/icons-material/Twitter';
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

function InfoDetailsPage() {
  let navigate = useNavigate();
  let location = useLocation();
  const [patientId, setPatientId] = useState(1);
  const [clientName, setClientName] = useState('')
  const [curSelected, setCurSelected] = useState('Application');
  const [loadingPage, setLoadingpage] = useState(true)

  let token = sessionStorage.getItem('userInfo');
  let stateFromPrePage: {clientInfo: any[]} = location.state as {clientInfo: any[]}
  useEffect(() => {
    if (!token || stateFromPrePage.clientInfo === null) {
      navigate('/');
      return
    }
    setPatientId(stateFromPrePage.clientInfo[5])
    setLoadingpage(false)
    setClientName(stateFromPrePage.clientInfo[0])
    
  }, []);
  const selected = (name: string) => {
    Log(name);
    setCurSelected(name);
  };

  // chart to show when clicking application button
  const appChart = (
    <ChartContainer>
      <CardContainer>
        <AppUsageChart uid={patientId} />
      </CardContainer>
      <CardContainer>
        <CategoryChart uid={patientId}/>
      </CardContainer>
    </ChartContainer>
  );

  // chart to show when clicking communication button
  const comChart = (
    <ChartContainer>
      <CardContainer>
        <SmsUsageChart uid={patientId} />
      </CardContainer>
      <CardContainer>
        <CallsUsageChart uid={patientId} />
      </CardContainer>
    </ChartContainer>
  );

  // chart to show when clicking locations button
  const locChart = (
    <>
    <ChartContainer>
      <CardContainer>
        <LocationNumberHeatMapChart uid={patientId} />
      </CardContainer>
      <CardContainer>
        <LocationNumberBarChart uid={patientId} />
      </CardContainer>
    </ChartContainer>
    <ChartContainer>
      <CardContainer>
        <LocationMap uid={patientId} />
      </CardContainer>
    </ChartContainer>
    </>
  );

  // chart to show when clicking screen button
  const screenChart = (
    <>
    <ChartContainer>
      <CardContainer>
        <UnlockDurationChart uid={patientId} />
      </CardContainer>
      <CardContainer>
        <UnlockTimesChart uid={patientId} />
      </CardContainer>
    </ChartContainer>
    <ChartContainer>
      <CardContainer>
        <ScreenUsageHeatMap uid={patientId} />
      </CardContainer>
    </ChartContainer>
    </>
  );

  const tagCloud = (
    <CardContainer>
      <KeywordCloud uid={patientId} />
    </CardContainer>
  );

  const defaultGreeting = (
    <CardContainer>
      <Reminder>Client Name: {clientName}</Reminder>
      <Reminder>Select an AWARE category to see more details.</Reminder>
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
    <MainContainer>
      {loadingPage ? <></> : 
      <>
      <Header onClick={navBack}>
        <Link style={{ textDecoration: 'none' }} to='/homepage'>
          <NavTitle title='Client Details' showArrowBack={true} />
        </Link>
        <SearchBar />
        <Spacer />
        <NameAvatar />
      </Header>
      <SubContainer>
        {/* AWARE Icon on the right */}
        <AwareAppsContainer>
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
                <AppName>Applications</AppName>
              </IconText>
            </Grid>
            <Grid item onClick={() => selected('Communication')} xs={2}>
              <IconText curSelected={curSelected} name='Communication'>
                <ChatRoundedIcon sx={{ fontSize: 80 }} />
                <AppName>Communication</AppName>
              </IconText>
            </Grid>
            <Grid item onClick={() => selected('Locations')} xs={2}>
              <IconText curSelected={curSelected} name='Locations'>
                <LocationOnRoundedIcon sx={{ fontSize: 80 }} />
                <AppName>Locations</AppName>
              </IconText>
            </Grid>
            <Grid item onClick={() => selected('Screen')} xs={2}>
              <IconText curSelected={curSelected} name='Screen'>
                <AccessTimeFilledRoundedIcon sx={{ fontSize: 80 }} />
                <AppName>Screen</AppName>
              </IconText>
            </Grid>
            <Grid item onClick={() => selected('Twitter')} xs={2}>
              <IconText curSelected={curSelected} name='Twitter'>
                <TwitterIcon sx={{ fontSize: 80 }} />
                <AppName>Twitter</AppName>
              </IconText>
            </Grid>
          </Grid>
        </AwareAppsContainer>

        {chartToShow}
      </SubContainer>
      </>}
    </MainContainer>
  );
}

interface Props {
  curSelected: string;
  name: string;
}
const MainContainer = styled.div`
  font-size: 32px;
  padding-left: 5vw;
  display: flex;
  flex-direction: column;
`;
const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const AwareAppsContainer = styled.div`
  display: flex;
  margin-left: 100px;
  margin-bottom: 50px;
  width: 100%;
  flex-direction: column;
`;
const ChartContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
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
const AppName = styled.div`
  margin: 10px;
  font-size: 20px;
  font-family: 'Open Sans', sans-serif;
`;
const Header = styled.div`
  width: 80vw;
  height: 100px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Spacer = styled.div`
  height: 20px;
  width: 30%;
`;
const Reminder = styled.div`
  margin: 10px;
  font-size: 20px;
  font-family: 'Open Sans', sans-serif;
  align-self: center;
`;

export default InfoDetailsPage;
