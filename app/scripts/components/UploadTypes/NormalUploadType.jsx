// @flow
import React from 'react';
import UploadFile from 'components/UploadFile';

type Props = {
  multipleFiles: boolean,
  uploadTwoFiles: boolean,
  handleUploadFile: (file: {}) => void,
  fileFormats: Array<string>,
}

export default class NormalUploadType extends React.Component {
  static defaultProps = {
    multipleFiles: false,
    uploadTwoFiles: false,
  };

  props: Props;

  handleUploadFile = (file: {}) => {
    this.props.handleUploadFile(file);
  };

  renderUploadFiles() {
    const { multipleFiles, uploadTwoFiles, fileFormats } = this.props;

    if (uploadTwoFiles) {
      return [<UploadFile fileFormats={fileFormats} key="arte1" />, <UploadFile fileFormats={fileFormats} key="arte2" />];
    }
    return (
      <UploadFile
        multiple={multipleFiles}
        fileFormats={fileFormats}
        handleFileChanged={this.handleUploadFile}
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
