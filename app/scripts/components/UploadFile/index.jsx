// @flow
import React from 'react';
import cx from 'classnames';
import FileFormatIcon from 'components/FileFormatIcon';
import ProgressBar from 'components/ProgressBar';

type Props = {
  acceptedFormats: Array<string>,
  handleFileChanged: (file: {}) => void,
  uploadProgress: number,
  fileFormats: Array<string>,
  isFileLoading: boolean,
  isFileUploadError: boolean,
  preview: {}
}

type State = {
  isShowDropzone: boolean,
  isSelected: boolean,
  fileName: string,
  fileFormat: string,
}

export default class UploadFile extends React.Component {
  constructor(props: Props) {
    super(props);

    this.state = {
      isSelected: false,
    };
  }

  static defaultProps = {
    uploadProgress: 0,
    isFileLoading: false,
  };

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
    const fileName =  file.name;
    const format = fileName.split('.').pop();
    const { handleFileChanged } = this.props;
    this.setState({
      fileName,
      fileFormat: format,
      isSelected: true,
    });

    if (typeof handleFileChanged === 'function') {
      handleFileChanged(file);
    }
  };

  renderContent = () => {
    const { uploadProgress } = this.props;
    const { isSelected, fileName, fileFormat } = this.state;

    if (isSelected) {
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
