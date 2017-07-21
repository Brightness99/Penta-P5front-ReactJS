// @flow

import React from 'react';

import { TimesCircleIcon } from 'components/Icons';

type Props = {
  children?: any,
}

const ErrorText = (props: Props) => (
  <div className="atm-error-text">
    <TimesCircleIcon /> <span>{props.children}</span>
  </div>
);

export default ErrorText;
