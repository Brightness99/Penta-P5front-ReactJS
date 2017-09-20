// @flow

import React from 'react';
import { Link } from 'react-router-dom';

export class CloudTools extends React.Component {
  render() {
    return (
      <section className="container-cloudTools">
        <div className="container">
          <h4 className="title-corporateSales">Conheça a cloud, uma ferramenta exclusiva da printi</h4>
          <div className="boxes-cloudTools">
            <div className="box-cloudTools">
              <p className="subtitle-cloudTools">Agilidade para seus materiais gráficos</p>
              <p className="text-cloudTools">Personalize arquivos de diferentes funcionários, unidades ou franquias e acompanhe a impressão e distribuição dos materiais. Tudo com total controle das quantidades e o uso correto da marca.</p>
              <Link to="#" className="btn-default btn-secondary btn-lg">Solicitar Atendimento</Link>
              <Link to="#" className="link-aboutCloud">Ler mais sobre o Cloud</Link>
            </div>
            <div className="box-cloudTools">
              <img src={require('assets/media/images/img-cloud.png')} alt="Menu" />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default CloudTools;
