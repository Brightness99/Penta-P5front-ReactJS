// @flow

import React from 'react';

const Disclaimer = (props: { locale: { RIGHTS_RESERVED: string }}) => (
  <div className="app__footer__disclaimer">
    © {new Date(Date.now()).getFullYear()} - Printi. {props.locale.RIGHTS_RESERVED}
  </div>
);

export default Disclaimer;
