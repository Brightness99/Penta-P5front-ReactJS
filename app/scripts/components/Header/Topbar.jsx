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

  const renderReferral = () => (
    <NavLink className="atm-topbar-link atm-topbar-referral" to="/indique-a-printi">
      {locale.REFERRAL} <HeartIcon />
    </NavLink>
  );

  const renderModels = () => (
    <div className="mol-topbar-models">
      <button onMouseOver={handleAction} className="atm-topbar-link">
        {locale.MODELS} <AngleDownIcon />
      </button>
      <Models />
    </div>
  );

  const renderPhone = () => (
    <NavLink className="atm-topbar-link atm-topbar-us-phone" to="/contact?action=search&value=meu-pedido">
      Call us toll-free: (888) 886-2575
    </NavLink>
  );

  return (
    <div className="org-topbar">
      <div className="container">
        {locale.COUNTRY_CODE === 'US' && renderPhone()}
        <div className="mol-topbar-locales">
          <button onMouseOver={handleAction} className="atm-topbar-link">
            <FlagIcon countryCode={locale.COUNTRY_CODE} /> {locale.COUNTRY}
          </button>
          <Locales currentCountry={locale.COUNTRY_CODE} />
        </div>
        {locale.COUNTRY_CODE === 'BR' && renderReferral()}
        {locale.COUNTRY_CODE === 'BR' && renderModels()}
        <NavLink to="central-de-ajuda?action=search&value=meu-pedido" className="atm-topbar-link ">
          {locale.HELP_CENTER} <HelpCircleIcon />
        </NavLink>
      </div>
    </div>
  );
};

export default Topbar;
