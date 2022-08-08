import React, { useEffect } from 'react';
import styled from 'styled-components';
import logo from '../../../src/assets/senpsi_logo.png';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

export default function Homepage() {
  let navigate = useNavigate();
  let token = sessionStorage.getItem('userInfo');
  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, []);
  const logout = () => {
    sessionStorage.removeItem('userInfo');
    navigate('/homepage');
  };
  return (
    <MainContainer>
      Homepage
      <div></div>
      <img src={logo} alt='logo' />
      <div>
        <Link to='/loginpage'>
          <Button onClick={logout} variant='contained'>
            Log Out
          </Button>
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
