// @flow
import React from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import { uploadFileRequest, uploadFileCancel } from 'actions';
import FileFormatIcon from 'components/FileFormatIcon';
import PreviewUploadedFile from './PreviewUploadedFile';
import UploadProgress from './UploadProgress';

type Props = {
  acceptedFormats: Array<string>,
  handleUploadFile: (file: { title: string, preview: {} }) => void,
  handleRemoveFile: (file: { title: string, preview: {} }) => void,
  fileFormats: Array<string>,
  multiple: boolean,
  preview: {},
  title: string,
  showTitle: string,
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
    const { handleUploadFile, title } = this.props;
    const { isSelectedFileForUpload } = this.state;
    const { isUploaded, preview } = newProps;

    if (isSelectedFileForUpload && isUploaded) {
      this.setState({
        isSelectedFileForUpload: false,
        isShowPreview: true,
        preview,
      });
      if (handleUploadFile && typeof handleUploadFile === 'function') {
        handleUploadFile({ title, preview });
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
    const files = e.dataTransfer.files;
    this.uploadFile(files[0]);
    return false;
  };

  onChangeInput = (e) => {
    e.preventDefault();
    const files = e.target.files;
    this.uploadFile(files[0]);
    return false;
  };

  uploadFile(file) {
    const { uploadFile } = this.props;
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
  }

  handleRemoveFile = () => {
    const { preview } = this.state;
    const { handleRemoveFile, title } = this.props;

    this.setState({
      isSelectedFileForUpload: false,
      isShowPreview: false,
      preview: {},
    });

    if (handleRemoveFile && typeof handleRemoveFile === 'function') {
      handleRemoveFile({ title, preview });
    }
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
    const { progress, multiple } = this.props;
    const { isSelectedFileForUpload, fileName, fileFormat, isShowDropzone } = this.state;

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
        className="upload-file-block"
        onDragLeave={this.onDragLeave}
        onDragEnter={this.onDragEnter}
        onDragOver={this.onDragOver}
        onDrop={this.onDrop}
      >
        <input type="file" multiple={multiple} onChange={this.onChangeInput} />
        <section className="icons">
          {
            !isShowDropzone &&
              [<FileFormatIcon key="ai" title="AI" />,
                <FileFormatIcon key="ind" title="IND" />]
          }
          <FileFormatIcon title="+" />
          {
           !isShowDropzone &&
             [<FileFormatIcon key="psd" title="PSD" />,
               <FileFormatIcon key="jpg" title="JPG" />]
          }
        </section>
        <p className="description">Arraste um arquivo até aqui para enviar ou</p>
        <button className="select-file">Procurar aquivo</button>
      </label>
    );
  };

  renderUploadContainer() {
    const { isShowDropzone, isSelectedFileForUpload } = this.state;
    const { isUploadRunning, title, showTitle } = this.props;
    const isActive = isShowDropzone || isSelectedFileForUpload;
    const isInactive = !isSelectedFileForUpload && isUploadRunning;

    return (
      <section className="upload-file-container">
        { showTitle && <h4>{title}</h4> }
        <section className={cx('upload-file-content', isActive && 'active', isInactive && 'inactive')}>
          {this.renderContent()}
        </section>
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
