// @flow

import React from 'react';
import cx from 'classnames';
import { TransitionGroup } from 'react-transition-group';
import { NavLink } from 'react-router-dom';
import { isMobile, shouldComponentUpdate } from 'utils/helpers';
import Overlay from 'components/Overlay';
import Logo from 'components/Logo';

import { FadeToggle, SlideToggle } from 'animations';
import { TimesIcon } from 'components/Icons';

import Products from './_Products';

type Props = {
  screenSize: string,
  isHidden: boolean,
  handleClose: () => {},
};

export default class Menu extends React.Component {
  shouldComponentUpdate = shouldComponentUpdate;

  static props: Props;

  renderMobile() {
    const { screenSize } = this.props;
    return (
      <div className="mol-header-menu-content">
        <NavLink
          className="atm-header-menu-title"
          to="/venda-corporativa"
          activeClassName="selected"
          onClick={this.handleCloseMenu}
        >
          Venda Corporativa
        </NavLink>
        <NavLink
          className="atm-header-menu-title"
          to="/central-de-ajuda?action=search&value=meu-pedido"
          activeClassName="selected"
          onClick={this.handleCloseMenu}
        >
          Central de Ajuda
        </NavLink>
        <Products screenSize={screenSize} />
      </div>
    );
  }

  handleCloseMenu = (ev) => {
    const { handleClose } = this.props;

    if (typeof handleClose === 'function') {
      handleClose(ev);
    }
  };

  renderDesktop() {
    return (
      <div className="mol-header-menu-content">
        <ul>
          <span className="atm-header-menu-title">Informações</span>
          <li>
            <NavLink
              to="/central-de-ajuda?action=search&value=meu-pedido"
              activeClassName="selected"
              onClick={this.handleCloseMenu}
            >
              Central de Ajuda
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/blog"
              activeClassName="selected"
              onClick={this.handleCloseMenu}
            >
              Blog
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/venda-corporativa"
              activeClassName="selected"
              onClick={this.handleCloseMenu}
            >
              Venda Corporativa
            </NavLink>
          </li>
        </ul>
        <ul>
          <span className="atm-header-menu-title">Ferramentas</span>
          <li>
            <NavLink
              to="/download-de-gabaritos"
              activeClassName="selected"
              onClick={this.handleCloseMenu}
            >
              Gabaritos
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/guia-de-impressao"
              activeClassName="selected"
              onClick={this.handleCloseMenu}
            >
              Guia de Impressão
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/glossario"
              activeClassName="selected"
              onClick={this.handleCloseMenu}
            >
              Glossário
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/montagem-do-arquivo"
              activeClassName="selected"
              onClick={this.handleCloseMenu}
            >
              Montagem do arquivo
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/tutoriais"
              activeClassName="selected"
              onClick={this.handleCloseMenu}
            >
              Tutoriais
            </NavLink>
          </li>
        </ul>
        <ul>
          <span className="atm-header-menu-title">Institucional</span>
          <li>
            <NavLink
              to="/sobre-printi"
              activeClassName="selected"
              onClick={this.handleCloseMenu}
            >
              Sobre a Printi
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/printi-na-imprensa"
              activeClassName="selected"
              onClick={this.handleCloseMenu}
            >
              Printi na Imprensa
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/trabalhe-conosco"
              activeClassName="selected"
              onClick={this.handleCloseMenu}
            >
              Trabalhe Conosco
            </NavLink>
          </li>
        </ul>
      </div>
    );
  }

  render() {
    const { screenSize, isHidden } = this.props;

    return (
      <TransitionGroup className={cx('org-header-menu', !isHidden && 'org-header-menu--active')}>
        {!isHidden && [
          <FadeToggle key="fade-toggle-header">
            <Overlay onClick={this.handleCloseMenu} />
          </FadeToggle>,
          <SlideToggle key="slide-toggle-header">
            <div className="org-header-menu-container">
              <div className="mol-header-menu-header">
                <Logo fill="#fff" />
                <button className="atm-header-menu-close" onClick={this.handleCloseMenu}>
                  <TimesIcon />
                </button>
              </div>
              {isMobile(screenSize) ? this.renderMobile() : this.renderDesktop()}
            </div>
          </SlideToggle>,
        ]}
      </TransitionGroup>
    );
  }
}
