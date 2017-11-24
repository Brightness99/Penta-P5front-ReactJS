// @flow
import React from 'react';
import cx from 'classnames';
import FileFormatIcon from 'components/FileFormatIcon';

type Props = {
  fileFormats: Array<string>,
  disabled: boolean,
  handleFiles: (file: []) => void,
  multiple: boolean,
  locale: {},
}

type State = {
  isShowDropzone: boolean,
}

export default class UploadFileContainer extends React.Component {
  constructor(props: Props) {
    super(props);
    this.state = {
      isSelectedFileForUpload: false,
    };
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
    this.uploadFile([...files]);
    return false;
  };

  onChangeInput = (e) => {
    e.preventDefault();
    const files = e.target.files;
    this.uploadFile([...files]);
    return false;
  };

  uploadFile(files) {
    const { handleFiles } = this.props;
    this.setState({
      isShowDropzone: false,
    });

    if (typeof handleFiles === 'function') {
      handleFiles(files);
    }
  }

  renderContent = () => {
    const { multiple, fileFormats, locale } = this.props;
    const { isShowDropzone } = this.state;

    return (
      <label
        className="upload-file-block"
        onDragLeave={this.onDragLeave}
        onDragEnter={this.onDragEnter}
        onDragOver={this.onDragOver}
        onDrop={this.onDrop}
      >
        <input type="file" multiple={multiple} accept={fileFormats.join()} onChange={this.onChangeInput} />
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
        <button className="select-file">{locale.page.upload.box_upload.CHOOSE_FILE}</button>
      </label>
    );
  };

  render() {
    const { disabled } = this.props;
    const { isShowDropzone } = this.state;
    const isActive = isShowDropzone && !disabled;

    return (
      <section className={cx('upload-file-content', isActive && 'active', disabled && 'inactive')}>
        {this.renderContent()}
      </section>
    );
  }
}
