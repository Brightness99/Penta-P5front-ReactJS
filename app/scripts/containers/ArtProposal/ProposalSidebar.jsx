// flow
import React from 'react';
import { NavLink } from 'react-router-dom';

export class ProposalSidebar extends React.Component {
  render() {
    return (
      <div className="container-sidebarproposal">

        <ul className="menu-proposal">
          <li>
            <NavLink exact={true} activeClassName="is-active" to="/proposta-de-arte/a">
              <span>PROPOSTA3</span>
            </NavLink>
          </li>
          <li>
            <NavLink exact={true} activeClassName="is-active" to="/proposta-de-arte/2">
              <span>PROPOSTA2</span>
            </NavLink>
          </li>
          <li>
            <NavLink exact={true} activeClassName="is-active" to="/proposta-de-arte/1">
              <span>PROPOSTA1</span>
            </NavLink>
          </li>
          <li>
            <NavLink exact={true} activeClassName="is-active" to="/proposta-de-arte/0">
              <span>BRIEFING INICIAL</span>
            </NavLink>
          </li>
        </ul>
      </div>
    );
  }
}
export default ProposalSidebar;
