// @flow

import React from 'react';
import { NavLink } from 'react-router-dom';

import { PrintiIcon, PrintiSymbolIcon } from 'components/Icons';

type Props = {
  enableLink: boolean,
  small: boolean,
};

const Logo = (props: Props) => {
  const { enableLink, small } = props;

  if (enableLink) {
    return (
      <div className="atm-printi-logo">
        <NavLink to="/">
          {small ? <PrintiSymbolIcon /> : <PrintiIcon />}
        </NavLink>
      </div>
    );
  }

  return (
    <div className="atm-printi-logo">
      {small ? <PrintiSymbolIcon /> : <PrintiIcon />}
    </div>
  );
};

export default Logo;
