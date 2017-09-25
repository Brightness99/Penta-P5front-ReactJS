// @flow

import React from 'react';
import cloudImage from 'assets/media/images/img-cloud.png';

type Props = {
  handleModalShowing: () => void,
}

class CloudTools extends React.Component<Props> {
  static props: Props;

  render() {
    return (
      <section className="container-cloudTools">
        <div className="container">
          <h4 className="title-corporateSales">Conheça a cloud, uma ferramenta exclusiva da printi</h4>
          <div className="boxes-cloudTools">
            <div className="box-cloudTools">
              <p className="subtitle-cloudTools">Agilidade para seus materiais gráficos</p>
              <p className="text-cloudTools">
                Personalize arquivos de diferentes funcionários, unidades ou franquias e acompanhe
                a impressão e distribuição dos materiais. Tudo com total controle das quantidades e o uso correto da
                marca.
              </p>
              <button
                className="btn-default btn-secondary btn-lg"
                onClick={this.props.handleModalShowing}
              >
                Solicitar Atendimento
              </button>
            </div>
            <div className="box-cloudTools">
              <img src={cloudImage} alt="Menu" />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default CloudTools;
