import React from 'react';
import { useState, useEffect } from 'react';

import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import CardContainer from '../../components/CardContainer';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';
import IconButton from '@mui/material/IconButton';

import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Background from '../../assets/loginBackground.png';
import Paper from '@mui/material/Paper';
import COLORS from '../../constant/Colors';
import logo from '../../assets/senpsi_logo.png';

interface State {
  amount: string;
  password: string;
  weight: string;
  weightRange: string;
  showPassword: boolean;
}

const styles = {
  paperContainer: {
    backgroundImage: `url(${Background})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '100vw',
    height: '100vh',
  },
};

export default function Loginpage() {
  const [values, setValues] = React.useState<State>({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <MainContainer>
      <Paper style={styles.paperContainer}>
        <Box sx={{ ml: 150, mt: 40 }}>
          <Container>
            <Box sx={{ px: 2, py: 1 }}>
              <Box sx={{ fontSize: 'h4.fontSize', fontWeight: 'bold' }}>
                Welcome to
                <img src={logo} width={152} height={63} alt='senpsi logo' />
              </Box>

              <Box
                component='form'
                sx={{ '& .MuiTextField-root': { m: 1, width: '20ch' } }}
                noValidate
                autoComplete='off'
              >
                <div>
                  <TextField
                    id='filled-required'
                    label='Email: '
                    variant='filled'
                    sx={{ m: 1 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <EmailIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <br></br>
                  <FormControl
                    sx={{ m: 1, width: '20ch' }}
                    variant='outlined'
                    style={{ background: '#d6d6fc' }}
                  >
                    <InputLabel htmlFor='outlined-adornment-password'>
                      <KeyIcon /> Password:
                    </InputLabel>
                    <OutlinedInput
                      id='outlined-adornment-password'
                      type={values.showPassword ? 'text' : 'password'}
                      value={values.password}
                      onChange={handleChange('password')}
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            aria-label='toggle password visibility'
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge='end'
                          >
                            {values.showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label='Password'
                    />
                  </FormControl>
                </div>
              </Box>

              <Box sx={{ mx: 20, my: 'auto' }}>
                <Link to='/homepage'>
                  <Button variant='contained'>Login</Button>
                </Link>
              </Box>
            </Box>
          </Container>
        </Box>
      </Paper>
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
const Container = styled.div`
  background-color: ${COLORS.white};
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 2px 15px 1px ${COLORS.shadow};
  width: 400px;
  padding: 30px;
  margin: 20px;
`;
