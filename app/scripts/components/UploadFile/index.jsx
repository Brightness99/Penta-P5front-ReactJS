// @flow
import React from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import { uploadFileRequest, uploadFileCancel } from 'actions';
import FileFormatIcon from 'components/FileFormatIcon';
import PreviewUploadedFile from './PreviewUploadedFile';
import UploadFilePlaceholder from './UploadFilePlaceholder';
import UploadProgress from './UploadProgress';

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
  isSelectedFileForUpload: boolean,
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
      isSelectedFileForUpload: false,
      isShowPreview: false,
    };
  }

  componentWillReceiveProps(newProps) {
    const { handleFileChanged } = this.props;
    const { isSelectedFileForUpload } = this.state;
    const { isUploaded, preview } = newProps;

    if (isSelectedFileForUpload && isUploaded) {
      this.setState({
        isSelectedFileForUpload: false,
        isShowPreview: true,
        preview,
      });
      if (handleFileChanged && typeof handleFileChanged === 'function') {
        handleFileChanged(preview);
      }
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
    const { uploadFile } = this.props;
    const files = e.dataTransfer.files;
    const file = files[0];
    const fileName = file.name;
    const format = fileName.split('.').pop();

    this.setState({
      isShowDropzone: false,
      fileName,
      fileFormat: format,
      isSelectedFileForUpload: true,
    });

    if (typeof uploadFile === 'function') {
      uploadFile(file);
    }
    return false;
  };

  handleRemoveFile = () => {
    this.setState({
      isSelectedFileForUpload: false,
      isShowPreview: false,
      preview: {},
    });
  };

  handleCancelUploading = () => {
    const { uploadCancel } = this.props;
    this.setState({
      isSelectedFileForUpload: false,
      isShowPreview: false,
      preview: {},
    });
    if (uploadCancel && typeof uploadCancel === 'function') {
      uploadCancel();
    }
  };

  renderContent = () => {
    const { progress } = this.props;
    const { isSelectedFileForUpload, fileName, fileFormat } = this.state;

    if (isSelectedFileForUpload) {
      return (<UploadProgress
        progress={progress}
        fileName={fileName}
        fileFormat={fileFormat}
        handleCancelUploading={this.handleCancelUploading}
      />);
    }

    return (
      <label
        onDragLeave={this.onDragLeave}
        onDragEnter={this.onDragEnter}
        onDragOver={this.onDragOver}
        onDrop={this.onDrop}
      >
        <input type="file" />
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

  renderUploadContainer() {
    const { isShowDropzone, isSelectedFileForUpload } = this.state;
    const { isUploadRunning } = this.props;
    const isActive = isShowDropzone || isSelectedFileForUpload;
    const showPlaceholder = !isSelectedFileForUpload && isUploadRunning;

    return (
      <section className={cx('upload-file-container', isActive && 'active')}>
        {showPlaceholder ? <UploadFilePlaceholder /> : this.renderContent()}
      </section>
    );
  }

  render() {
    const { isShowPreview, preview } = this.state;
    return isShowPreview ?
      <PreviewUploadedFile preview={preview} handleRemoveFile={this.handleRemoveFile} /> :
      this.renderUploadContainer();
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
