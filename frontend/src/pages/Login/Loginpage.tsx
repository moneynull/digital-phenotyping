import { useState, forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import { BASE_URL } from '../../constant/Endpoint';
import { Log } from '../../components/common/Logger';

export default function Loginpage() {
  const [errorMsg, setErrorMsg] = useState('');
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [showLoginLoading, setShowLoginLoading] = useState(false);
  let navigate = useNavigate();

  const toggleShowPwd = () => {
    setShowPwd(!showPwd);
  };
  const changeAccount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccount(e.target.value);
  };
  const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setShowSnackbar(false);
  };

  const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
  });

  const handleSubmit = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === 'Enter') {
      login();
    }
  };

  function login() {
    Log(account);
    Log(password);
    if (account === '' || password === '') {
      setErrorMsg('Please fill out all fields');
      setShowSnackbar(true);
      return;
    }
    setShowLoginLoading(true);
    axios
      .post(BASE_URL + '/login/', {
        username: account,
        password: password,
      })
      .then((response) => {
        Log('Login data..', response.data);
        if (response.data.access !== undefined) {
          setShowLoginLoading(false);
          sessionStorage.setItem('userInfo', JSON.stringify(response.data));
          setPassword('');
          navigate('/homepage');
        }
      })
      .catch((err) => {
        Log(err);
        setShowLoginLoading(false);
        setErrorMsg('Wrong password or email');
        setShowSnackbar(true);
      });
  }

  return (
    <div className='login-main-container'>
      <div className='login-sub-container'>
        <div className='login-welcome'>Welcome to SenPsi</div>
        <div className='login-textinput-container'>
          <EmailIcon sx={{ fontSize: 33 }} />
          <div className='login-text-wrapper'>
            <div className='login-title'>Email</div>
            <input
              className='login-textinput'
              role='account'
              onChange={changeAccount}
              value={account}
            />
          </div>
        </div>
        <div className='login-textinput-container'>
          <KeyIcon sx={{ fontSize: 33 }} />
          <div className='login-text-wrapper'>
            <div className='login-title'>Password</div>
            <input
              className='login-textinput'
              role='password'
              onKeyDown={handleSubmit}
              onChange={changePassword}
              value={password}
              type={showPwd ? '' : 'password'}
            />
          </div>
          {showPwd ? (
            <Visibility className='visibility-btn' onClick={toggleShowPwd} />
          ) : (
            <VisibilityOff className='visibility-btn' onClick={toggleShowPwd} />
          )}
        </div>
        <div className='login-button-container'>
          <LoadingButton
            className='login-button'
            role='login'
            color='info'
            loading={showLoginLoading}
            variant='contained'
            onClick={login}
          >
            Login
          </LoadingButton>
        </div>
      </div>

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={showSnackbar}
        onClose={handleClose}
        autoHideDuration={3000}
      >
        <Alert severity='error'>{errorMsg}</Alert>
      </Snackbar>
    </div>
  );
}
