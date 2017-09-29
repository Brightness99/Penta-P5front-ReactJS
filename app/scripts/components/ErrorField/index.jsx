// @flow
import React from 'react';
import cx from 'classnames';
import './error-field.styles.scss';

type Props = {
  message: string,
};

export default class ErrorField extends React.PureComponent {
  props: Props;

  render() {
    const { message } = this.props;
    const isErrorMessageExist = message && message.length > 0;

    return (
      <span className={cx('error-field', { hidden: !isErrorMessageExist })}>{message}</span>
    );
  }
}
