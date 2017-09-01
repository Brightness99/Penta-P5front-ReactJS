// @flow

import React from 'react';
import { NavLink } from 'react-router-dom';
import { TransitionGroup } from 'react-transition-group';
import { isMobile, shouldComponentUpdate } from 'utils/helpers';
import { AngleDownIcon, OrdersIcon, AddressIcon, CardsIcon, ModelsIcon, OutIcon, MyAccountIcon, TimesIcon } from 'components/Icons';
import { FadeToggle, SlideToggle } from 'animations';
import Overlay from 'components/Overlay';

type Props = {
  screenSize: string,
  isHidden: string,
  handleClose: () => {},
};

export default class MyAccount extends React.Component {
  shouldComponentUpdate = shouldComponentUpdate;

  static props: Props;

  handleClick = (ev) => {
    const { handleClose } = this.props;

    if (typeof handleClose === 'function') {
      handleClose(ev);
    }
  };

  renderLoggedOut() {
    return [
      <li key="login">
        <NavLink onClick={this.handleClick} to="/login">
          <AngleDownIcon style={{ transform: 'rotate(270deg)' }} /> Entrar
        </NavLink>
      </li>,
      <li key="register">
        <NavLink onClick={this.handleClick} to="/cadastro">
          <AngleDownIcon /> Cadastrar
        </NavLink>
      </li>,
    ];
  }

  renderLoggedIn() {
    return [
      <li key="pedidos">
        <NavLink onClick={this.handleClick} to="/minha-conta/pedidos">
          <OrdersIcon /> Meus Pedidos
        </NavLink>
      </li>,
      <li key="enderecos">
        <NavLink onClick={this.handleClick} to="/minha-conta/enderecos">
          <AddressIcon /> Meus endereços
        </NavLink>
      </li>,
      <li key="cartoes-salvos">
        <NavLink onClick={this.handleClick} to="/minha-conta/cartoes-salvos">
          <CardsIcon /> Cartões salvos
        </NavLink>
      </li>,
      <li key="modelos-salvos">
        <NavLink onClick={this.handleClick} to="/minha-conta/modelos-salvos">
          <ModelsIcon /> Modelos salvos
        </NavLink>
      </li>,
      <li key="cloud">
        <NavLink onClick={this.handleClick} to="/minha-conta/cloud">
          <ModelsIcon /> Cloud
        </NavLink>
      </li>,
      <li key="logout">
        <NavLink onClick={this.handleClick} to="#">
          <OutIcon /> Sair
        </NavLink>
      </li>,
    ];
  }

  renderMobileHeader() {
    return (
      <div>
        <span key="hello">Olá!</span>
        <span key="register">Entrar ou Cadastrar</span>
      </div>
    );
  }

  renderMobile() {
    const { isHidden } = this.props;

    return (
      <TransitionGroup className="org-myAccount-menu-expand">
        {!isHidden && [
          <FadeToggle key="fade-toggle-header">
            <Overlay onClick={this.handleClick} />
          </FadeToggle>,
          <SlideToggle key="slide-toggle-header" direction="rtl">
            <div className="mol-header-account-expand">
              <div className="mol-header-account-expand-header">
                <MyAccountIcon />
                {this.renderMobileHeader()}
                <button className="atm-header-menu-close" onClick={this.handleCloseMenu}>
                  <TimesIcon />
                </button>
              </div>
              <ul className="mol-header-account-list">
                {this.renderLoggedIn()}
              </ul>
            </div>
          </SlideToggle>,
        ]}
      </TransitionGroup>
    );
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
