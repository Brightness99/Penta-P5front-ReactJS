// @flow

import React from 'react';
import { NavLink } from 'react-router-dom';
import { HeartIcon, HelpCircleIcon, AngleDownIcon } from 'components/Icons';
import Models from './_Models';

const Topbar = () => (
  <div className="org-topbar">
    <div className="container">
      <NavLink className="atm-topbar-link atm-topbar-referral" to="/indique-a-printi">
        Indique a Printi <HeartIcon />
      </NavLink>
      <div className="mol-topbar-models">
        <button className="atm-topbar-link">
          Modelos <AngleDownIcon />
        </button>
        <Models />
      </div>
      <NavLink to="central-de-ajuda?action=search&value=meu-pedido" className="atm-topbar-link ">
        Central de ajuda <HelpCircleIcon />
      </NavLink>
    </div>
  </div>
);

export default Topbar;
