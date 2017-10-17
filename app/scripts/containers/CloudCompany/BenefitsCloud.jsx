// @flow

import React from 'react';
import { CloseIcon, CheckIcon, FilialIcon, GraficProduction, MaterialProduction, ControlProduction, ArrowsCloud } from 'components/Icons';

type Props = {
  screenSize: string,
};

export class BenefitsCloud extends React.Component {
  static defaultProps = {
    screenSize: 'xs',
  };

  props: Props;

  renderMobile() {
    return (
      <div className="org-benefits-cloud-mobile">
        <div className="container">
          <h4 className="qrk-title-benefits-cloud">A Cloud traz diversos benefícios para o marketing da sua empresa. Confira:</h4>
          <ul className="mol-list-tab">
            <li>Cloud</li>
            <li>Processo tradicional</li>
          </ul>
          <div className="mol-cloud-mobile">
            <img src={require('assets/media/images/cloud-printi.png')} alt="Cloud Printi" />

            <div className="atm-cloud-mobile">
              <div className="qrk-cloud-mobile">
                <div className="qrk-atm-icon-text">
                  <FilialIcon />
                  <span>Filiais</span>
                </div>
                <div className="qrk-atm-text check">
                  <CheckIcon />
                  <p>Aviso de novos materiais, coleta de pedidos e personalização manual dos dados das filiais.</p>
                </div>
              </div>
              <div className="qrk-cloud-mobile">
                <div className="qrk-atm-icon-text">
                  <GraficProduction />
                  <span>Produção gráfica</span>
                </div>
                <div className="qrk-atm-text check">
                  <CheckIcon />
                  <p>Cotação dos materiais, fechamento do pedido, envio.</p>
                </div>
              </div>
              <div className="qrk-cloud-mobile">
                <div className="qrk-atm-icon-text">
                  <ControlProduction />
                  <span>Controle</span>
                </div>
                <div className="qrk-atm-text check">
                  <CheckIcon />
                  <p>Cotação dos materiais, fechamento do pedido, envio.</p>
                </div>
              </div>
              <div className="qrk-cloud-mobile">
                <div className="qrk-atm-icon-text">
                  <MaterialProduction />
                  <span>Resposição de materiais</span>
                </div>
                <div className="qrk-atm-text check">
                  <CheckIcon />
                  <p>Cotação dos materiais, fechamento do pedido, envio.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }

  renderDesktop() {
    return (
      <div className="org-benefits-cloud">
        <div className="container">
          <h4 className="qrk-title-benefits-cloud">A Cloud traz diversos benefícios para o marketing da sua empresa. Confira:</h4>
          <div className="mol-tables-benefits-cloud">
            <div className="atm-table-benefits-cloud table-benefits">
              <p className="qrk-title-table-benefits qrk-title-tradicional">Processo tradicional</p>
              <ul className="qrk-list-benefits list-tradicional">
                <li>
                  <CloseIcon />
                  <p>Aviso de novos materiais, coleta de pedidos e personalização manual dos dados das filiais</p>
                </li>
                <li>
                  <CloseIcon />
                  <p>Cotação dos materiais, fechamento do pedido, envio das artes e transmissão dos dados das filiais para a gráfica</p>
                </li>
                <li>
                  <CloseIcon />
                  <p>Acompanhamento da produção e das entregas feito internamente</p>
                </li>
                <li>
                  <CloseIcon />
                  <p>Processamento, separação, estocagem, embalagem e envio de responsabilidade da matriz</p>
                </li>
              </ul>
            </div>
            <div className="atm-table-benefits-cloud ">
              <div className="qrk-title-table-benefits qrk-title-icons">
                <ArrowsCloud />
              </div>
              <ul className="qrk-list-benefits list-icons-benefits">
                <li>
                  <FilialIcon />
                  <p className="qrk-legend-icons">Filiais</p>
                </li>
                <li>
                  <GraficProduction />
                  <p className="qrk-legend-icons">Produção Gráfica</p>
                </li>
                <li>
                  <ControlProduction />
                  <p className="qrk-legend-icons">Controle</p>
                </li>
                <li>
                  <MaterialProduction />
                  <p className="qrk-legend-icons">Reposição de materiais</p>
                </li>
              </ul>
            </div>
            <div className="atm-table-benefits-cloud table-benefits">
              <p className="qrk-title-table-benefits">
                <img src={require('assets/media/images/icon-cloud.png')} alt="Cloud" />
              </p>
              <ul className="qrk-list-benefits list-cloud">
                <li>
                  <CheckIcon />
                  <p>Pedidos e personalização realizados pela filial diretamente na plataforma online</p>
                </li>
                <li>
                  <CheckIcon />
                  <p>Toda esta etapa é feita através da plataforma Cloud</p>
                </li>
                <li>
                  <CheckIcon />
                  <p>E-mails de aviso sobre o status de cada pedido (para cada filial)</p>
                </li>
                <li>
                  <CheckIcon />
                  <p>Produção e envio de novos materiais feitos de acordo com a demanda de cada filial</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
  render() {
    const { screenSize } = this.props;

    return ['xs', 'is', 'sm', 'ix', 'md', 'im'].includes(screenSize)
      ? this.renderMobile()
      : this.renderDesktop();
  }
}

export default BenefitsCloud;
