import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Chart from 'react-apexcharts';
import NavTitle from '../../components/NavTitle';
import SearchBar from '../../components/SearchBar';
import NameAvatar from '../../components/NameAvatar';
const dummyChartData = {
  options: {
    title: {
      text: 'App Times Used',
      align: 'center',
      margin: 10,
      offsetX: 0,
      offsetY: 0,
      floating: false,
      style: {
        fontSize: '14px',
        fontWeight: 'bold',
        color: '#263238',
      },
    },
    chart: {
      id: 'basic-bar',
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
      },
    },
    xaxis: {
      categories: [
        'Twitter',
        'Google Map',
        'Facebook',
        'ESPN',
        'Domain Real Estate',
        'Champions League Official',
        'ASUS Weather',
      ],
    },
  },
  series: [
    {
      name: 'Times Used',
      data: [100, 78, 78, 43, 10, 22, 56],
    },
  ],
};
function InfoDetailsPage() {
  const [patientId, setPatientId] = useState('123');
  const [barState, setBarState] = useState({
    options: {},
    series: [],
  });
  useEffect(() => {
    setBarState(dummyChartData);
  }, []);
  return (
    <MainContainer>
      <Header>
        <NavTitle title='Client Details' showArrowBack={true} />
        <SearchBar />
        <Spacer />
        <NameAvatar />
      </Header>
      <div>
        <Link to='/loginpage'>
          <Button variant='contained'>Go to Login Page</Button>
        </Link>
      </div>
      <Chart options={barState.options} series={barState.series} type='bar' width='500' />
    </MainContainer>
  );
}

const MainContainer = styled.div`
  color: blue;
  font-size: 32px;
`;
const Header = styled.div`
  width: 100vw;
  height: 100px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Spacer = styled.div`
  height: 20px;
  width: 30%;
`;
export default InfoDetailsPage;
