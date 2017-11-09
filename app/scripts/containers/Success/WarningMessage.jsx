// @flow

import React from 'react';
import { Warning } from 'components/Icons';

type Props = {
  children: Node,
};

const WarningMessage = (props: Props) => {
  const { children } = props;

  return (
    <div className="warning-message">
      <div className="warning-icon"><Warning /></div>
      <span>
        {children}
      </span>
    </div>
  );
};

export default WarningMessage;
