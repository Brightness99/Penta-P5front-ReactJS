// @flow

import React from 'react';
import cx from 'classnames';

type Props = {
  className?: string,
  children: any,
}

const BlockTitle = (props: Props) => (
  <h3
    className={cx(
      'atm__block-title',
      !!props.className && props.className
    )}
  >
    {props.children}
  </h3>
);

export default BlockTitle;
