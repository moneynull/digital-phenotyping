import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import COLORS from '../../constant/Colors';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

function NameAvatar() {
  let navigate = useNavigate();
  const [name, setName] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logout = () => {
    sessionStorage.removeItem('userInfo');
    navigate('/loginpage');
  };
  useEffect(() => {
    let userInfo = sessionStorage.getItem('userInfo');
    if (userInfo !== null) {
      userInfo = JSON.parse(userInfo);
    }else{
      return
    }
    //@ts-ignore
    let name = userInfo!.user_info.first_name + ' ' + userInfo!.user_info.last_name;
    setName(name);
  });
  return (
    <Container>
      <Name>{name}</Name>
      <Avatar onClick={handleClick}>
        <SupportAgentIcon sx={{ fontSize: 50 }} />
      </Avatar>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  width: 300px;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;
const Name = styled.div`
  min-width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 30px;
  font-weight: 700;
  font-family: 'Open Sans', sans-serif;
  color: ${COLORS.text};
  @media screen and (max-width: 1300px){
    font-size: 23px;
  }
`;
const Avatar = styled.div`
  height: 60px;
  margin-left: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  color: ${COLORS.primary};
  box-shadow: 1px 1px 4px 2px ${COLORS.shadow};
  border-radius: 30px;
  background-color: ${COLORS.white};
  &:hover {
    cursor: pointer;
  }
`;
export default NameAvatar;
