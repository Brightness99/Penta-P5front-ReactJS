// @flow

import React from 'react';
import { FileIcon } from 'components/Icons';

type Props = {

}

const PrePressTemplate = (props: Props) => (
  <ul className="app__config__pre-press">
    {[1, 2].map((item) => (
      <li>
        <FileIcon />
        <span>EPS</span>
      </li>
    ))}
  </ul>
);

export default PrePressTemplate;
