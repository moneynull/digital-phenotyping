import { useEffect, useState } from 'react';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

function NameAvatar() {
  let navigate = useNavigate();
  const [name, setName] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.FormEvent<HTMLInputElement>) => {
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
    } else {
      return;
    }
    //@ts-ignore
    let name = userInfo!.user_info.first_name + ' ' + userInfo!.user_info.last_name;
    setName(name);
  });
  return (
    <div className='name-avatar-container'>
      <div className='name-avatar-text'>{name}</div>
      <div className='name-avatar-img' onClick={() => handleClick}>
        <SupportAgentIcon sx={{ fontSize: 50 }} />
      </div>
      <Menu
        role='avatar'
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem role='logout' onClick={logout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
}
export default NameAvatar;
