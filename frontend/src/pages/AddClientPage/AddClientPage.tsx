import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Snackbar, Alert } from '@mui/material';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import axios from 'axios';
import { BASE_URL } from '../../constant/Endpoint';
import { Log } from '../../components/common/Logger';
import NavTitle from '../../components/common/NavTitle';
import SearchBar from '../../components/common/SearchBar';
import NameAvatar from '../../components/common/NameAvatar';

function InfoDetailsPage() {
  let navigate = useNavigate();
  let location = useLocation();
  const [clientTitle, setClientTitle] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const [textNotes, setTextNotes] = useState('');
  const [twitterId, setTwitterId] = useState('');
  const [facebookId, setFacebookId] = useState('');
  const [awareId, setAwareId] = useState('');
  const [showSuccessBar, setShowSuccessBar] = useState(false);
  const [showErrorBar, setShowErrorBar] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const handleClientTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setClientTitle(event.target.value);
  };
  const handleFirstName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.target.value);
  };
  const handleLastName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };
  const handleTextNotes = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextNotes(event.target.value);
  };
  const handleTwitterId = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTwitterId(event.target.value);
  };
  const handleFacebookId = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFacebookId(event.target.value);
  };
  const handleAwareId = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAwareId(event.target.value);
  };

  // @ts-ignore
  let clinicianInfo = JSON.parse(sessionStorage.getItem('userInfo'));

  useEffect(() => {
    console.log(location.state);

    if (!clinicianInfo) {
      navigate('/');
    }
  }, []);

  const closeSuccessBar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowSuccessBar(false);
  };

  const closeErrorBar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowErrorBar(false);
  };

  const addClient = () => {
    if (
      clientTitle === '' ||
      firstName === '' ||
      lastName === '' ||
      awareId === '' ||
      dateOfBirth === null
    ) {
      setErrMsg('Please fill out all required fields.');
      setShowErrorBar(true);
      return;
    }
    console.log(clientTitle);
    console.log(firstName);
    console.log(lastName);
    console.log(dateOfBirth!.toISOString().substring(0, 10));
    console.log(textNotes);
    console.log(twitterId);
    console.log(facebookId);
    axios
      .post(
        BASE_URL + '/userServer/AddClient',
        {
          clinicianId: clinicianInfo.user_info.id,
          clientTitle: clientTitle,
          firstName: firstName,
          lastName: lastName,
          dateOfBirth: dateOfBirth!.toISOString().substring(0, 10),
          textNotes: textNotes,
          twitterId: twitterId,
          facebookId: facebookId,
          awareDeviceId: awareId,
        },
        {
          headers: {
            Authorization: `Bearer ${clinicianInfo.access}`,
          },
        }
      )
      .then((response) => {
        Log('Fetched Clients data..', response.data);
        if (response.data === 200) {
          setShowSuccessBar(true);
          setTimeout(() => {
            navigate('/homepage');
          }, 1500);
        } else {
          setShowErrorBar(true);
        }
      })
      .catch((err) => {
        Log(err);
        setErrMsg('Failed to add a client.');
        setShowErrorBar(true);
      });
  };

  const navBack = () => {};

  return (
    <div className='page-container'>
      <div className='page-header' onClick={navBack}>
        <Link style={{ textDecoration: 'none' }} to='/homepage'>
          <NavTitle title='Add a Client' showArrowBack={true} />
        </Link>
        <SearchBar />
        <div className='page-spacer' />
        <NameAvatar />
      </div>
      <div className='add-client-container'>
        <TextField
          required
          value={clientTitle}
          onChange={handleClientTitle}
          margin='dense'
          placeholder='Dr'
          label='Client Title'
          variant='standard'
        />
        <TextField
          required
          value={firstName}
          onChange={handleFirstName}
          placeholder='Simon'
          margin='dense'
          label='First Name'
          variant='standard'
        />
        <TextField
          required
          value={lastName}
          onChange={handleLastName}
          placeholder="D'Alfonso"
          margin='dense'
          label='Last Name'
          variant='standard'
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label='Date of Birth'
            value={dateOfBirth}
            onChange={(newValue: Date | null) => {
              setDateOfBirth(newValue);
            }}
            inputFormat='yyyy-MM-dd'
            renderInput={(params: TextFieldProps) => (
              <TextField required margin='dense' variant='standard' {...params} />
            )}
          />
        </LocalizationProvider>
        <TextField
          value={twitterId}
          onChange={handleTwitterId}
          placeholder='@sjdalf'
          margin='dense'
          label='Twitter ID'
          variant='standard'
        />
        <TextField
          value={facebookId}
          onChange={handleFacebookId}
          placeholder='simon.dalfonso'
          margin='dense'
          label='Facebook ID'
          variant='standard'
        />
        <TextField
          required
          value={awareId}
          onChange={handleAwareId}
          placeholder='cf62dfa9-e22d-426f-b5a6-e4f2d72fc66a'
          margin='dense'
          label='AWARE device ID'
          variant='standard'
        />
        <TextField
          multiline
          rows={5}
          value={textNotes}
          onChange={handleTextNotes}
          margin='dense'
          label='Text Notes'
          variant='standard'
        />
        <div className='add-client-button'>
          <Button fullWidth onClick={addClient} variant='contained' color='info'>
            Add
          </Button>
        </div>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={showSuccessBar}
        onClose={closeSuccessBar}
        autoHideDuration={3000}
      >
        <Alert severity='success'>A client has been successfully added!</Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={showErrorBar}
        onClose={closeErrorBar}
        autoHideDuration={3000}
      >
        <Alert severity='error'>{errMsg}</Alert>
      </Snackbar>
    </div>
  );
}
export default InfoDetailsPage;
