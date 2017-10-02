// @flow

import React from 'react';
import { PlayCircleIcon } from 'components/Icons';

type Props = {
  title: string,
  options: [],
};

const AdditionalOption = (props: Props) => {
  const renderOptions = () => (
    props.options.map(
      (option) => (
        <p key={option.label}>{option.label}</p>
      )
    )
  );

  return (
    <div className="container-midSide">
      <div className="additionalOptions-box">
        <div className="additionalOptions-box-title">
          <span className="title">{props.title}</span>
          <span className="midia">
            <i className="midiaIcon"><PlayCircleIcon /></i>
            <button>Vídeo explicativo</button>
          </span>
        </div>
        {renderOptions()}
      </div>
    </div>
  );
};

export default AdditionalOption;
