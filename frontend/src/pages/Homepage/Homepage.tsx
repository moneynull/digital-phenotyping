import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import logo from '../../../src/assets/senpsi_logo.png';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Button, { ButtonProps } from '@mui/material/Button';
import NavTitle from '../../components/common/NavTitle';
import NameAvatar from '../../components/common/NameAvatar';
import SearchBar from '../../components/common/SearchBar';
import MUIDataTable from 'mui-datatables';
import InfoSumCard from '../../components/common/InfoSumCard';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import COLORS from '../../constant/Colors';
import axios from 'axios';
import { BASE_URL } from '../../constant/Endpoint';
import { Log } from '../../components/common/Logger';

interface iResData {
  age: number;
  aware_device_id: string;
  client_title: string;
  date_of_birth: string;
  facebook_id: string;
  first_name: string;
  last_name: string;
  last_update: string;
  status: string;
  text_notes: string;
  twitter_id: string;
  uid: number;
}

const muiCache = createCache({
  key: 'mui-datatables',
  prepend: true,
});

export default function Homepage() {
  let navigate = useNavigate();
  const [clientData, setClientData] = useState<any[]>([]);
  const [rawData, setRawData] = useState<any[]>([]);

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
    let clientsList: any[] = [];
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
        tempRawData.forEach((item: iResData) => {
          let temp: any[] = [];
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
        customHeadLabelRender: () => <TableHeader>Name</TableHeader>,
      },
    },
    {
      name: 'Title',
      options: {
        customHeadLabelRender: () => <TableHeader>Title</TableHeader>,
      },
    },
    {
      name: 'Age',
      options: {
        customHeadLabelRender: () => <TableHeader>Age</TableHeader>,
      },
    },
    {
      name: 'Status',
      options: {
        customHeadLabelRender: () => <TableHeader>Status</TableHeader>,
      },
    },
    {
      name: 'Last update',
      options: {
        customHeadLabelRender: () => <TableHeader>Last update</TableHeader>,
      },
    },
    {
      name: 'Action',
      options: {
        filter: false,
        sort: false,
        empty: true,
        customHeadLabelRender: () => <TableHeader>Action</TableHeader>,
        customBodyRenderLite: (dataIndex: any, rowIndex: any) => {
          return (
            <ViewBtn
              variant='contained'
              onClick={() =>
                navigate('/infodetailspage', { state: { clientInfo: rawData[dataIndex] } })
              }
            >
              View
            </ViewBtn>
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
    <MainContainer>
      <Header>
        <Logo src={logo} alt='logo' />
        <Spacer />
        <NavTitle title='Client Management' showArrowBack={false} />
        <SearchBar />
        <Spacer />
        <NameAvatar />
      </Header>
      <SubInfoContainer>
        <InfoSumCard
          title={'Total Clients'}
          type='totalClients'
          content={`${clientData.length} clients`}
        />
        <InfoSumCard title={'AWARE Sensors'} type='AWARESensors' />
        <InfoSumCard title={'Social Media Apps'} type='socialApps' />
      </SubInfoContainer>
      <CacheProvider value={muiCache}>
        <TableContainer>
          <MUIDataTable
            title={'Clients'}
            data={clientData}
            columns={columns}
            options={{
              selectableRows: 'none',
              customToolbar: () => <HeaderElements />,
            }}
          />
        </TableContainer>
      </CacheProvider>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  color: black;
  font-size: 32px;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-bottom: 50px;
`;
const TableHeader = styled.div`
  font-weight: bolder;
`;
const Header = styled.div`
  width: 80vw;

  height: 100px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const Logo = styled.img`
  height: 60px;
`;
const Spacer = styled.div`
  height: 20px;
  width: 18px;
`;
const SubInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 1000px;
  margin-bottom: 40px;
`;
const TableContainer = styled.div`
  width: 1000px;
`;
const ViewBtn = styled(Button)`
  color: ${COLORS.white};
  background-color: ${COLORS.light_purple};
  &:hover {
    background-color: ${COLORS.primary};
  }
`;
