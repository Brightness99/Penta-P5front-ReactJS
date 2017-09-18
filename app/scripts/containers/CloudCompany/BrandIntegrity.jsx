// @flow

import React from 'react';
import { Link } from 'react-router-dom';

export class BrandIntegrity extends React.Component {
  render() {
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
}

export default BrandIntegrity;
