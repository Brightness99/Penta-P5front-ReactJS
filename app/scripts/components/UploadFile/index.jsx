// @flow
import React from 'react';
import cx from 'classnames';
import FileFormatIcon from 'components/FileFormatIcon';

type Props = {
  acceptedFormats: Array<string>,
  handleFileChanged: (file: {}) => void,
  uploadProgress: number,
  isUploaded: boolean,
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
    console.log('Files dropped: ', files);
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

  render() {
    const { isShowDropzone } = this.state;
    return (
      <section className={cx('upload-file-container', isShowDropzone && 'active')}>
        <input type="file" id="file" />
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
      </section>
    );
  }
}
