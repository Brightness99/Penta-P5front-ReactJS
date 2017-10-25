// @flow

import React from 'react';
import { NavLink } from 'react-router-dom';
import { TransitionGroup } from 'react-transition-group';
import { isMobile, shouldComponentUpdate } from 'utils/helpers';
import {
  OrdersIcon,
  AddressIcon,
  CardsIcon,
  ModelsIcon,
  OutIcon,
  MyAccountIcon,
  TimesIcon,
  AngleRightIcon
} from 'components/Icons';
import { FadeToggle, SlideToggle } from 'animations';
import Overlay from 'components/Overlay';

type Props = {
  screenSize: string,
  isHidden: string,
  handleClose: () => {},
  handleLogOut: () => {},
  isAuthorized: boolean,
  locale: {},
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

  handleLogOut = () => {
    const { handleLogOut } = this.props;

    if (typeof handleLogOut === 'function') {
      handleLogOut();
    }

    this.handleClick();
  };

  renderLoggedOut() {
    const { locale } = this.props;

    return [
      <li key="login">
        <NavLink onClick={this.handleClick} to="/login-cadastro">
          <AngleRightIcon /> {locale.SIGN_IN}
        </NavLink>
      </li>,
      <li key="register">
        <NavLink onClick={this.handleClick} to="/login-cadastro">
          <AngleRightIcon /> {locale.SIGN_UP}
        </NavLink>
      </li>,
    ];
  }

  renderLoggedIn() {
    const { locale } = this.props;

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
        <NavLink onClick={this.handleLogOut} to="#">
          <OutIcon /> {locale.LOGOUT}
        </NavLink>
      </li>,
    ];
  }

  renderMenu = () => {
    const { isAuthorized } = this.props;

    if (isAuthorized) {
      return this.renderLoggedIn();
    }
    return this.renderLoggedOut();
  }

  renderMobileHeader() {
    const { locale } = this.props;

    return (
      <div>
        <span key="hello">{locale.GREETING}</span>
        <span key="register">{locale.MY_ACCOUNT}</span>
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
                <button className="atm-header-menu-close" onClick={this.handleClick}>
                  <TimesIcon />
                </button>
              </div>
              <ul className="mol-header-account-list">
                {this.renderMenu()}
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
        {this.renderMenu()}
      </ul>
    );
  }

  render() {
    const { screenSize } = this.props;

    return isMobile(screenSize) ? this.renderMobile() : this.renderDesktop();
  }
}
