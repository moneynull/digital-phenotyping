import React from 'react';
import styled from 'styled-components';
import logo from '../../../src/asset/senpsi_logo.png';
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
          <Button variant='contained'>Go to Login Page</Button>
        </Link>
      </div>
      <Link to='/infodetailspage'>
        <Button variant='contained'>Go to Info Details Page</Button>
      </Link>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  color: blue;
  font-size: 32px;
`;
