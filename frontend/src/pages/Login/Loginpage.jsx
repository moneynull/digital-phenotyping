import React from 'react';
import styled from 'styled-components';
import {Link } from "react-router-dom";

export default function Loginpage() {
  return  <MainContainer>Loginpage
            <div><Link to="/homepage"><button>Go to Home Page </button></Link></div>
          </MainContainer>;
}

const MainContainer = styled.div`
  color: red;
  font-size: 32px;
`;
