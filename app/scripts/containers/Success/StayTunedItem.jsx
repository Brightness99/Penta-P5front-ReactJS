// @flow

import React from 'react';
import { AngleRightIcon } from 'components/Icons';

type Props = {
  text: string,
};

const StayTunedItem = (props: Props) => {
  const { text } = props;

  return (
    <div className="stay-tuned-item">
      <AngleRightIcon />
      <div>
        {text}
      </div>
    </div>
  );
};

export default StayTunedItem;
