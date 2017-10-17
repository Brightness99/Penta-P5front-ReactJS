// @flow
import React from 'react';
import UploadFile from 'components/UploadFile';

type Props = {
  multipleFiles: boolean,
  uploadTwoFiles: boolean,
  handleUploadFile: (file: {}) => void,
  isLoadStarted: boolean,
  uploadFileProgresses: { fileName: string, progress: number }
}

export default class NormalUploadType extends React.Component {
  static defaultProps = {
    multipleFiles: false,
    uploadTwoFiles: false,
    uploadFileProgresses: [],
  };

  props: Props;

  handleUploadFile = (file: {}) => {
    this.props.handleUploadFile(file);
  };

  renderUploadFiles() {
    const { multipleFiles, uploadTwoFiles } = this.props;
    if (uploadTwoFiles) {
      return [<UploadFile key="arte1" />, <UploadFile key="arte2" />];
    }
    return (
      <UploadFile multiple={multipleFiles} handleFileChanged={this.handleUploadFile} key="arte1" />
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
