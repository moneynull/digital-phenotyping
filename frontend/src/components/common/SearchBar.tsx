import { useState } from 'react';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { Log } from './Logger';

import IconButton from '@mui/material/IconButton';
function SearchBar() {
  const [searchText, setSearchText] = useState('');
  const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      Log('enter pressed');
      submitSearch();
    }
  };
  const submitSearch = () => {
    Log(searchText);
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  return (
    <div className='search-bar-container'>
      <IconButton onClick={submitSearch}>
        <SearchRoundedIcon className='search-icon' />
      </IconButton>
      <input
        className='search-input'
        onChange={onChange}
        value={searchText}
        onKeyDown={onEnter}
        type={'text'}
      />
    </div>
  );
}
export default SearchBar;
