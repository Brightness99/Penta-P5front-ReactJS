// @flow
import React from 'react';
import UploadFile from 'components/UploadFile';

type Props = {
  multipleFiles: boolean,
  uploadTwoFiles: boolean,
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
    const { multipleFiles, uploadTwoFiles, fileFormats } = this.props;

    if (uploadTwoFiles) {
      return [
        <UploadFile
          handleUploadFile={this.handleUploadFile}
          handleRemoveFile={this.handleRemoveFile}
          fileFormats={fileFormats}
          showTitle={true}
          title="Arte 1"
          key="arte1"
        />,
        <UploadFile
          handleUploadFile={this.handleUploadFile}
          handleRemoveFile={this.handleRemoveFile}
          showTitle={true}
          fileFormats={fileFormats}
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
        title="Arte 1"
        key="arte1"
      />
    );
  }

  render() {
    return (
      <section className="upload-type-schemes-container">
        {
          this.renderUploadFiles()
        }
      </section>
    );
  }
}
