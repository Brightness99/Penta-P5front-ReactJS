// @flow

import React from 'react';

const Infos = (props: { locale: { INFOS: string } }) => (
  <div className="app__footer__infos">
    {props.locale.INFOS}
  </div>
);

export default Infos;
