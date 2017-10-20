// @flow
import React from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import config from 'config';
import { uploadFileRequest, uploadFileCancel } from 'actions';
import FileFormatIcon from 'components/FileFormatIcon';
import TrashIcon from 'components/Icons/Trash';
import ProgressBar from 'components/ProgressBar';

type Props = {
  acceptedFormats: Array<string>,
  handleFileChanged: (file: {}) => void,
  fileFormats: Array<string>,
  preview: {},
  isUploadRunning: boolean,
  isUploaded: boolean,
  progress: boolean,
  uploadFile: (file: {}) => void,
  uploadCancel: () => void,
  uploadedFileInfo: {}
}

type State = {
  isShowDropzone: boolean,
  isSelected: boolean,
  fileName: string,
  fileFormat: string,
  isShowPreview: boolean,
  preview: {
    originalName: string,
    basename: string,
    pages: Array<{ preview_big: string, preview_small: string }>,
    thumbnail: string
  }
}

export class UploadFile extends React.Component {
  constructor(props: Props) {
    super(props);

    this.state = {
      isSelected: false,
      isShowPreview: false,
    };
  }

  componentWillReceiveProps(newProps) {
    const { isUploaded, handleFileChanged } = this.props;
    const { isSelected } = this.state;
    const newIsUploaded = newProps.isUploaded;
    const preview = newProps.preview;
    if (isSelected && newIsUploaded) {
      this.setState({
        isSelected: false,
        isShowPreview: true,
        preview,
      });
    }

    if (newIsUploaded && !isUploaded && handleFileChanged && typeof handleFileChanged === 'function') {
      handleFileChanged(preview);
    }
  }

  props: Props;
  state: State;

  onDragEnter = (e) => {
    this.setState({ isShowDropzone: true });
    e.stopPropagation();
    e.preventDefault();
    return false;
  };

  onDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  };

  onDragLeave = (e) => {
    this.setState({ isShowDropzone: false });
    e.stopPropagation();
    e.preventDefault();
    return false;
  };

  onDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    this.handleFile(files[0]);
    // Upload files
    this.setState({ isShowDropzone: false });
    return false;
  };

  handleFile = (file) => {
    const fileName = file.name;
    const format = fileName.split('.').pop();
    const { uploadFile } = this.props;
    this.setState({
      fileName,
      fileFormat: format,
      isSelected: true,
    });

    if (typeof uploadFile === 'function') {
      uploadFile(file);
    }
  };

  handleRemoveFile = () => {
    this.setState({
      isSelected: false,
      isShowPreview: false,
      preview: {},
    });
  };

  handleCancelUploading = () => {
    const { uploadCancel } = this.props;
    this.setState({
      isSelected: false,
      isShowPreview: false,
      preview: {},
    });
    if (uploadCancel && typeof uploadCancel === 'function') {
      uploadCancel();
    }
  };

  renderContent = () => {
    const { progress } = this.props;
    const { isSelected, fileName, fileFormat } = this.state;

    if (isSelected) {
      return (
        <section className="loading-content">
          <FileFormatIcon title={fileFormat} />
          <span className="file-title">{fileName}</span>
          <ProgressBar progress={progress} />
          <button onClick={this.handleCancelUploading}>Cancelar</button>
        </section>
      );
    }

    return (
      <label
        htmlFor="file"
        onDragLeave={this.onDragLeave}
        onDragEnter={this.onDragEnter}
        onDragOver={this.onDragOver}
        onDrop={this.onDrop}
      >
        <section className="icons">
          <FileFormatIcon title="AI" />
          <FileFormatIcon title="IND" />
          <FileFormatIcon title="+" />
          <FileFormatIcon title="PSD" />
          <FileFormatIcon title="JPG" />
        </section>
        <p>Arraste um arquivo até aqui para enviar ou</p>
        <button>Procurar aquivo</button>
      </label>
    );
  };

  renderPreview() {
    const { apiUrl } = config;
    const { preview: { originalName, pages } } = this.state;
    const mappedPages = Object.keys(pages).map(x => pages[x]);
    return (
      <section className="upload-file-preview-container">
        <section className="preview-header">
          <h4>{originalName}</h4>
        </section>
        <section className="preview-content">
          <section className="preview-images-container">
            <section className="preview-item" key={mappedPages[0].preview_small}><img
              src={`${apiUrl + mappedPages[0].preview_small}`} alt="preview"
            /></section>
            <section className="preview-item" key={mappedPages[1].preview_small}><img
              src={`${apiUrl + mappedPages[1].preview_small}`} alt="preview"
            /></section>
          </section>
          <section className="preview-footer">
            <button className="remove-button" onClick={this.handleRemoveFile}><TrashIcon />Excluir arquivo</button>
          </section>
        </section>
      </section>
    );
  }

  renderUploadContainer() {
    const { isShowDropzone, isSelected } = this.state;
    const isActive = isShowDropzone || isSelected;
    return (
      <section className={cx('upload-file-container', isActive && 'active')}>
        <input type="file" id="file" />
        {this.renderContent()}
      </section>
    );
  }

  render() {
    const { isShowPreview } = this.state;
    return isShowPreview ? this.renderPreview() : this.renderUploadContainer();
  }
}

const mapStateToProps = (state) => ({
  isUploadRunning: state.upload.uploadFile.isRunning,
  isUploaded: state.upload.uploadFile.isUploaded,
  progress: state.upload.uploadFile.progress,
  preview: state.upload.uploadFile.preview,
});

const mapDispatchToProps = (dispatch) => ({
  uploadFile: (file) => dispatch(uploadFileRequest(file)),
  uploadCancel: (file) => dispatch(uploadFileCancel(file)),
});


export default connect(mapStateToProps, mapDispatchToProps)(UploadFile);
