// @flow

import React from 'react';
import cloudImage from 'assets/media/images/img-cloud.png';
import { Link } from 'react-router-dom';

type Props = {
  handleModalShowing: () => void,
}

class CloudTools extends React.Component<Props> {
  static props: Props;

  render() {
    return (
      <section className="container-cloud-tools">
        <div className="container">
          <h4 className="title-corporate-sales">
            {'Conheça a cloud, uma ferramenta exclusiva da printi'}
          </h4>
          <div className="boxes-cloud-tools">
            <div className="box-cloud-tools">
              <p className="subtitle-cloud-tools">
                {'Agilidade para seus materiais gráficos'}
              </p>
              <p className="text-cloud-tools">
                {`Personalize arquivos de diferentes funcionários, unidades ou franquias e acompanhe
                a impressão e distribuição dos materiais. Tudo com total controle das quantidades e o uso correto da
                marca.`}
              </p>
              <div className="btns-cloud">
                <button
                  className="btn-default btn-secondary btn-lg"
                  onClick={this.props.handleModalShowing}
                >
                  {'Solicitar Atendimento'}
                </button>
                <Link to="/cloud">{'Ler mais sobre a cloud'}</Link>
              </div>
            </div>
            <div className="box-cloud-tools">
              <img src={cloudImage} alt="Menu" />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default CloudTools;
