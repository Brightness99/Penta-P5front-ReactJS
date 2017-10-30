// @flow

import React from 'react';
import cx from 'classnames';

type Props = {
  buttonText: any,
  linkText: any,
  className: string,
};

const MethodItem = (props: Props) => {
  const { buttonText, linkText, className } = props;

  return (
    <div className={cx('method-item', className)}>
      <img src={require('assets/media/images/boleto.png')} alt="{buttonText}" />
      <div className="link-1">
        <a>{buttonText}</a>
      </div>
      <div className="link-2">
        <a>{linkText}</a>
      </div>
    </div>
  );
};

export default MethodItem;
