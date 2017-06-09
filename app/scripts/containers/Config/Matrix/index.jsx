// @flow

// TODO:

import React from 'react';

import Zipcode from './Zipcode';
import ConfigBlock from '../ConfigBlock';

type Props = {
  locale: {},
  order: number,
  className: string,
  selection: {},
  selectedSource: string,
  dispatch: () => {},
};

export default class MatrixBlock extends React.Component {
  static props: Props;

  renderMatrix() {
    const { selection, selectedSource, dispatch } = this.props;
    return (
      <div className="app__config__matrix">
        <Zipcode
          selection={selection}
          selectedSource={selectedSource}
          dispatch={dispatch}
        />
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
