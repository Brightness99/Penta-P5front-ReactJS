// @flow

import React from 'react';
import { isMobile } from 'utils/helpers';
import { Link } from 'react-router-dom';
import Breadcrumbs from 'components/Breadcrumbs';
import { Input } from 'quarks/Inputs';
import { CheckIcon } from 'components/Icons';
import cx from 'classnames';

type Props = {
  screenSize: string,
};

export class Referral extends React.Component {
  static defaultProps = {
    screenSize: 'xs',
  };
  static props: Props;

  renderList() {
    return (
      <div className="mol-list-mobile">
        <div className="atm-content-list">
          <p className="qrk-title-list">Email</p>
          <p className="qrk-text-list">adriano_rod_oliveira@gmail.com</p>
          <p className="qrk-title-list">Atualizado</p>
          <p className="qrk-text-list">15/05/2017</p>
          <p className="qrk-title-list">Créditos</p>
          <p className="qrk-text-list">R$5,00</p>
        </div>
        <div className="atm-content-list">
          <p className="qrk-title-list">Email</p>
          <p className="qrk-text-list">adriano_rod_oliveira@gmail.com</p>
          <p className="qrk-title-list">Atualizado</p>
          <p className="qrk-text-list">15/05/2017</p>
          <p className="qrk-title-list">Créditos</p>
          <p className="qrk-text-list">R$5,00</p>
        </div>
      </div>
    );
  }

  render() {
    const { screenSize } = this.props;
    const breadcrumb = [
      {
        title: 'Home',
        url: '/',
      },
      {
        title: 'Minha conta',
        url: '/minha-conta',
      },
      {
        title: 'Indicações',
      },
    ];
    return (
      <div className="tpl-referral">
        {!isMobile(screenSize) && <Breadcrumbs links={breadcrumb} />}
        <div className={cx(isMobile(screenSize) && 'container')}>
          <h2 className="title-myaccount">Minha conta</h2>
          <div className="org-referral-share">
            <div className="mol-referral-text">
              <h4 className="qrk-title-text">Indicações</h4>
              <p className="qrk-text">Indique a Printi para seus amigos, a cada um que comprar, você e ele ganham créditos para trocar por nossos produtos</p>
            </div>
            <div className="mol-content-share">
              <p className="qrk-text-share">Compartilhe seu código promocional:</p>
              <form className="mol-share" onSubmit={this.handleSubmit}>
                <div className="atm-input-link">
                  <Input
                    name={name}
                    value=""
                    onChange={this.handleChange}
                    className="atm-input"
                  />
                  <Link to="#" className="atm-link-copy">
                    copiar
                  </Link>
                </div>
                <button className="btn-default btn-secondary fnt-sbold btn-sm">
                    Compartilhar
                </button>
              </form>
            </div>
          </div>
          <div className="org-table-referral">
            <p className="qrk-text">Até o momento você ganhou:</p>
            <p className="qrk-value">R$45,00</p>
            { isMobile(screenSize) && (this.renderList()) }
            { !isMobile(screenSize) && (
              <div className="mol-content-table">
                <ul className="atm-head-table">
                  <li>Email</li>
                  <li>Atualizado</li>
                  <li>Créditos</li>
                </ul>
                <div className="atm-content">
                  <div className="qrk-content-item">
                    <p>adriano_rod_oliveira@gmail.com</p>
                  </div>
                  <div className="qrk-content-item">
                    <p>15/05/2017</p>
                  </div>
                  <div className="qrk-content-item color-credit">
                    <p>R$5,00</p>
                    <CheckIcon />
                  </div>
                  <div className="qrk-content-item">
                    <p>adriano_rod_oliveira@gmail.com</p>
                  </div>
                  <div className="qrk-content-item">
                    <p>15/05/2017</p>
                  </div>
                  <div className="qrk-content-item color-credit">
                    <p>R$5,00</p>
                    <CheckIcon />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Referral;
