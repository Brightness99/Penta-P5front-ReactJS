// @flow

import React from 'react';
import { NavLink } from 'react-router-dom';

import config from 'config'; // eslint-disable-line no-unused-vars

export default class Home extends React.Component {

  render() {
    return (<div>
      <NavLink to="/test">Home Page</NavLink>
    </div>);
  }
}
