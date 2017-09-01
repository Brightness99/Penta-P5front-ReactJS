// @flow

import React from 'react';
import { PlayCircleIcon } from 'components/Icons';
import { RadioButton } from 'components/Input';

type Props = {
  title: string,
  options: [],
};

const AdditionalOption = (props: Props) => {
  console.log('propriedades de additional option:');
  console.log(props);

  const renderOptions = () => {
    return props.options.map(
      (option) => (
        <p>{option.label}</p>
      )
    );
  };

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
        {/*<RadioButton
          name={'teste'}
          value={'teste'}
          checked={true}
          onChange={console.log('mudou')}
        />*/}

      </div>
    </div>
  );
};

export default AdditionalOption;
