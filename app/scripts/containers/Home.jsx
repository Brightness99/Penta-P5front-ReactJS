// @flow

import React from 'react';
import { NavLink } from 'react-router-dom';

import config from 'config'; // eslint-disable-line no-unused-vars

export default class Home extends React.Component {

  render() {
    return (<div>
      <NavLink to="/configuracao-catalogo">Home Page</NavLink>
      <br />
      <NavLink to="/produtos-banner">Produto Banner</NavLink>
    </div>);
  }
}
