// @flow

import React from 'react';
import SVG from 'react-inlinesvg';
import { NavLink } from 'react-router-dom';

type Props = {
  enableLink: boolean,
}

const Logo = (props: Props) => {
  if (props.enableLink) {
    return (
      <NavLink to="/">
        <SVG src={require('assets/media/svg/logo.svg')} />
      </NavLink>
    );
  }

  return <SVG src={require('assets/media/svg/logo.svg')} />;
};

export default Logo;
