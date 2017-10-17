// @flow

import React from 'react';
import { EyeIcon } from 'components/Icons';

type Props = {
  type: string,
  title: string,
  content: string,
};

const Indicator = (props: Props) => (
  <div className={`dcl-canvas__info-modal dcl-canvas__info-modal--${props.type}`}>
    <div className="dcl-header-text">
      {props.type !== 'trim' && <EyeIcon />}
      {props.title}
    </div>
    <div className="dcl-margin-indicator-positioner">
      <div className="dcl-margin-indicator-message">
        {props.content}
      </div>
      <div className="dcl-pointer-line dcl-pointer-line__bg" />
      <div className="dcl-pointer-line dcl-pointer-line__fg" />
      <div className="dcl-pointer-circle" />
    </div>
  </div>
);

export default Indicator;
