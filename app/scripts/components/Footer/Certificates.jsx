// @flow

import React from 'react';

const Certificates = (props: { locale: { CERTIFICATES: string } }) => (
  <div className="app__footer__certificates">
    {props.locale.CERTIFICATES}
  </div>
);

export default Certificates;
