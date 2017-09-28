// @flow

import React from 'react';
import { NavLink } from 'react-router-dom';

import { PrintiIcon, PrintiSymbolIcon } from 'components/Icons';

type Props = {
  enableLink: boolean,
  small: boolean,
  fill: string,
  onClick: () => {},
};

const LogoLoyalty = (props: Props) => {
  const { enableLink, small } = props;

  const handleClick = (ev) => {
    const { onClick } = props;

    if (typeof onClick === 'function') {
      onClick(ev);
    }
  };

  if (enableLink) {
    return (
      <div className="atm-printi-logo">
        <NavLink to="/" onClick={handleClick}>
          {small ? <PrintiSymbolIcon /> : <PrintiIcon fill={props.fill} />}
          <div className="org-logo-loyalty">
            <p>Club</p>
            <p className="mol-logo-loyalty">Gold</p>
          </div>
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

export default LogoLoyalty;
