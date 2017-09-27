// flow
import React from 'react';
import { NavLink } from 'react-router-dom';

export class Sidebar extends React.Component {
  render() {
    return (
      <div className="container-sidebarproposal">

        <ul className="menu-proposal">
          <li>
            <NavLink exact={true} activeClassName="is-active" to="#">
              <span>PROPOSTA 3</span>
            </NavLink>
          </li>
          <li>
            <NavLink exact={true} activeClassName="is-active" to="#">
              <span>PROPOSTA 2</span>
            </NavLink>
          </li>
          <li>
            <NavLink exact={true} activeClassName="is-active" to="#">
              <span>PROPOSTA 1</span>
            </NavLink>
          </li>
          <li>
            <NavLink exact={true} activeClassName="is-active" to="#">
              <span>BRIEFING INICIAL</span>
            </NavLink>
          </li>
        </ul>
      </div>
    );
  }
}
export default Sidebar;
