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
          <Button variant='contained'>Go to Home Page </Button>
        </Link>
      </div>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  color: red;
  font-size: 32px;
`;
