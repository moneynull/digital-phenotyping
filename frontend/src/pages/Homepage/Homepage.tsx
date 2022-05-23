import React from 'react';
import styled from 'styled-components';
import logo from '../../../src/assets/senpsi_logo.png';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

export default function Homepage() {
  return (
    <MainContainer>
      Homepage
      <div></div>
      <img src={logo} alt='logo' />
      <div>
        <Link to='/loginpage'>
          <Button variant='contained'>Log Out</Button>
        </Link>
      </div>
      <Link to='/infodetailspage'>
        <Button variant='contained'>Client Info Details</Button>
      </Link>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  color: black;
  font-size: 32px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;
