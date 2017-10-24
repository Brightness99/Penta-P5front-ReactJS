// @flow

import React from 'react';

type Props = {
  handleModalShowing: () => void,
}

class BannerCloud extends React.Component<Props> {
  static props: Props;

  render() {
    return (
      <div>
        <div className="banner-corporate-sales">
          <div className="container">
            <img src={require('assets/media/images/corporate-sales.png')} alt="Atendimento exclusivo" />
            <div className="text-banner">
              <h2 className="title-banner">Atendimento exclusivo</h2>
              <p className="desc-list-banner">Personalizado para atender as necessidades e demandas de clientes que:</p>
              <ul className="list-banner">
                <li>Fazem pedidos acima de <span>R$ 5mil</span></li>
                <li>Contam com mais de <span>50 funcionários</span></li>
                <li>Têm mais de <span>10 unidades ou franquias</span></li>
              </ul>
              <button
                className="btn-default btn-secondary btn-lg"
                onClick={this.props.handleModalShowing}
              >
                Solicitar Atendimento
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BannerCloud;
