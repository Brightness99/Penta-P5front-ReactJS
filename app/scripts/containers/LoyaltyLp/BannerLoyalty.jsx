// @flow
import React from 'react';
import { PrintiClub } from 'components/Icons';

export class BannerLoyalty extends React.Component {
  render() {
    return (
      <div className="atm-banner-loyalty">
        <img src={require('assets/media/images/photo-fidelidade.png')} alt="Programa de Fidelidade" />
        <div className="qrk-banner-text">
          <PrintiClub />
          <h2 className="title-banner-text">Mais vantagens para quem é Printi de carteirinha.</h2>
          <p className="subtitle-banner-text">Seja um membro desse clube e acumule vantagens que só a gráfica do futuro pode oferecer.</p>
          <button className="btn-default btn-secondary btn-lg">Fazer parte</button>
        </div>
      </div>
    );
  }
}

export default BannerLoyalty;
