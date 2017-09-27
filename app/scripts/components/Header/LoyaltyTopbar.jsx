// @flow

import React from 'react';
import { CloseIcon } from 'components/Icons';

const LoyaltyTopbar = () => {
  return (
    <div className="org-loyalty-topbar">
      <div className="container">
        <div className="mol-loyalty-topbar">
          <div>
            <div className="qrk-type-of-loyalty">
              <p>Gold</p>
            </div>
            <p>Você é um membro Printi Club Gold! As etiquetas amarelas sinalizam os benefícios que você tem direito. :)</p>
          </div>
          <div><CloseIcon /></div>
        </div>
      </div>
    </div>
  );
};

export default LoyaltyTopbar;
