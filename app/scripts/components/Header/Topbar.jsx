// @flow

import React from 'react';
import { Link } from 'react-router-dom';
import { HelpCenterIcon } from 'components/Icons';


const Topbar = () => (
  <div className="app__header__topbar">
    <div className="container">
      <ul>
        <li>
          <Link to="#" className="helpCenterIcon">
            Central de ajuda <HelpCenterIcon />
          </Link>
        </li>
        <li>
          <Link to="#">
            Modelos
          </Link>
        </li>
      </ul>
    </div>
  </div>
);

export default Topbar;
