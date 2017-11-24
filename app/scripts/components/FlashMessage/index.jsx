// @flow

import React from 'react';

import WarningFilled from 'components/Icons/WarningFilled';
import cx from 'classnames';

type Props = {
  type: string,
  title: string,
  content: string,
};

const FlashMessage = (props: Props) => {
  const properties = (() => {
    switch (props.type) {
      case 'warning':
        return {
          class: 'app__flashmessage--warning',
          icon: <WarningFilled />,
        };
      case 'error':
        return {
          class: 'app__flashmessage--error',
          icon: <WarningFilled />,
        };
      default:
        return {
          class: '',
          icon: <WarningFilled />,
        };
    }
  })();

  return (
    <div className={cx('app__flashmessage', properties.class)}>
      <div className="flashmessage-item-container">
        <div className="flashmessage-item-icon-container">
          {properties.icon}
        </div>
        <div className="flashmessage-item-content-container">
          <span className="flashmessage-item-title">{props.title}</span>
          <p className="flashmessage-item-content">{props.content}</p>
        </div>
      </div>
    </div>
  );
};

export default FlashMessage;

