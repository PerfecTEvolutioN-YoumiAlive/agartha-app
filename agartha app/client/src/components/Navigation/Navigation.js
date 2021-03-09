import React from 'react';

import './Navigation.css';

import { 
          HomeIcon, 
          MessengerIcon, 
          MoreIcon, 
          SearchIcon, 
          UserIcon
        } from '../../helpers/icons/Icons';

function Navigation() {
  return (
    <div className='navigation'>
      <HomeIcon className='icon' />

      <form onSubmit={(e) => e.preventDefault()} className='navigation__search'>
          <SearchIcon className='icon' />
          <input placeholder='Search' type='text' />
          <button type='submit'></button>
      </form>

      <UserIcon className='icon' />
      <MessengerIcon className='icon' />
      <MoreIcon className='icon' />
    </div>
  );
}

export default Navigation;
