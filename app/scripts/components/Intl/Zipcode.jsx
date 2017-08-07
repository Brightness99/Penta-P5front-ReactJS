// @flow

import React from 'react';
import StringMask from 'string-mask';

type Props = {
  className: string,
  children: number,
};

const pattern = '99999-999';

const IntlZipcode = (props: Props) => {
  const { className, children } = props;

  return (
    <span className={className}>
      {new StringMask(pattern).apply(children)}
    </span>
  );
};

export default IntlZipcode;
