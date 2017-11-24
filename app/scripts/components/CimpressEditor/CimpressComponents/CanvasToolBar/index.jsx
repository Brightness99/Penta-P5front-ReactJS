// @flow

import React from 'react';

type Props = {
  handleOrientation: (isVertical: number) => void,
  isVertical: boolean
}

const CanvasToolBar = ({ handleOrientation, isVertical }: Props) => (
  <div className="upload__canvas-schema__canvas-tool-bar">
    <div className="canvas-area_orientation-container">
      <label>Orientação</label>
      <div className="canvas-area_orientation-container_buttons">
        <button
          className={`vertical-button ${isVertical ? 'activated' : ''}`}
          onClick={() => handleOrientation(1)}
        >
          <div />
        </button>
        <button
          className={`horizontal-button ${!isVertical ? 'activated' : ''}`}
          onClick={() => handleOrientation(0)}
        >
          <div />
        </button>
      </div>
    </div>
    <div className="dcl-zoom-container" />
    <div
      className={`dcl-canvas-switcher ${!isVertical ? 'horizontal' : 'vertical'}`}
    />
  </div>
);

export default CanvasToolBar;
