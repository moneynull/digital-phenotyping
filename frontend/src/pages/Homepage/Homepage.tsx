import { useEffect, useState } from 'react';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import MUIDataTable from 'mui-datatables';
import logo from '../../../src/assets/senpsi_logo.png';
import NavTitle from '../../components/common/NavTitle';
import NameAvatar from '../../components/common/NameAvatar';
import SearchBar from '../../components/common/SearchBar';
import InfoSumCard from '../../components/common/InfoSumCard';
import { BASE_URL } from '../../constant/Endpoint';
import { Log } from '../../components/common/Logger';

const muiCache = createCache({
  key: 'mui-datatables',
  prepend: true,
});

export default function Homepage() {
  let navigate = useNavigate();
  const [clientData, setClientData] = useState<(string | number)[][]>([]);
  const [rawData, setRawData] = useState<(string | number)[][]>([]);

  let userInfo = sessionStorage.getItem('userInfo');

  useEffect(() => {
    if (!userInfo) {
      navigate('/');
      return;
    }
    fetchClientList();
  }, []);

  const fetchClientList = () => {
    let clinicianId = JSON.parse(userInfo!).user_info.id;
    let token = JSON.parse(userInfo!).access;
    let clientsList: (string | number)[][] = [];
    axios
      .post(
        BASE_URL + '/userServer/ClientInfoList',
        {
          id: clinicianId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        Log('Fetched Clients data..', response.data);
        let tempRawData = response.data;
        setRawData(tempRawData);
        tempRawData.forEach((item: iUserInfo) => {
          let temp: (string | number)[] = [];
          temp.push(item.first_name + ' ' + item.last_name);
          temp.push(item.client_title);
          temp.push(item.age);
          temp.push(item.status);
          temp.push(item.last_update.substring(0, 10));
          temp.push(item.uid);
          clientsList.push(temp);
        });
        setClientData(clientsList);
      })
      .catch((err) => {
        Log(err);
      });
  };

  const columns = [
    {
      name: 'Name',
      options: {
        customHeadLabelRender: () => <div className='bolder-text'>Name</div>,
      },
    },
    {
      name: 'Title',
      options: {
        customHeadLabelRender: () => <div className='bolder-text'>Title</div>,
      },
    },
    {
      name: 'Age',
      options: {
        customHeadLabelRender: () => <div className='bolder-text'>Age</div>,
      },
    },
    {
      name: 'Status',
      options: {
        customHeadLabelRender: () => <div className='bolder-text'>Status</div>,
      },
    },
    {
      name: 'Last update',
      options: {
        customHeadLabelRender: () => <div className='bolder-text'>Last update</div>,
      },
    },
    {
      name: 'Action',
      options: {
        filter: false,
        sort: false,
        empty: true,
        customHeadLabelRender: () => <div className='bolder-text'>Action</div>,
        customBodyRenderLite: (dataIndex: number, rowIndex: number) => {
          return (
            <Button
              className='view-button'
              variant='contained'
              onClick={() =>
                navigate('/infodetailspage', { state: { clientInfo: rawData[dataIndex] } })
              }
            >
              View
            </Button>
          );
        },
      },
    },
  ];
  const addClient = () => {
    navigate('/addclientpage');
  };
  const HeaderElements = () => {
    return (
      <Button onClick={addClient} variant='contained' color='info'>
        Add Client
      </Button>
    );
  };
  return (
    <div className='homepage-main-container'>
      <div className='page-header space-between-header'>
        <img className='logo-img' src={logo} alt='logo' />
        <div className='homepage-spacer' />
        <NavTitle title='Client Management' showArrowBack={false} />
        <SearchBar />
        <div className='homepage-spacer' />
        <NameAvatar />
      </div>
      <div className='homepage-sub-container'>
        <InfoSumCard
          title={'Total Clients'}
          type='totalClients'
          content={`${clientData.length} clients`}
        />
        <InfoSumCard title={'AWARE Sensors'} type='AWARESensors' />
        <InfoSumCard title={'Social Media Apps'} type='socialApps' />
      </div>
      <CacheProvider value={muiCache}>
        <div className='table-container'>
          <MUIDataTable
            title={'Clients'}
            data={clientData}
            columns={columns}
            options={{
              selectableRows: 'none',
              customToolbar: () => <HeaderElements />,
            }}
          />
        </div>
      </CacheProvider>
    </div>
  );
}
