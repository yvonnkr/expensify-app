import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
  <header>
    <h1>Expensify</h1>
    <NavLink to='/' activeClassName='is-active' exact={true}>
      Dashboard
    </NavLink>{' '}
    <span> </span>
    <NavLink to='/create' activeClassName='is-active'>
      Create Expense
    </NavLink>{' '}
    <span> </span>
  </header>
);

export default Header;
