// @flow

import React from 'react';
import SVG from 'react-inlinesvg';
import { Link } from 'react-router-dom';

const Logo = () => (
  <Link to="/">
    <SVG src={require('assets/media/svg/logo.svg')} />
  </Link>
);

export default Logo;
