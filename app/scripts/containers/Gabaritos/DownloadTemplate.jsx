// @flow

import React from 'react';
import { Link } from 'react-router-dom';

class DownloadTemplate extends React.Component {

  sidebar() {
    return (
      <div className="mol-sidebar-download-template">
        <div className="atm-sidebar-download-template">
          <h4 className="title-atm-sidebar">Baixar gabarito</h4>
          <ul className="qrk-list-sidebar">
            <li>Cartão de Visita</li>
            <li>Paisagem</li>
            <li>2 páginas (frente e verso)</li>
            <li>50x90mm</li>
          </ul>
        </div>
        <div className="atm-sidebar-choose-download">
          <h4 className="title-atm-sidebar">Opções:</h4>
          <ul className="qrk-list-download">
            <li>
              <img src={require('assets/media/images/ilustrator-icon.png')} alt="Ilustrator" />
              <Link to="#" className="btn-default btn-primary btn-sm fnt-sbold">Ilustrator</Link>
            </li>
            <li>
              <img src={require('assets/media/images/photoshop-icon.png')} alt="Photoshop" />
              <Link to="#" className="btn-default btn-primary btn-sm fnt-sbold">Photoshop</Link>
              </li>
            <li>
              <img src={require('assets/media/images/indesign-icon.png')} alt="Indesign" />
              <Link to="#" className="btn-default btn-primary btn-sm fnt-sbold">Indesign</Link>
            </li>
            <li>
              <img src={require('assets/media/images/coreldraw-icon.png')} alt="Coreldraw" />
              <Link to="#" className="btn-default btn-primary btn-sm fnt-sbold">Coreldraw</Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }

  previewTemplate() {
    return (
      <div className="mol-sidebar-preview">
        <h4 className="title-atm-preview">Preview</h4>
        <div>
          images preview
        </div>
        <ul className="atm-list-sidebar-preview">
          <li className="final-format">Formato final/faca</li>
          <li className="safety-margin">Margem de segurança e corte</li>
          <li className="bleed">Sangria</li>
          <li className="creases">Dobras</li>
        </ul>
        <p>Nãto esqueça de remover o gabarito antes de fechar o PDF para impressão</p>
      </div>
    );
  }

  render() {
    return (
      <section>
        <div className="container">
          <div className="org-download-template">
            { this.sidebar() }
            { this.previewTemplate() }
          </div>
        </div>
      </section>
    );
  }
}

export default DownloadTemplate;
