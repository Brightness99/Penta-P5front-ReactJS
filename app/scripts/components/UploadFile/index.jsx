// @flow
import React from 'react';
import Dropzone from 'react-dropzone';
import FileFormatIcon from 'components/FileFormatIcon';

type Props = {
  acceptedFormats: Array<string>,
  handleFileChanged: (file: {}) => void,
  uploadProgress: number,
  isUploaded: boolean,
  preview: {}
}

export default class UploadFile extends React.Component {
  constructor(props: Props) {
    super(props);

    this.state = {
      isSelected: false,
    };
  }

  props: Props;
  state: Props;

  onDrop = (file) => {
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
    return (
        <Dropzone className="upload-file-container" onDrop={this.onDrop}>
          <section className="icons">
            <FileFormatIcon title="AI" />
            <FileFormatIcon title="IND" />
            <FileFormatIcon title="+" />
            <FileFormatIcon title="PSD" />
            <FileFormatIcon title="JPG" />
          </section>
          <p>Arraste um arquivo até aqui para enviar ou</p>
          <button>Procurar aquivo</button>
        </Dropzone>
    );
  }
}
