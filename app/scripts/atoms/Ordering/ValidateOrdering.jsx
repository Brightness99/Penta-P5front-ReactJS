// @flow

import React from 'react';
import cx from 'classnames';
import { CheckIcon } from 'components/Icons';

type Props = {
  isComplete: boolean,
  order: number,
};

const ValidateOrdering = (props: Props) => (
  <div className={cx('atm-valid-order', props.isComplete && 'completed')}>
    {props.isComplete ? <CheckIcon /> : props.order }
  </div>
);

export default ValidateOrdering;
