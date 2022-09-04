import React, { useState } from 'react';
import styled from 'styled-components';
import COLORS from '../../constant/Colors';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { Log } from './Logger';

import IconButton from '@mui/material/IconButton';
function SearchBar() {
  const [searchText, setSearchText] = useState('');
  const onEnter = (e: any) => {
    if (e.key === 'Enter') {
      Log('enter pressed');
      submitSearch();
    }
  };
  const submitSearch = () => {
    Log(searchText);
  };
  const onChange = (e: any) => {
    setSearchText(e.target.value);
  };
  return (
    <Container>
      <IconButton onClick={submitSearch}>
        <SearchIcon />
      </IconButton>
      <SearchInput onChange={onChange} value={searchText} onKeyDown={onEnter} type={'text'} />
    </Container>
  );
}
const Container = styled.div`
  width: 300px;
  min-width: 260px;
  height: 38px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 10px;
  padding-left: 10px;
  border-radius: 10px;
  background-color: ${COLORS.white};
  box-shadow: 2px 2px 15px 1px ${COLORS.shadow};
`;
const SearchIcon = styled(SearchRoundedIcon)`
  color: ${COLORS.light_grey};
`;
const SearchInput = styled.input`
  border: 0px;
  height: 30px;
  color: ${COLORS.text};
  width: 80%;
  font-size: 15px;
  font-family: 'Open Sans', sans-serif;
  &:focus {
    outline: none;
    border: 0px;
    border-color: 'red';
  }
`;
export default SearchBar;
