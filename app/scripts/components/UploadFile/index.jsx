// @flow
import React from 'react';
import cx from 'classnames';
import FileFormatIcon from 'components/FileFormatIcon';
import ProgressBar from 'components/ProgressBar';

type Props = {
  acceptedFormats: Array<string>,
  handleFileChanged: (file: {}) => void,
  uploadProgress: number,
  isFileLoading: boolean,
  fileName: string,
  fileFormat: string,
  preview: {}
}

type State = {
  isShowDropzone: boolean,
  isSelected: boolean
}

export default class UploadFile extends React.Component {
  constructor(props: Props) {
    super(props);

    this.state = {
      isSelected: false,
    };
  }

  static defaultProps = {
    uploadProgress: 10,
    isFileLoading: true,
    fileName: 'asdhghgh hghghghghghg hghghghg hg.pdf',
    fileFormat: 'pdf',
  };

  props: Props;
  state: State;

  _onDragEnter = (e) => {
    this.setState({ isShowDropzone: true });
    e.stopPropagation();
    e.preventDefault();
    return false;
  };

  _onDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  };

  _onDragLeave = (e) => {
    this.setState({ isShowDropzone: false });
    e.stopPropagation();
    e.preventDefault();
    return false;
  };

  _onDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    this.handleFile(files[0]);
    // Upload files
    this.setState({ isShowDropzone: false });
    return false;
  };

  handleFile = (file) => {
    const { handleFileChanged } = this.props;
    this.setState({
      file,
      isSelected: true,
    });

    if (typeof handleFileChanged === 'function') {
      handleFileChanged(file);
    }
  };

  renderContent = () => {
    const { isFileLoading, fileName, fileFormat, uploadProgress } = this.props;

    if (isFileLoading) {
      return (
        <section className="loading-content">
          <FileFormatIcon title={fileFormat} />
          <span className="file-title">{fileName}</span>
          <ProgressBar progress={uploadProgress} />
          <button>Cancelar</button>
        </section>
      );
    }

    return (
      <label
        htmlFor="file"
        onDragLeave={this._onDragLeave}
        onDragEnter={this._onDragEnter}
        onDragOver={this._onDragOver}
        onDrop={this._onDrop}
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
    const { isShowDropzone } = this.state;
    const { isFileLoading } = this.props;
    const isActive = isShowDropzone || isFileLoading;
    return (
      <section className={cx('upload-file-container', isActive && 'active')}>
        <input type="file" id="file" />
        {this.renderContent()}
      </section>
    );
  }
}
