// @flow

import React from 'react';
import { NavLink } from 'react-router-dom';
import { HeartIcon, HelpCircleIcon, AngleDownIcon } from 'components/Icons';
import FlagIcon from 'components/Flags';
import Locales from './Locales';
import Models from './Models';

type Props = {
  locale: {},
  handleClose: () => {},
};

const Topbar = (props: Props) => {
  const { locale } = props;

  const handleAction = (ev) => {
    const { handleClose } = props;

    if (typeof handleClose === 'function') {
      handleClose(ev);
    }
  };

  return (
    <div className="org-topbar">
      <div className="container">
        <div className="mol-topbar-locales">
          <button onMouseOver={handleAction} className="atm-topbar-link">
            <FlagIcon countryCode={locale.COUNTRY_CODE} /> {locale.COUNTRY}
          </button>
          <Locales currentCountry={locale.COUNTRY_CODE} />
        </div>
        <NavLink className="atm-topbar-link atm-topbar-referral" to="/indique-a-printi">
          {locale.REFERRAL} <HeartIcon />
        </NavLink>
        <div className="mol-topbar-models">
          <button onMouseOver={handleAction} className="atm-topbar-link">
            {locale.TEMPLATES} <AngleDownIcon />
          </button>
          <Models />
        </div>
        <NavLink to="central-de-ajuda?action=search&value=meu-pedido" className="atm-topbar-link ">
          {locale.HELP_CENTER} <HelpCircleIcon />
        </NavLink>
      </div>
    </div>
  );
};

export default Topbar;
