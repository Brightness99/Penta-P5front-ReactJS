// @flow

import React from 'react';

type Props = {
  total: number,
  names: string,
}

const PartsLabel = (props: Props) => {
  if (props.total > 1) {
    return (<div className="app__config__totalPages">Este item possui {props.total} partes: {props.names}</div>);
  }

  return null;
};

export default PartsLabel;
