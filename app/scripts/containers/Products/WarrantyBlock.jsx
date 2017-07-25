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
        <div className="box-image-warranty">
          <img src="https://d2ofpir5gh0cbr.cloudfront.net/assets/final/img/ico-garantido.jpg" alt="adadasd" />
        </div>
        <div className="box-text-warranty">
          <h4 className="warranty-title">Não corra risco com seu impresso!</h4>
          <p className="warranty-text">A nossa satisfação é sua satisfação. Não ficou satisfeito com a qualidade do material que recebeu? Nós vamos reimprimi-lo! Sem custos e sem burocracia.</p>
        </div>
        <div className="box-btn-warranty">
          <div>
            <Link className="btn-default btn-primary btn-lg" to="{'settingsPageLink'}">Configure aqui</Link>
          </div>  
        </div>
      </section>
    );
  }

}

export default WarrantyBlock;
