// @flow

import React from 'react';
import { NavLink } from 'react-router-dom';

import { PrintiIcon, PrintiSymbolIcon } from 'components/Icons';

type Props = {
  enableLink: boolean,
  small: boolean,
  fill: string,
};

const Logo = (props: Props) => {
  const { enableLink, small } = props;

  if (enableLink) {
    return (
      <div className="atm-printi-logo">
        <NavLink to="/">
          {small ? <PrintiSymbolIcon /> : <PrintiIcon fill={props.fill} />}
        </NavLink>
      </div>
    );
  }

  return (
    <div className="atm-printi-logo">
      {small ? <PrintiSymbolIcon /> : <PrintiIcon fill={props.fill} />}
    </div>
  );
};

export default Logo;
