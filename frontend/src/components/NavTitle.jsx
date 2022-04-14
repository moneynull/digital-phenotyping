import React from 'react';
import styled from 'styled-components';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

function NavTitle(props) {
  return (
    <NavTitleContainer>
      {props.showArrowBack && <ArrowBackRoundedIcon fontSize='large' />}
      <NavTitleText>{props.title}</NavTitleText>
    </NavTitleContainer>
  );
}

const NavTitleContainer = styled.div`
  margin-left: 10vw;
  align-items: center;
  display: flex;
  color: #3e3e3e;
  flex-direction: row;
`;
const NavTitleText = styled.text`
  font-size: 30px;
  margin-left: 20px;
  font-weight: bold;
`;
export default NavTitle;
