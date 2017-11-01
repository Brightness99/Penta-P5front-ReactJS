// @flow

import React from 'react';
import { CalendarIcon, TimesIcon } from 'components/Icons';

type Props = {
  children: Node,
};

const WarningMessage = (props: Props) => {
  const { children } = props;

  return (
    <div className="warning-message">
      <div className="pull-right">
        <TimesIcon />
      </div>
      <CalendarIcon />
      <span>
        {children}
      </span>
    </div>
  );
};

export default WarningMessage;
