// @flow

import React from 'react';

type Props = {
  selection: [],
};

const Summary = (props: Props) => (
  <div className="app__settings__summary">
    <h3>Resumo</h3>
    {Object.keys(props.selection).map((selection) => (
      <div key={selection}>
        <b>{selection}:</b>
        {Object.keys(props.selection[selection]).map((item) => (
          <div key={item}>
            <span>{item}: {props.selection[selection][item]}</span>
          </div>
        ))}
      </div>
    ))}
  </div>
);

export default Summary;
