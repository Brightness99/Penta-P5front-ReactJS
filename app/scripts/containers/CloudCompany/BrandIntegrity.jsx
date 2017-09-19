// @flow

import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  screenSize: string,
}

export class BrandIntegrity extends React.Component {
  static defaultProps = {
    screenSize: 'xs',
  };

  props: Props;

  renderMobile() {
    return (
      <div className="org-about-cloud-mobile">
        <div className="container">
          <div className="mol-texts-about-cloud">
            <div className="atm-text-cloud img-note-cloud">
              <img src={require('assets/media/images/brand-integrity-mobile.png')} alt="Cloud" />
            </div>
            <div className="atm-text-cloud">
              <h4 className="qrk-title-about-cloud">Integridade da marca</h4>
              <p className="qrk-p-about-cloud">Todos os materiais com o mesmo layout e qualidade de impressão, preservando a identidade da sua marca.*</p>

              <p className="qrk-subtitle-about-cloud">Gerenciamento, produção e envio é a nossa responsabilidade</p>
              <Link to="" className="btn-default btn-secondary btn-sm">Quero saber mais</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderDesktop() {
    return (
      <div className="org-about-cloud">
        <div className="mol-texts-about-cloud">
          <div className="atm-text-cloud">
            <h4 className="qrk-title-about-cloud">Integridade da marca</h4>
            <p className="qrk-p-about-cloud">Todos os materiais com o mesmo layout e qualidade de impressão, preservando a identidade da sua marca.*</p>

            <p className="qrk-subtitle-about-cloud">Gerenciamento, produção e envio é a nossa responsabilidade</p>
            <Link to="" className="btn-default btn-secondary btn-sm">Quero saber mais</Link>
          </div>
          <div className="atm-text-cloud img-note-cloud">
            <img src={require('assets/media/images/brand-integrity.png')} alt="Cloud" />
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

export default BrandIntegrity;
