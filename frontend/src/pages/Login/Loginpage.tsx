import { useState, useEffect, forwardRef } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Background from '../../assets/loginBackground.png';
import COLORS from '../../constant/Colors';
import { Log } from '../../components/common/Logger';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { LoadingButton } from '@mui/lab';

export default function Loginpage() {
  const [errorMsg, setErrorMsg] = useState('')
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [showLoginLoading, setShowLoginLoading] = useState(false)
  let navigate = useNavigate();

  const toggleShowPwd = () => {
    setShowPwd(!showPwd);
  };
  const changeAccount = (e: any) => {
    setAccount(e.target.value);
  };
  const changePassword = (e: any) => {
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

  const handleSubmit = (evt: any) =>{
    if(evt.key === "Enter"){
      login()
    }
  }

  function login() {
    Log(account);
    Log(password);
    if(account === '' || password === ''){
      setErrorMsg("Please fill out all fields")
      setShowSnackbar(true)
      return
    }
    setShowLoginLoading(true)
    axios
      .post('https://digital-phenotyping.herokuapp.com/login/', {
        username: account,
        password: password,
      })
      .then((response) => {
        Log('Fetched SMS data..', response.data);
        if (response.data.access !== undefined) {
          setShowLoginLoading(false)
          sessionStorage.setItem('userInfo', JSON.stringify(response.data));
          navigate('/homepage');
        }
      })
      .catch((err) => {
        Log(err);
        setShowLoginLoading(false)
        setErrorMsg('Wrong password or email')
        setShowSnackbar(true);
      });
  }

  return (
    <MainContainer>
      <Container>
        <Welcome>Welcome to SenPsi</Welcome>
        <TextInputContainer>
          <EmailIcon sx={{ fontSize: 33 }} />
          <Wrapper>
            <Title>Email</Title>
            <TextInput onChange={changeAccount} value={account} />
          </Wrapper>
        </TextInputContainer>
        <TextInputContainer>
          <KeyIcon sx={{ fontSize: 33 }} />
          <Wrapper>
            <Title>Password</Title>
            <TextInput
              onKeyDown={handleSubmit}
              onChange={changePassword}
              value={password}
              type={showPwd ? '' : 'password'}
            />
          </Wrapper>
          {showPwd ? (
            <VisibilityBtn onClick={toggleShowPwd} />
          ) : (
            <VisibilityOffBtn onClick={toggleShowPwd} />
          )}
        </TextInputContainer>
        <LoginButtonContainer>
          
          <LoginBtn  
            color="info"
            loading={showLoginLoading}
            variant="contained" 
            onClick={login}>Login</LoginBtn>
        </LoginButtonContainer>
       
      </Container>

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={showSnackbar}
        onClose={handleClose}
        autoHideDuration={3000}
      >
        <Alert severity='error'>{errorMsg}</Alert>
      </Snackbar>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  color: black;
  font-size: 32px;
  background-image: url(${Background});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;
const Container = styled.div`
  background-color: ${COLORS.white};
  border-radius: 20px;
  position: absolute;
  height: 300px;
  width: 400px;
  right: 4vw;
  top: 0;
  bottom: 0;
  margin: auto;
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-shadow: 2px 2px 15px 1px ${COLORS.shadow};
`;
const Welcome = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
`;
const TextInputContainer = styled.div`
  margin-top: 30px;
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 10px;
  height: 60px;
  background-color: ${COLORS.text_field};
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-left: 12px;
`;
const Title = styled.div`
  color: ${COLORS.text_light_grey};
  font-size: 18px;
`;
const TextInput = styled.input`
  border: 0px;
  font-size: 20px;
  border-bottom: 1px solid ${COLORS.text_light_grey};
  background-color: transparent;
  &:focus {
    outline: none;
    border-bottom: 1px solid ${COLORS.primary};
  }
`;
const LoginButtonContainer = styled.div`
  margin: 20px auto;
  width: 100px;
  
`;
const LoginBtn = styled(LoadingButton)`
  color: ${COLORS.white};
  background-color: '${COLORS.login_btn}';
`
const VisibilityBtn = styled(Visibility)`
  &:hover {
    cursor: pointer;
  }
`;
const VisibilityOffBtn = styled(VisibilityOff)`
  &:hover {
    cursor: pointer;
  }
`;
