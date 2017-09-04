// @flow

import React from 'react';

import UploaderBox from './UploaderBox';

type Props = {
  boxes: []
};
/*fazer arraymap aqui*/
const Normal = (props: Props) => {
  return (
    <div className="upload-container-centralized">
      <div className="upload__normalSchema-two">
        <UploaderBox title="Arte 2" />
      </div>
    </div>
  );
};

export default Normal;
