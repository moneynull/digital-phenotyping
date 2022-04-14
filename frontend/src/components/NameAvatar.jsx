import React from 'react';
import styled from 'styled-components';

function NameAvatar() {
  return (
    <Container>
      <Name>Marvin</Name>
      <Avatar src='https://randomuser.me/api/portraits/men/11.jpg' />
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  margin-left: 100px;
  flex-direction: row;
  align-items: center;
`;
const Name = styled.text`
  font-size: 30px;
  font-weight: 800;
  color: #3e3e3e;
`;
const Avatar = styled.img`
  height: 60px;
  margin-left: 20px;
  width: 60px;
  border-radius: 30px;
`;
export default NameAvatar;
