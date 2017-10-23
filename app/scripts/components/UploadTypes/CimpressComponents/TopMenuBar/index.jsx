// @flow

import React from 'react';
import { AddFileIcon, AddTextIcon, HelpIcon } from 'components/Icons';

const TopMenuBar = () => (
  <div className="upload__canvasSchema__topMenuBar">
    <div className="upload__canvasSchema__topMenuBar-left">
      <button className="topMenuBar_btn topMenuBar_btn-image">
        <i className="filesIcon">
          <AddFileIcon />
        </i>
        <span>Arquivos</span>
      </button>
      <button className="topMenuBar_btn topMenuBar_btn-text">
        <i>
          <AddTextIcon />
        </i>
        <span>Textos</span>
      </button>
    </div>
    <div className="upload__canvasSchema__topMenuBar-right">
      {/* <button className="dcl-canvas-history-container topMenuBar_canvas" />
      <button className="dcl-zoom-container topMenuBar_canvas" /> */}
      <button className="topMenuBar_btn topMenuBar_btn-info">
        <i>
          <HelpIcon />
        </i>
        <span>Ajuda</span>
      </button>
    </div>
  </div>
);

export default TopMenuBar;
