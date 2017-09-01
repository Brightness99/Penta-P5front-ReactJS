// @flow

import React from 'react';

type Props = {
};

const SideImageBar = (props: Props) => {
  return (
    <div className="upload__canvasSchema__sideImageBar">
      <div className="sideImageBar__buttonContainer">
        <button>
          <i className="filesIcon">
            +
          </i>
          <span>Adicionar novo arquivo</span>
        </button>
      </div>
      <div className="sideImageBar__thumbnailContainer">
        <p>thumbnail</p>
      </div>
    </div>
  );
};

export default SideImageBar;
