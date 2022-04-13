import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import logo from '../../../src/asset/senpsi_logo.png';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

import Chart from 'react-apexcharts';
export default function InfoDetailsPage() {
  const [barState, setBarState] = useState({
    options: {},
    series: [],
  });
  useEffect(() => {
    setBarState({
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
    });
  }, []);
  return (
    <MainContainer>
      <Header>
        <NavTitle>
          <ArrowBackRoundedIcon fontSize='large' />
          <NavTitleText>Info Details</NavTitleText>
        </NavTitle>
      </Header>
      <div></div>
      <img src={logo} alt='logo' />
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
  border: 1px solid red;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const NavTitle = styled.div`
  margin-left: 10vw;
  align-items: center;
  display: flex;
  color: #3e3e3e;
  flex-direction: row;
`;
const NavTitleText = styled.text`
  font-size: 30px;
`;
