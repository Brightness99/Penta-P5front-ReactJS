// @flow

import React from 'react';

const Payments = (props: { locale: { PAYMENT_METHODS: string } }) => (
  <div className="app__footer__payments">
    {props.locale.PAYMENT_METHODS}
  </div>
);

export default Payments;
