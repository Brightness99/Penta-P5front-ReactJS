import React from 'react';
import { NavLink } from 'react-router-dom';

export default class Home extends React.Component {

  render() {
    return (<div>
      <NavLink to="/test">Home Page</NavLink>
    </div>);
  }
}
