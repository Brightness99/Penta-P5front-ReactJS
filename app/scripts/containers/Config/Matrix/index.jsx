// @flow

import React from 'react';

import { settingsMatrixFetch } from 'actions';

import Loading from 'components/Loading';

import Zipcode from './Zipcode';
import ShippingTable from './ShippingTable';
import ConfigBlock from '../ConfigBlock';

type Props = {
  locale: {},
  order: number,
  className: string,
  selection: {},
  screenSize: string,
  matrix: {},
  zipcode: number,
  dispatch: () => {},
};

export default class MatrixBlock extends React.Component {
  static props: Props;

  onZipcodeValid = (zipcode: number) => {
    const { dispatch } = this.props;

    dispatch(settingsMatrixFetch(zipcode));
  };

  renderMatrix() {
    const { selection, dispatch, screenSize, matrix } = this.props;
    return (
      <div className="app__config__matrix">
        <Zipcode
          selection={selection}
          onZipcodeValid={this.onZipcodeValid}
          dispatch={dispatch}
        />
        { !matrix.isLoaded && !matrix.isRunning
        ? null
        : <ShippingTable screenSize={screenSize} matrix={matrix} />}
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
