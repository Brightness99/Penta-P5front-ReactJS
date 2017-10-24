// @flow

import React from 'react';
import { NavLink } from 'react-router-dom';
import { PrintiIcon, PrintiSymbolIcon } from 'components/Icons';
import LogoLoyalty from 'components/LogoLoyalty';

type Props = {
  enableLink: boolean,
  short: boolean,
  showLoyalty: boolean,
  invertLoyalty: boolean,
  fill: string,
  onClick: () => {},
};

const Logo = (props: Props) => {
  const { enableLink, short, showLoyalty, invertLoyalty } = props;

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
          {short ? <PrintiSymbolIcon key="PrintiSymbolIcon" /> : <PrintiIcon fill={props.fill} key="PrintiIcon" />}
          {showLoyalty && <LogoLoyalty short={short} invert={invertLoyalty} onClick={handleClick} key="LogoLoyalty" />}
        </NavLink>
      </div>
    );
  }

  return (
    <div className="atm-printi-logo">
      {short ? <PrintiSymbolIcon key="PrintiSymbolIcon" /> : <PrintiIcon fill={props.fill} key="PrintiIcon" />}
      {showLoyalty && <LogoLoyalty short={short} invert={invertLoyalty} onClick={handleClick} key="LogoLoyalty" />}
    </div>
  );
};

Logo.defaultProps = {
  showLoyalty: false,
  enableLink: true,
  short: false,
  invertLoyalty: false,
};

export default Logo;
