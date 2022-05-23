import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

export default function Loginpage() {
  return (
    <MainContainer>
      Loginpage
      <div>
        <Link to='/homepage'>
          <Button variant='contained'>Login</Button>
        </Link>
      </div>
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
