// @flow

import React from 'react';
import { MultipleFilesIcon, OneFileIcon } from 'components/Icons';

type Props = {
};

const SideImageBar = (props: Props) => {
  return (
    <div className="upload__canvasSchema__sideImageBar">
      <div className="sideImageBar__buttonContainer" />
      <div className="sideImageBar__thumbnailContainer">
        <div className="dcl-widget-upload-list" />
      </div>
    </div>
  );
};

export default SideImageBar;
