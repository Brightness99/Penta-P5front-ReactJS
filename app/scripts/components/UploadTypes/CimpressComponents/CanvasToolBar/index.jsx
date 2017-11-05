// @flow

import React from 'react';

const CanvasToolBar = () => (
  <div className="upload__canvas-schema__canvas-tool-bar">
    <div className="canvas-area_orientation-container">
      <label>Orientação</label>
      <div className="canvas-area_orientation-container_buttons">
        <button className="vertical-button activated">
          <div />
        </button>
        <button className="horizontal-button">
          <div />
        </button>
      </div>
    </div>
  </div>
);

export default CanvasToolBar;
