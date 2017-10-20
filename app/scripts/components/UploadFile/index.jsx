// @flow
import React from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import { uploadFileRequest } from 'actions';
import FileFormatIcon from 'components/FileFormatIcon';
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
  uploadedFileInfo: {}
}

type State = {
  isShowDropzone: boolean,
  isSelected: boolean,
  fileName: string,
  fileFormat: string,
}

export class UploadFile extends React.Component {
  constructor(props: Props) {
    super(props);

    this.state = {
      isSelected: false,
    };
  }

  componentWillReceiveProps(newProps) {
    const { isUploaded, handleFileChanged } = this.props;
    const newIsUploaded = newProps.isUploaded;
    const preview = newProps.preview;

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

  renderContent = () => {
    const { progress } = this.props;
    const { isSelected, fileName, fileFormat } = this.state;

    if (isSelected) {
      return (
        <section className="loading-content">
          <FileFormatIcon title={fileFormat} />
          <span className="file-title">{fileName}</span>
          <ProgressBar progress={progress} />
          <button>Cancelar</button>
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

  render() {
    const { isShowDropzone, isSelected } = this.state;
    const isActive = isShowDropzone || isSelected;
    return (
      <section className={cx('upload-file-container', isActive && 'active')}>
        <input type="file" id="file" />
        {this.renderContent()}
      </section>
    );
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
});


export default connect(mapStateToProps, mapDispatchToProps)(UploadFile);
