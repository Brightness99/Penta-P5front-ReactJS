// @flow

import React from 'react';
import cx from 'classnames';

type Props = {
  className?: string,
  children: any,
}

const PageTitle = (props: Props) => (
  <h2
    className={cx(
      'atm__page-title',
      !!props.className && props.className
    )}
  >
    {props.children}
  </h2>
);

export default PageTitle;
