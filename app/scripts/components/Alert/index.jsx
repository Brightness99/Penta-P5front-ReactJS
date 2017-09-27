// @flow

import React from 'react';

import WarningFilled from 'components/Icons/WarningFilled';
import cx from 'classnames';

type Props = {
  type: string,
  title: string,
  message: string,
};

const Alert = (props: Props) => {
  const properties = (() => {
    switch (props.type) {
      case 'warning':
        return {
          class: 'app__alert--warning',
          icon: <WarningFilled />,
        };
      case 'error':
        return {
          class: 'app__alert--error',
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
    <div className={cx('app__alert', properties.class)}>
      <div className="alert-item-container">
        <div className="alert-item-icon-container">
          {properties.icon}
        </div>
        <div className="alert-item-content-container">
          <span className="alert-item-title">{props.title}</span>
          <p className="alert-item-content">{props.message}</p>
        </div>
      </div>
    </div>
  );
};

export default Alert;

