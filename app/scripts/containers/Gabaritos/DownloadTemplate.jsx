// @flow

import React from 'react';
import { Link } from 'react-router-dom';
import { Input, Button } from 'quarks/Inputs';
import ChooseSettings from './ChooseSettings';

type Props = {
  screenSize: string;
}

class DownloadTemplate extends React.Component {
  static defaultProps = {
    screenSize: 'xs',
  };

  props: Props;

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
              <Link to="#" className="btn-default btn-sm fnt-sbold">Ilustrator</Link>
            </li>
            <li>
              <img src={require('assets/media/images/photoshop-icon.png')} alt="Photoshop" />
              <Link to="#" className="btn-default btn-sm fnt-sbold">Photoshop</Link>
            </li>
            <li>
              <img src={require('assets/media/images/indesign-icon.png')} alt="Indesign" />
              <Link to="#" className="btn-default btn-sm fnt-sbold">Indesign</Link>
            </li>
            <li>
              <img src={require('assets/media/images/coreldraw-icon.png')} alt="Coreldraw" />
              <Link to="#" className="btn-default btn-sm fnt-sbold">Coreldraw</Link>
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
        <div className="atm-image-preview">
          <div className="qrk-image-preview">
            <img src={require('assets/media/images/gabarito-frente.png')} alt="Frente" />
          </div>
          <div className="qrk-image-preview">
            <img src={require('assets/media/images/gabarito-verso.png')} alt="Verso" />
          </div>
        </div>
        <ul className="atm-list-sidebar-preview">
          <li className="final-format">Formato final/faca</li>
          <li className="safety-margin">Margem de segurança e corte</li>
          <li className="bleed">Sangria</li>
          <li className="creases">Dobras</li>
        </ul>
        <p className="atm-legend-preview">Não esqueça de remover o gabarito antes de fechar o PDF para impressão</p>
      </div>
    );
  }

  footerPreviewMobile() {
    return (
      <div className="mol-footer-preview">
        <div className="container">
          <p className="text-footer-preview">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque auctor sapien nibh, nec varius sem finibus sit amet. Nulla ornare ligula nec ex sodales rutrum. Maecenas ac consectetur mi, vel malesuada libero.</p>
          <form>
            <Input
              name="email"
              placeholder="E-mail"
              showLabel={true}
            />
            <Button
              type="submit"
              kind="success"
              className="btn-default"
            >
            Enviar
          </Button>
          </form>
        </div>
      </div>
    );
  }

  renderMobile() {
    return (
      <section>
        <div className="container">
          <ChooseSettings />
          <div className="org-download-template">
            { this.previewTemplate() }
          </div>
        </div>
        <div className="org-download-template">
          { this.footerPreviewMobile() }
        </div>
      </section>
    );
  }

  renderDesktop() {
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

  render() {
    const { screenSize } = this.props;
    return (
      <div>
        {
          ['xs', 'is', 'sm', 'ix', 'md', 'im'].includes(screenSize)
            ? this.renderMobile()
            : this.renderDesktop()
        }
      </div>
    );
  }
}

export default DownloadTemplate;
