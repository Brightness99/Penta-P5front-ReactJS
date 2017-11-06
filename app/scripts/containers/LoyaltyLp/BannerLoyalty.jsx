// @flow
import React from 'react';
import { isMobile } from 'utils/helpers';
import { PrintiClub } from 'components/Icons';

type Props ={
  screenSize: string,
};
export class BannerLoyalty extends React.Component {
  props: Props;

  render() {
    const { screenSize } = this.props;
    return (
      <div className="atm-banner-loyalty">
        {!isMobile(screenSize) ?
          <img src={require('assets/media/images/photo-fidelidade.png')} alt="Programa de Fidelidade" />
          :
          <img src={require('assets/media/images/photo-fidelidade-mobile.png')} alt="Programa de Fidelidade" />
        }
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
