// @flow
import React from 'react';
import { connect } from 'react-redux';
import { uploadFileRequest, uploadFileCancel } from 'actions';
import { Button } from 'quarks/Inputs';
import Modal from 'components/Modal';
import { WarningFilled } from 'components/Icons';
import PreviewUploadedFile from './PreviewUploadedFile';
import UploadProgress from './UploadProgress';
import UploadFileContainer from './UploadFileContainer';

type Props = {
  handleFiles: (files: { title: string, previews: [] }) => void,
  fileFormats: Array<string>,
  multiple: boolean,
  preview: {},
  title: string,
  showTitle: string,
  isUploadRunning: boolean,
  isUploaded: boolean,
  progress: {
    name: string,
    percent: number,
    format: string,
  },
  locale: {},
  uploadFile: (file: {}) => void,
  uploadCancel: () => void,
}

type State = {
  isShowErrorDialog: boolean,
  isSelectedFileForUpload: boolean,
  fileName: string,
  fileFormat: string,
  isShowPreview: boolean,
  preview: Array<{
    originalName: string,
    basename: string,
    pages: Array<{ preview_big: string, preview_small: string }>,
    timeToken: number,
    thumbnail: string
  }>
}

export class UploadFile extends React.Component {
  constructor(props: Props) {
    super(props);

    this.state = {
      isSelectedFileForUpload: false,
      isShowPreview: false,
      preview: [],
    };
  }

  componentWillReceiveProps({ isUploaded, preview, fileFormats }) {
    const { handleFiles, title } = this.props;
    const { isSelectedFileForUpload, fileFormat } = this.state;

    if (isSelectedFileForUpload && isUploaded) {
      const previews = [...this.state.preview, ...preview];
      this.setState({
        isSelectedFileForUpload: false,
        isShowPreview: true,
        preview: previews,
      });
      if (handleFiles && typeof handleFiles === 'function') {
        handleFiles({ title, previews });
      }
    }

    if (fileFormat && !fileFormats.includes(`.${fileFormat}`)) {
      this.handleFiles({ title, previews: [] });
    }
  }

  props: Props;
  state: State;

  uploadFile = (files) => {
    const { uploadFile, fileFormats } = this.props;
    const formats = files.map(x => x.name.split('.').pop());
    if (formats.some(x => !fileFormats.includes(`.${x}`))) {
      this.handleDialogOpen();
      return;
    }
    this.setState({
      isSelectedFileForUpload: true,
    });

    if (typeof uploadFile === 'function') {
      uploadFile(files);
    }
  };

  handleRemoveFile = (preview) => {
    const { handleFiles, title } = this.props;
    const previews = this.state.preview.filter(x => x.timeToken !== preview.timeToken);
    this.setState({
      isSelectedFileForUpload: false,
      isShowPreview: previews.length > 0,
      preview: [...previews],
    });

    if (handleFiles && typeof handleFiles === 'function') {
      handleFiles({ title, previews: previews });
    }
  };

  handleCancelUploading = () => {
    const { uploadCancel } = this.props;
    this.setState({
      isSelectedFileForUpload: false,
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
    const { isSelectedFileForUpload } = this.state;

    if (isSelectedFileForUpload) {
      return (
        <section className="upload-file-content active">
          <UploadProgress
            progress={progress.percent}
            locale={locale}
            fileName={progress.name}
            fileFormat={progress.format}
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

  renderPreviews() {
    const { preview } = this.state;
    const { locale } = this.props;

    return preview.map(x => (
          <PreviewUploadedFile
            key={x.timeToken}
            locale={locale}
            preview={x}
            handleRemoveFile={this.handleRemoveFile}
          />));
  }

  render() {
    const { isShowPreview } = this.state;
    const { multiple } = this.props;

    return (
      <section className="upload-file-and-preview-container">
        {isShowPreview && this.renderPreviews()}
        {(!isShowPreview || multiple) && this.renderUploadContainer()}
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
  uploadCancel: (file) => dispatch(uploadFileCancel(file)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UploadFile);
