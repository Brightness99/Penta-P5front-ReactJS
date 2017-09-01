// @flow

import React from 'react';
import { NavLink } from 'react-router-dom';
import { isMobile, shouldComponentUpdate } from 'utils/helpers';
import { AngleDownIcon, OrdersIcon, AddressIcon, MyDataIcon, CardsIcon, ModelsIcon, OutIcon } from 'components/Icons';

type Props = {
  screenSize: string,
};

type State = {
};

export default class MyAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  shouldComponentUpdate = shouldComponentUpdate;

  static props: Props;

  static state: State;

  renderLoggedOut() {
    return [
      <li key="login">
        <NavLink to="/login">
          <AngleDownIcon style={{ transform: 'rotate(270deg)' }} /> Entrar
        </NavLink>
      </li>,
      <li key="register">
        <NavLink to="/cadastro">
          <AngleDownIcon /> Cadastrar
        </NavLink>
      </li>,
    ];
  }

  renderLoggedIn() {
    return [
      <li key="pedidos">
        <NavLink to="/minha-conta/pedidos">
          <OrdersIcon /> Meus Pedidos
        </NavLink>
      </li>,
      <li key="enderecos">
        <NavLink to="/minha-conta/enderecos">
          <AddressIcon /> Meus endereços
        </NavLink>
      </li>,
      <li key="cartoes-salvos">
        <NavLink to="/minha-conta/cartoes-salvos">
          <CardsIcon /> Cartões salvos
        </NavLink>
      </li>,
      <li key="modelos-salvos">
        <NavLink to="/minha-conta/modelos-salvos">
          <ModelsIcon /> Modelos salvos
        </NavLink>
      </li>,
      <li key="cloud">
        <NavLink to="/minha-conta/cloud">
          <ModelsIcon /> Cloud
        </NavLink>
      </li>,
      <li key="logout">
        <NavLink to="#">
          <OutIcon /> Sair
        </NavLink>
      </li>
    ];
  }

  renderMobile() {
    return null;
  }

  renderDesktop() {
    return (
      <ul className="mol-header-account">
        {this.renderLoggedIn()}
      </ul>
    );
  }

  render() {
    const { screenSize } = this.props;

    return isMobile(screenSize) ? this.renderMobile() : this.renderDesktop();
  }
}
