import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import NavTitle from '../../components/common/NavTitle';
import SearchBar from '../../components/common/SearchBar';
import NameAvatar from '../../components/common/NameAvatar';
import COLORS from '../../constant/Colors';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import axios from 'axios';
import URL from '../../constant/Endpoint';
import { Log } from '../../components/common/Logger';
import {
  Snackbar,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

function UpdateInfo(props: any) {
  let navigate = useNavigate();
  const [initialTwitter, setInitialTwitter] = useState(props.clientInfo.twitter_id);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedType, setSelectedType] = useState('Update');
  const [confirmMsg, setConfirmMsg] = useState('');
  const [clientTitle, setClientTitle] = useState(props.clientInfo.client_title);
  const [firstName, setFirstName] = useState(props.clientInfo.first_name);
  const [lastName, setLastName] = useState(props.clientInfo.last_name);
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(props.clientInfo.date_of_birth);
  const [textNotes, setTextNotes] = useState(
    props.clientInfo.text_notes ? props.clientInfo.text_notes : ''
  );
  const [twitterId, setTwitterId] = useState(
    props.clientInfo.twitter_id ? props.clientInfo.twitter_id : ''
  );
  const [facebookId, setFacebookId] = useState(
    props.clientInfo.facebook_id ? props.clientInfo.facebook_id : ''
  );
  const [awareId, setAwareId] = useState(props.clientInfo.aware_device_id);
  const [showSuccessBar, setShowSuccessBar] = useState(false);
  const [showErrorBar, setShowErrorBar] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  useEffect(() => {
    console.log(props.clientInfo);
  }, []);
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
  const handleConfirm = () => {
    if (selectedType === 'Update') {
      updateClient();
    } else {
      deleteClient();
    }
  };
  const deleteClient = () => {
    axios
      .post(
        URL.BASE_URL + '/userServer/DeleteClient',
        {
          uid: props.clientInfo.uid,
        },
        {
          headers: {
            Authorization: `Bearer ${clinicianInfo!.access}`,
          },
        }
      )
      .then((response) => {
        console.log('Delete client res..', response.data);
        if (response.data === 200) {
          setShowConfirmModal(false);
          setShowSuccessBar(true);
          setTimeout(() => {
            navigate('/homepage');
          }, 1500);
        } else {
          setShowErrorBar(true);
        }
      });
  };
  const updateClient = () => {
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
    console.log(new Date(dateOfBirth).toISOString().substring(0, 10));
    console.log(textNotes);
    console.log(twitterId);
    console.log(initialTwitter === twitterId ? false : true);
    console.log(facebookId);

    axios
      .post(
        URL.BASE_URL + '/userServer/UpdateClientProfile',
        {
          uid: props.clientInfo.uid,
          clinicianId: clinicianInfo.user_info.id,
          clientTitle: clientTitle,
          firstName: firstName,
          lastName: lastName,
          dateOfBirth: new Date(dateOfBirth).toISOString().substring(0, 10),
          textNotes: textNotes,
          twitterId: twitterId,
          facebookId: facebookId,
          awareDeviceId: awareId,
          hasTwitterIdChanged: initialTwitter === twitterId ? false : true,
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
  const handleClickOpen = (type: string) => {
    switch (type) {
      case 'Update':
        setConfirmMsg(`update this client's information?`);
        break;
      case 'Delete':
        setConfirmMsg(`delete this client?`);
        break;
      default:
        setConfirmMsg('do this action?');
        break;
    }
    setSelectedType(type);
    setShowConfirmModal(true);
  };

  const handleClose = () => {
    setShowConfirmModal(false);
  };
  return (
    <Container>
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
          renderInput={(params: any) => (
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
      <BtnContainer>
        <Button onClick={() => handleClickOpen('Delete')} variant='contained' color='error'>
          Delete
        </Button>
        <Button onClick={() => handleClickOpen('Update')} variant='contained' color='info'>
          Update
        </Button>
      </BtnContainer>

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={showSuccessBar}
        onClose={closeSuccessBar}
        autoHideDuration={3000}
      >
        <Alert severity='success'>{selectedType}d successfully!</Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={showErrorBar}
        onClose={closeErrorBar}
        autoHideDuration={3000}
      >
        <Alert severity='error'>Failed to {selectedType}</Alert>
      </Snackbar>
      <Dialog
        open={showConfirmModal}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{`Confirm to ${confirmMsg}`}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirm} variant='contained'>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const CardContainer = styled.div`
  background-color: ${COLORS.white};
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 2px 15px 1px ${COLORS.shadow};
  width: 500px;
  padding: 30px;
  margin: 20px;
`;
const Header = styled.div`
  width: 80vw;
  height: 100px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Spacer = styled.div`
  height: 20px;
  width: 30%;
`;
const BtnContainer = styled.div`
  width: 220px;
  margin: 20px auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export default UpdateInfo;
