// @flow
import React from 'react';
import { CheckIcon, AlertCircle } from 'components/Icons';
import PreviewImageModal from 'components/PreviewImageModal';

type Props = {
  previewUrls: Array<string>,
}

type State = {
  openModal: boolean,
  imageUrl: string
}

export default class CanvasCutPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      imageUrl: '',
    };
  }
  props: Props;
  state: State;

  renderModal = () => {
    const { openModal, imageUrl } = this.state;

    return (openModal &&
    <PreviewImageModal handleClose={this.handleCloseModal}>
      <img src={imageUrl} alt="preview" />
    </PreviewImageModal>);
  };

  handleOpenModal = (imageUrl: string) => {
    this.setState({
      openModal: true,
      imageUrl,
    });
  };

  handleCloseModal = () => {
    this.setState({
      openModal: false,
    });
  };

  render() {
    const { previewUrls } = this.props;
    return (
      <section className="canvas-cut-preview">
        <h4>Confira como ficou seu cartão de visita</h4>
        <section className="previews">
          <section className="preview-item">
            <a href="#first-preview" className="image-card first" onClick={() => this.handleOpenModal(previewUrls[0])}>
              <img className="card" src={previewUrls[0]} alt="preview" />
              <img className="hand" src={require('assets/media/images/frente.png')} alt="hand" />
            </a>
            <span>FRENTE</span>
          </section>
          <section className="preview-item">
            <a href="#second-preview" className="image-card second" onClick={() => this.handleOpenModal(previewUrls[1])}>
              <img className="card" src={previewUrls[1]} alt="preview" />
              <img className="hand" src={require('assets/media/images/frente.png')} alt="hand" />
            </a>
            <span>verso</span>
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
        {
          this.renderModal()
        }
      </section>
    );
  }
}
