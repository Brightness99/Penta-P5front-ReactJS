// @flow

import React from 'react';

import WarningFilled from 'components/Icons/WarningFilled';
import cx from 'classnames';

type Props = {
  type: string,
  title: string,
  content: string,
};

const Alert = (props: Props) => {
  const properties = {
    class: '',
    icon: <WarningFilled />,
  };

  switch (props.type) {
    case 'warning':
      properties.class = 'app__alert--warning';
      properties.icon = <WarningFilled />;
      break;
    case 'error':
      properties.class = 'app__alert--error';
      properties.icon = <WarningFilled />;
      break;
    default:
      break;
  }

  return (
    <div className={cx('app__alert', properties.class)}>
      <div className="alert-item-container">
        <div className="alert-item-icon-container">
          {properties.icon}
        </div>
        <div className="alert-item-content-container">
          <span className="alert-item-title">{props.title}</span>
          <p className="alert-item-content">{props.content}</p>
        </div>
      </div>
    </div>
  );
};

export default Alert;

