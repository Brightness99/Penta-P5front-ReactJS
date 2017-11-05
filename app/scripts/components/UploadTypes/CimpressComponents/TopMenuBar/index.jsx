// @flow

import React from 'react';
import { AddFileIcon, AddTextIcon, HelpIcon } from 'components/Icons';

const TopMenuBar = () => (
  <div className="upload__canvas-schema__top-menu-bar">
    <div className="upload__canvas-schema__top-menu-bar-left">
      <button className="top-menu-bar_btn top-menu-bar_btn-image">
        <i className="files-icon">
          <AddFileIcon />
        </i>
        <span>Arquivos</span>
      </button>
      <button className="top-menu-bar_btn top-menu-bar_btn-text">
        <i>
          <AddTextIcon />
        </i>
        <span>Textos</span>
      </button>
    </div>
    <div className="upload__canvas-schema__top-menu-bar-right">
      <button className="top-menu-bar_btn top-menu-bar_btn-info">
        <i>
          <HelpIcon />
        </i>
        <span>Ajuda</span>
      </button>
    </div>
  </div>
);

export default TopMenuBar;
