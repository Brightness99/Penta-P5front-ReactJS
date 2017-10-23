// @flow

import React from 'react';

const CanvasToolBar = () => (
  <div className="upload__canvasSchema__canvasToolBar">
    <div className="canvasArea_orientationContainer">
      <label>Orientação</label>
      <div className="canvasArea_orientationContainer_buttons">
        <button className="verticalButton activated">
          <div />
        </button>
        <button className="horizontalButton">
          <div />
        </button>
      </div>
    </div>
  </div>
);

export default CanvasToolBar;
