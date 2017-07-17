// @flow

import React from 'react';

import { CheckCircleIcon } from 'components/Icons';

type Props = {
  children?: any,
}

const SuccessText = (props: Props) => (
  <div className="atm-success-text">
    <CheckCircleIcon /> <span>{props.children}</span>
  </div>
);

export default SuccessText;
