// @flow

import React from 'react';

type Props = {
  children: {},
  text: string,
};

const Tooltipster = (props: Props) => (
  <div className="mol-tooltip">
    {React.cloneElement(props.children)}
    <div className="atm-tooltip">
      <span>{props.text}</span>
    </div>
  </div>
);

export default Tooltipster;
