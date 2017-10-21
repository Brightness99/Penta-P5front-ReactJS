// @flow
import React from 'react';
import ProgressBar from 'components/ProgressBar';
import FileFormatIcon from 'components/FileFormatIcon';

type Props = {
  fileFormat: string,
  fileName: string,
  progress: number,
  handleCancelUploading: () => void
}

const UploadProgress = ({ fileFormat, fileName, progress, handleCancelUploading }: Props) => (
  <section className="loading-content">
    <FileFormatIcon title={fileFormat} />
    <span className="file-title">{fileName}</span>
    <ProgressBar progress={progress} />
    <button className="cancel-button" onClick={handleCancelUploading}>Cancelar</button>
  </section>
  );

export default UploadProgress;
