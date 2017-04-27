// @flow

import React from 'react';

const Payments = (props: { locale: { SUPPORT: string } }) => (
  <div className="app__footer__support">
    {props.locale.SUPPORT}
  </div>
);

export default Payments;
