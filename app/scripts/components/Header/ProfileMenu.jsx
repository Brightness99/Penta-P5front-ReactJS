//@flow

import React from 'react';
import SVG from 'react-inlinesvg';
import { NavLink } from 'react-router-dom';

import { Arrow } from 'components/Icons';
import LogoutIcon from './LogoutIcon';

export class ProfileMenu extends React.Component {
  render() {
    return (
      <div className="container-submenu profileMenu">
        <nav className="bgLogout notLogged">
          <ul className="list-item awol-pdd awol-list-style">
            <li><Arrow /><span>Entrar</span></li>
            <li><Arrow /><span>Cadastrar</span></li>
          </ul>
        </nav>
      </div>
    );
  }
}
// Logged
/* <nav className="bgLogout logged">
  <ul className="list-item awol-pdd awol-list-style">
  <li>Meus pedidos</li>
  <li>Meus endereços</li>
  <li>Promocionais</li>
  <li>Meus dados</li>
  <li>Dados de cobrança</li>
  <li>Modelos salvos</li>
</ul>
<hr className="hrLogout" />
<p className="box-logout">
  <LogoutIcon /> Sair
</p>
</nav>*/

export default ProfileMenu;
