// @flow 

import React from 'react';
import { CalendarIcon, TimesIcon } from 'components/Icons';

type Props = {
  message: string,
};

class WarningMessage extends React.Component {

  static props: Props;

  render() {

    const { message } = this.props;

    return (
      <div className="warning-message">
        <div className="pull-right">
          <TimesIcon />
        </div>
        <CalendarIcon />
        <span>
          {message}
        </span>
      </div>
    );
  }
}

export default WarningMessage;
