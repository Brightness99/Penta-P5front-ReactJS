// @flow
import React from 'react';
import { CheckIcon, AlertCircle } from 'components/Icons';

type Props = {
  previewUrls: Array<string>,
}

export default class CanvasCutPreview extends React.Component {
  props: Props;

  render() {
    const { previewUrls } = this.props;
    return (
      <section className="canvas-cut-preview">
        <h4>Confira como ficou seu cartão de visita</h4>
        <section className="previews">
          <section className="preview-item first">
            <img className="card" src={previewUrls[0]} alt="preview" />
            <img className="hand" src={require('assets/media/images/frente.png')} alt="hand" />
          </section>
          <section className="preview-item second">
            <img className="card" src={previewUrls[1]} alt="preview" />
            <img className="hand" src={require('assets/media/images/frente.png')} alt="hand" />
          </section>
        </section>
        <section className="footer">
          <section className="header">
            <h4><AlertCircle /> Não esqueça de conferir:</h4>
          </section>
          <hr />
          <section className="content">
            <ul className="items">
              <li className="item">
                <CheckIcon /> Se as informações e a escrita estão certas
              </li>
              <li className="item">
                <CheckIcon /> Se o texto está legível
              </li>
              <li className="item">
                <CheckIcon /> Se as imagens estão em boa qualidade
              </li>
              <li className="item">
                <CheckIcon /> Se não tem nada muito perto da linha de corte
              </li>
            </ul>
          </section>
        </section>
      </section>
    );
  }
}
