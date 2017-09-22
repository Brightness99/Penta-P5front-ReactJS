// @flow 

import React from 'react';
import { CalendarIcon, TimesIcon } from 'components/Icons';

class WarningMessage extends React.Component {
  render() {
    return (
      <div className="warning-message">
        <div className="pull-right">
          <TimesIcon />
        </div>
        <CalendarIcon />
        <span>
          <b>Prazo de entrega:</b>&nbsp;
          a arte deve ser enviada até as <b>14:00</b> do dia <b>20/11/2016</b>. Após esse período a data para a previsão de entrega será alterada.
        </span>
      </div>
    );
  }
}

export default WarningMessage;
