// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import config from 'config';
import TrashIcon from 'components/Icons/Trash';
import PreviewImageModal from 'components/PreviewImageModal';

type Props = {
  preview: {
    originalName: string,
    pages: {}
  },
  locale: {},
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
    const { preview, handleRemoveFile, locale } = this.props;
    const { basePath } = config;
    const mappedPages = Object.keys(preview.pages).map(x => preview.pages[x]).slice(0, 2);

    return (
      <section className="upload-file-preview-container">
        {this.renderModal()}
        <section className="preview-header">
          <h4>{preview.originalName}</h4>
        </section>
        <section className="preview-content">
          <section className="preview-images-container">
            {
              mappedPages.map(x =>
                <section className="preview-item" key={x.preview_small}>
                  <Link to="#" onClick={() => this.handleOpenModal(`${basePath + x.preview_big}`)}>
                    <img src={`${basePath + x.preview_small}`} alt="preview" />
                  </Link>
                </section>)
            }
          </section>
          <section className="preview-footer">
            <button className="remove-button" onClick={() => handleRemoveFile(preview)}><TrashIcon />{locale.form.common.CANCEL}</button>
          </section>
        </section>
      </section>
    );
  }
}
