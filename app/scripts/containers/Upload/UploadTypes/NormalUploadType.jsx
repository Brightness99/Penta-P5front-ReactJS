// @flow
import React from 'react';
import UploadFile from '../UploadFile';

type Props = {
  multipleFiles: boolean,
  uploadTwoFiles: boolean,
  locale: {},
  handleUploadFile: (file: {title: string, preview: {}}) => void,
  handleRemoveFile: (file: {title: string, preview: {}}) => void,
  fileFormats: Array<string>,
}

export default class NormalUploadType extends React.PureComponent {
  static defaultProps = {
    multipleFiles: false,
    uploadTwoFiles: false,
  };

  props: Props;

  handleUploadFile = (file: {}) => {
    this.props.handleUploadFile(file);
  };

  handleRemoveFile = (file: {}) => {
    this.props.handleRemoveFile(file);
  };

  renderUploadFiles() {
    const { multipleFiles, uploadTwoFiles, fileFormats, locale } = this.props;

    if (uploadTwoFiles) {
      return [
        <UploadFile
          handleUploadFile={this.handleUploadFile}
          handleRemoveFile={this.handleRemoveFile}
          fileFormats={fileFormats}
          locale={locale}
          showTitle={true}
          title="Arte 1"
          key="arte1"
        />,
        <UploadFile
          handleUploadFile={this.handleUploadFile}
          handleRemoveFile={this.handleRemoveFile}
          showTitle={true}
          fileFormats={fileFormats}
          locale={locale}
          title="Arte 2"
          key="arte2"
        />];
    }
    return (
      <UploadFile
        multiple={multipleFiles}
        fileFormats={fileFormats}
        handleRemoveFile={this.handleRemoveFile}
        handleUploadFile={this.handleUploadFile}
        locale={locale}
        title="Arte 1"
        key="arte1"
      />
    );
  }

  render() {
    return (
      <section className="upload-normal-type-container">
        {
          this.renderUploadFiles()
        }
      </section>
    );
  }
}
