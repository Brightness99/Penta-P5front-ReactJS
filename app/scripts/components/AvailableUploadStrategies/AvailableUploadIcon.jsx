// @flow

import React from 'react';
import { UploadSendLaterIcon, UploadUniqueFileIcon, UploadMultipleFilesIcon } from 'components/Icons';

const getIcon = (index) => {
  switch (index) {
    case 1:
      return (
        <section className="available-upload-icon">
          <UploadSendLaterIcon />
        </section>);
    case 2:
      return (
        <section className="available-upload-icon">
          <UploadUniqueFileIcon />
          <span key="upload-pdf">PDF</span>
        </section>);
    case 3:
      return (
        <section className="available-upload-icon">
          <UploadUniqueFileIcon />
          <span>PDF</span>
        </section>);
    case 4:
      return (
        <section className="available-upload-double-icon">
          <section className="available-upload-icon">
            <UploadUniqueFileIcon />
            <span>Frente</span>
          </section>
          <section className="available-upload-icon">
            <UploadUniqueFileIcon />
            <span>Verso</span>
          </section>
        </section>);
    default:
      return (
        <section className="available-upload-icon">
          <UploadMultipleFilesIcon />
          <span>PDF</span>
        </section>);
  }
};

const AvailableUploadIcon = (props: {iconIndex: number}) => getIcon(props.iconIndex);

export default AvailableUploadIcon;
