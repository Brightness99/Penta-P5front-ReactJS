// @flow

import React from 'react';
import { Link } from 'react-router-dom';


type Props = {
  locale: {
    certificates: LocaleFooterImages,
    support: LocaleFooterImages,
    payment_methods: LocaleFooterImages,
  },
};

const Badges = (props: Props) => {
  const { locale: { certificates, payment_methods, support } } = props;

  return (
    <ul className="app__footer__badges container">
      <li className="app__footer__badges-item">
        <span className="app__footer__badges-title">{certificates.TITLE}</span>
        <ul className="app__footer__badges-images">
          <li className="app__footer__badges-certificates">
            <Link to="#">
              <img src={require('assets/media/images/certisign.png')} alt="Certisign" />
            </Link>
          </li>
          <li className="app__footer__badges-certificates">
            <Link to="#">
              <img
                className="norton"
                src={'https://seal.websecurity.norton.com/getseal?' +
                'at=0&sealid=2&dn=www.printi.com.br&lang=pt&tpt=transparent'}
                alt="Norton Secured"
              />
            </Link>
          </li>
          <li className="app__footer__badges-certificates">
            <Link to="#">
              <img src={require('assets/media/images/google.png')} alt="Google Safe Browsing" />
            </Link>
          </li>
        </ul>
      </li>
      <li className="app__footer__badges-item">
        <span className="app__footer__badges-title">{support.TITLE}</span>
        <ul className="app__footer__badges-images">
          {support.images.map((d) => (
            <li key={d.SRC}>
              <Link to={d.URL} target="_blank" title={d.TITLE}>
                <img src={require('assets/media/images/endeavor.png')} alt={d.ALT} />
              </Link>
            </li>
          ))}
        </ul>
      </li>
      <li className="app__footer__badges-item">
        <span className="app__footer__badges-title">{payment_methods.TITLE}</span>
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
