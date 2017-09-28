// @flow
import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  screenSize: string,
  className: string,
  locale: {},
  button?: typeof React.Component,
};

export class WarrantyBlock extends React.Component {

  props: Props;

  render() {
    return (
      <section className="container-warranty">
        <div className="container">
          <div className="box-image-warranty">
            <img src={require('assets/media/images/img-warranty.png')} alt="100% Garantido" />
          </div>
          <div className="box-text-warranty">
            <h4 className="warranty-title">Qualidade garantida. Não corra risco com seus produtos!</h4>
            <p className="warranty-text">A nossa satisfação é a sua satisfação. Não ficou satisfeito com a qualidade do material que recebeu? Nós vamos reimprimi-lo! Sem custos e sem burocracia.</p>
          </div>
          <div className="box-btn-warranty">
            <div>
              <Link className="btn-default btn-primary btn-lg" to="{'settingsPageLink'}">Configure este produto</Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

}

export default WarrantyBlock;
