// @flow

import React from 'react';

type Props = {
  title: string,
};

const UploaderBox = (props: Props) => {
  const { title } = props;

  return (
    <div className="upload__normalSchema_uploaderBox">
      <span className="uploaderBox-title">{title}</span>
      <div className="uploaderBox-box">
        <button>Procurar arquivo</button>
      </div>
    </div>
  );
};

export default UploaderBox;
