// @flow
import React from 'react';
import UploadFile from 'components/UploadFile';

type Props = {
  multipleFiles: boolean,
  uploadTwoFiles: boolean,
  handleUploadFile: (file: {}) => void,
  isLoadStarted: boolean,
  fileFormats: Array<string>,
  uploadFileProgress: {
    progress: number,
    preview: {},
    isRunning: boolean,
    error: boolean,
    message: string,
  }
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
    const { multipleFiles, uploadTwoFiles, uploadFileProgress: { progress, preview }, fileFormats } = this.props;
    console.log(preview);
    if (uploadTwoFiles) {
      return [<UploadFile fileFormats={fileFormats} key="arte1" />, <UploadFile fileFormats={fileFormats} key="arte2" />];
    }
    return (
      <UploadFile
        uploadProgress={progress}
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
