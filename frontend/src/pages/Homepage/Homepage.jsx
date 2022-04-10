import React from 'react';
import styled from 'styled-components';
import logo from '../../../src/asset/senpsi_logo.png'
import {Link } from "react-router-dom";

export default function Homepage() {

  return  <MainContainer>
            Homepage
            <div></div>
            <img src={logo} alt="logo" />
            <div><Link to="/loginpage"><button>Go to Login Page </button></Link></div>
          </MainContainer>
          
          
          
  ;
  
}

const MainContainer = styled.div`
  color: blue;
  font-size: 32px;
`;
