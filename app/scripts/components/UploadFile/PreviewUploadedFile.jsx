// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import config from 'config';
import TrashIcon from 'components/Icons/Trash';
import PreviewImageModal from './PreviewImageModal';

type Props = {
  preview: {
    originalName: string,
    pages: {}
  },
  handleRemoveFile: () => void
}

type State = {
  openModal: boolean,
  imageUrl: string,
}

export default class PreviewUploadedFile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageUrl: '',
      openModal: false,
    };
  }

  props: Props;
  state: State;

  handleCloseModal = () => {
    this.setState({
      imageUrl: '',
      openModal: false,
    });
  };

  handleOpenModal = (url: string) => {
    this.setState({
      imageUrl: url,
      openModal: true,
    });
  };

  renderModal = () => {
    const { openModal, imageUrl } = this.state;

    return (openModal &&
    <PreviewImageModal handleClose={this.handleCloseModal}>
      <img src={imageUrl} alt="preview" />
    </PreviewImageModal>);
  };

  render() {
    const { preview: { originalName, pages }, handleRemoveFile } = this.props;
    const { apiUrl } = config;
    const mappedPages = Object.keys(pages).map(x => pages[x]);

    return (
      <section className="upload-file-preview-container">
        {this.renderModal()}
        <section className="preview-header">
          <h4>{originalName}</h4>
        </section>
        <section className="preview-content">
          <section className="preview-images-container">
            <section className="preview-item" key={mappedPages[0].preview_small}>
              <Link to="#" onClick={() => this.handleOpenModal(`${apiUrl + mappedPages[0].preview_big}`)}>
                <img src={`${apiUrl + mappedPages[0].preview_small}`} alt="preview" />
              </Link>
            </section>
            <section className="preview-item" key={mappedPages[1].preview_small}>
              <Link to="#" onClick={() => this.handleOpenModal(`${apiUrl + mappedPages[1].preview_big}`)}>
                <img src={`${apiUrl + mappedPages[1].preview_small}`} alt="preview" />
              </Link>
            </section>
          </section>
          <section className="preview-footer">
            <button className="remove-button" onClick={handleRemoveFile}><TrashIcon />Excluir arquivo</button>
          </section>
        </section>
      </section>
    );
  }
}
