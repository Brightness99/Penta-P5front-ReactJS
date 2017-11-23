// @flow
import React from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import { uploadFileRequest, uploadFileCancel } from 'actions';
import { Button } from 'quarks/Inputs';
import Modal from 'components/Modal';
import { WarningFilled } from 'components/Icons';
import PreviewUploadedFile from './PreviewUploadedFile';
import UploadProgress from './UploadProgress';
import UploadFileContainer from './UploadFileContainer';

type Props = {
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
  locale: {},
  uploadFile: (file: {}) => void,
  uploadCancel: () => void,
  uploadedFileInfo: {}
}

type State = {
  isShowErrorDialog: boolean,
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

  componentWillReceiveProps({ isUploaded, preview, fileFormats }) {
    const { handleUploadFile, title } = this.props;
    const { isSelectedFileForUpload, fileFormat } = this.state;

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

    if (fileFormat && !fileFormats.includes(`.${fileFormat}`)) {
      this.handleRemoveFile();
    }
  }

  props: Props;
  state: State;

  uploadFile = (files) => {
    const file = files[0];
    const { uploadFile, fileFormats } = this.props;
    const fileName = file.name;
    const format = fileName.split('.').pop();
    if (!fileFormats.includes(`.${format}`)) {
      this.handleDialogOpen();
      return;
    }
    this.setState({
      fileName,
      fileFormat: format,
      isSelectedFileForUpload: true,
    });

    if (typeof uploadFile === 'function') {
      uploadFile(file);
    }
  };

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

  handleDialogOpen = () => {
    this.setState({
      isShowErrorDialog: true,
    });
  };

  handleDialogClose = () => {
    this.setState({
      isShowErrorDialog: false,
    });
  };

  renderModalDialog = () => {
    const { fileFormats, locale } = this.props;
    const { isShowErrorDialog } = this.state;
    const isPdfOnly = fileFormats.length === 1 && fileFormats.includes('.pdf');
    return (isShowErrorDialog &&
      <Modal handleCloseModal={this.handleDialogClose}>
        <section className="upload-file-warning-dialog">
          <WarningFilled />
          <h3>Formato de arquivo inválido</h3>
          {
            isPdfOnly &&
            <p>{locale.page.upload.box_upload.PDF_WARNING}</p>
          }
          {
            !isPdfOnly &&
            <p>{locale.page.upload.box_upload.LFILE_WARNING}</p>
          }
          <Button
            onClick={this.handleDialogClose}
            kind="success"
          >Ok, entendi!</Button>
        </section>
      </Modal>);
  };

  renderContent = () => {
    const { progress, multiple, fileFormats, locale, isUploadRunning } = this.props;
    const { isSelectedFileForUpload, fileName, fileFormat } = this.state;

    if (isSelectedFileForUpload) {
      return (
        <section className="upload-file-content active">
          <UploadProgress
            progress={progress}
            locale={locale}
            fileName={fileName}
            fileFormat={fileFormat}
            handleCancelUploading={this.handleCancelUploading}
          />
        </section>);
    }

    return (<UploadFileContainer
      multiple={multiple}
      fileFormats={fileFormats}
      handleFiles={this.uploadFile}
      locale={locale}
      disabled={isUploadRunning}
    />);
  };

  renderUploadContainer() {
    const { title, showTitle } = this.props;

    return (
      <section className="upload-file-container">
        { showTitle && <h4>{title}</h4> }
        {this.renderModalDialog()}
        {this.renderContent()}
      </section>
    );
  }

  render() {
    const { isShowPreview, preview } = this.state;
    const { locale } = this.props;
    return isShowPreview ?
      <PreviewUploadedFile locale={locale} preview={preview} handleRemoveFile={this.handleRemoveFile} /> :
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
