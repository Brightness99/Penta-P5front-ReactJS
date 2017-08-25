// @flow

import React from 'react';

import WarningFilled from 'components/Icons/WarningFilled';

// type Props = {
//   alerts: [],
// };

const Alert = () => (
  <div className="app__alert">
    <div className="alert-item-container">
      <div className="alert-item-icon-container">
        <WarningFilled />
      </div>
      <div className="alert-item-content-container">
        <span className="alert-item-title">Atenção!</span>
        <p className="alert-item-content">A arte deve ser enviada até 22/08/17 às 20:00 . Após esse período a previsão de entrega será alterada.</p>
      </div>
    </div>
  </div>
);

export default Alert;

