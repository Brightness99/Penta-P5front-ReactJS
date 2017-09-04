// flow
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { OrdersIcon, AddressIcon, MyDataIcon, CardsIcon, ModelsIcon, OutIcon, CloudIcon, PrintiClub } from 'components/Icons';

export class Sidebar extends React.Component {
  render() {
    return (
      <div className="container-sidebarAccount">
        <div className="box-client">
          <img src={require('assets/media/images/imgClient-myaccount.jpg')} alt="Diogo Capelo" />
          <p className="client-name">Diogo Capelo</p>
        </div>
        <hr />
        <ul className="menuAccount">
          <li>
            <NavLink exact={true} activeClassName="is-active" to="/minha-conta/meus-pedidos">
              <i><OrdersIcon /></i>
              <span>Meus pedidos</span>
            </NavLink>
          </li>
          <li>
            <NavLink exact={true} activeClassName="is-active" to="/minha-conta/enderecos">
              <i><AddressIcon /></i>
              <span>Meus endereços</span>
            </NavLink>
          </li>
          <li>
            <NavLink exact={true} activeClassName="is-active" to="/minha-conta/meus-dados">
              <i><MyDataIcon /></i>
              <span>Meus dados</span>
            </NavLink>
          </li>
          <li>
            <NavLink exact={true} activeClassName="is-active" to="/minha-conta/cartoes-salvos">
              <i><CardsIcon /></i>
              <span>Cartões salvos</span>
            </NavLink>
          </li>
          <li>
            <NavLink exact={true} activeClassName="is-active" to="/minha-conta/modelos-salvos">
              <i><ModelsIcon /></i>
              <span>Modelos salvos</span>
            </NavLink>
          </li>
          <li>
            <NavLink exact={true} activeClassName="is-active" to="/minha-conta/cloud">
              <i className="cloudIcon"><CloudIcon /></i>
              <span>Cloud</span>
            </NavLink>
          </li>
          <li>
            <NavLink exact={true} activeClassName="is-active" to="#">
              <i className="printClubIcon"><PrintiClub /></i>
            </NavLink>
          </li>
          <li>
            <NavLink exact={true} activeClassName="is-active" to="#">
              <i><OutIcon /></i>
              <span>Sair</span>
            </NavLink>
          </li>
        </ul>
      </div>
    );
  }
}
export default Sidebar;
