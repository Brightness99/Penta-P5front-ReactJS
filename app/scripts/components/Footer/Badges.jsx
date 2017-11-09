// @flow

// TODO: Add vendor scripts to open the certificates

import React from 'react';
import { NavLink } from 'react-router-dom';


type Props = {
  locale: {
    SUPPORT: string,
    PAYMENT_METHODS: string,
    SELOS_RECLAME: string,
    security: {},
    COUNTRY_CODE: string,
  },
};

const Badges = (props: Props) => {
  const { locale: { SUPPORT, PAYMENT_METHODS, security, COUNTRY_CODE } } = props;

  return (
    <ul className="app__footer__badges container">
      <li className="app__footer__badges-item">
        <span className="app__footer__badges-title">{security.SAFE_SITE}</span>
        <ul className="app__footer__badges-images">
          <li className="app__footer__badges-certificates">
            <NavLink to="#">
              <img src={require('assets/media/images/certisign.png')} alt="Certisign" />
            </NavLink>
          </li>
          <li className="app__footer__badges-certificates">
            <NavLink to="#">
              <img
                className="norton"
                src={'https://seal.websecurity.norton.com/getseal?' +
                'at=0&sealid=2&dn=www.printi.com.br&lang=pt&tpt=transparent'}
                alt="Norton Secured"
              />
            </NavLink>
          </li>
          <li className="app__footer__badges-certificates">
            <NavLink to="#">
              <img src={require('assets/media/images/google.png')} alt="Google Safe Browsing" />
            </NavLink>
          </li>
        </ul>
      </li>
      {COUNTRY_CODE === 'BR' &&
        <li className="app__footer__badges-item">
          <span className="app__footer__badges-title">{SUPPORT}</span>
          <ul className="app__footer__badges-images">
            <li>
              <NavLink to="https://endeavor.org.br" target="_blank" title="Endeavour">
                <img src={require('assets/media/images/endeavor.png')} alt="Endeavour" />
              </NavLink>
            </li>
          </ul>
        </li>
      }
      <li className="app__footer__badges-item">
        <span className="app__footer__badges-title">{PAYMENT_METHODS}</span>
        <ul className="app__footer__badges-images">
          <li className="app__footer__badges-payments">
            <img src={require('assets/media/svg/payment_visa.svg')} alt="Visa" />
          </li>
          <li className="app__footer__badges-payments">
            <img src={require('assets/media/svg/payment_mastercard.svg')} alt="MasterCard" />
          </li>
          <li className="app__footer__badges-payments">
            <img src={require('assets/media/svg/payment_elo.svg')} alt="Elo" />
          </li>
          <li className="app__footer__badges-payments">
            <img src={require('assets/media/svg/payment_american.svg')} alt="American Express" />
          </li>
          <li className="app__footer__badges-payments">
            <img src={require('assets/media/svg/payment_discover.svg')} alt="Discover" />
          </li>
          <li className="app__footer__badges-payments">
            <img src={require('assets/media/svg/payment_diners.svg')} alt="Diners Club" />
          </li>
          <li className="app__footer__badges-payments">
            <img src={require('assets/media/svg/payment_hipercard.svg')} alt="Hipercard" />
          </li>
          <li className="app__footer__badges-payments">
            <img src={require('assets/media/svg/payment_jcb.svg')} alt="JCB" />
          </li>
          <li className="app__footer__badges-payments">
            <img src={require('assets/media/svg/payment_boleto.svg')} alt="Boleto" />
          </li>
        </ul>
      </li>
    </ul>
  );
};

export default Badges;
