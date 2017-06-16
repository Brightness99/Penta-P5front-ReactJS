// @flow

import React from 'react';
import ConfigBlock from './ConfigBlock';

type Props = {
  locale: {},
  order: number,
  className: string,
};

export default class MatrixBlock extends React.Component {
  static props: Props;

  renderMatrix() {
    return (
      <div className="app__config__matrix">
        2
      </div>
    );
  }

  render() {
    const { locale } = this.props;
    return (
      <ConfigBlock
        order="3"
        locale={locale}
        className="app__config__matrix-block"
      >
        {this.renderMatrix()}
      </ConfigBlock>
    );
  }
}