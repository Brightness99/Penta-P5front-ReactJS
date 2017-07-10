// @flow
import React from 'react';
import Logo from 'components/Logo';

type Props = {
  className: string,
  locale: {},
  button?: typeof React.Component,
  screenSize: string,
};

export default class BenefitsBlock extends React.Component {

  render() {
    return (
      <section className="container-benefits">
        <h4 className="benefits-title">Vantagens</h4>
        <div className="container-benefitsCard">
          <div className="box-benefitsCard">
            <p className="benefitsCard-title">Outras gráficas online</p>
            <p>x</p>
            <p>x</p>
            <p>x</p>
            <p>x</p>
            <p>x</p>
            <p>x</p>
            <p>x</p>
            <p>x</p>
          </div>
          <div className="box-benefitsCard">
            <p className="benefitsCard-title">
              <Logo />
            </p>
            <p>x Orçamento online</p>
            <p>x Pedidos 24h</p>
            <p>x Atendimento especializado</p>
            <p>x Verificação do arquivo online</p>
            <p>x Download de gabaritos grátis</p>
            <p>x Produção 24h*</p>
            <p>x Qualidade offset a preços baixos</p>
            <p>x Impressão de alta tiragem</p>
            <div className="benefitsCard-btn">
              <button className="btn-default btn-primary btn-lg">Configure este produto</button>
            </div>
          </div>
          <div className="box-benefitsCard">
            <p className="benefitsCard-title">Gráficas Tradicionais</p>
            <p>x</p>
            <p>x</p>
            <p>x</p>
            <p>x</p>
            <p>x</p>
            <p>x</p>
            <p>x</p>
            <p>x</p>
          </div>
        </div>
        <sub>*em até 48h. Consulte os produtos disponíveis.</sub>
      </section>
    );
  }
}
