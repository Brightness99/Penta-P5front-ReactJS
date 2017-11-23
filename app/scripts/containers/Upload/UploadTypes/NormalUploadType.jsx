// @flow
import React from 'react';
import UploadFile from '../UploadFile';

type Props = {
  multipleFiles: boolean,
  uploadTwoFiles: boolean,
  locale: {},
  handleFiles: (files: {}) => void,
  fileFormats: Array<string>,
}

export default class NormalUploadType extends React.PureComponent {
  static defaultProps = {
    multipleFiles: false,
    uploadTwoFiles: false,
  };

  props: Props;

  handleFiles = (file: {}) => {
    this.props.handleFiles(file);
  };

  renderUploadFiles() {
    const { multipleFiles, uploadTwoFiles, fileFormats, locale } = this.props;

    if (uploadTwoFiles) {
      return [
        <UploadFile
          handleFiles={this.handleFiles}
          fileFormats={fileFormats}
          locale={locale}
          showTitle={true}
          title="Arte 1"
          key="arte1"
        />,
        <UploadFile
          handleFiles={this.handleFiles}
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
        handleFiles={this.handleFiles}
        locale={locale}
        title="Arte 1"
        key="arte3"
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
