// @flow

import React from 'react';
import { NavLink } from 'react-router-dom';

class ContentAlphanetList extends React.Component {
  render() {
    return (
      <div className="org-content-alphabet-list">
        <p className="title-content-list">Aa</p>
        <div className="mol-content-list">
          <ul className="atm-list-link">
            <li>
              <NavLink to="#">
              Alorem ipsum dolor sit amet
              </NavLink>
            </li>
            <li>
              <NavLink to="#">
                Alorem ipsum dolor sit amet
              </NavLink>
            </li>
            <li>
              <NavLink to="#">
                Alorem ipsum dolor sit amet
              </NavLink>
            </li>
            <li>
              <NavLink to="#">
              Alorem ipsum dolor sit amet
              </NavLink>
            </li>
          </ul>
          <ul className="atm-list-link">
            <li>
              <NavLink to="#">
              Alorem ipsum dolor sit amet
              </NavLink>
            </li>
            <li>
              <NavLink to="#">
              Alorem ipsum dolor sit amet
              </NavLink>
            </li>
            <li>
              <NavLink to="#">
              Alorem ipsum dolor sit amet
              </NavLink>
            </li>
            <li>
              <NavLink to="#">
              Alorem ipsum dolor sit amet
              </NavLink>
            </li>
          </ul>
          <ul className="atm-list-link">
            <li>
              <NavLink to="#">
              Alorem ipsum dolor sit amet
              </NavLink>
            </li>
            <li>
              <NavLink to="#">
              Alorem ipsum dolor sit amet
              </NavLink>
            </li>
            <li>
              <NavLink to="#">
              Alorem ipsum dolor sit amet
              </NavLink>
            </li>
            <li>
              <NavLink to="#">
              Alorem ipsum dolor sit amet
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default ContentAlphanetList;
