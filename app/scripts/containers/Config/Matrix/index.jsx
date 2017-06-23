// @flow

import React from 'react';

import { settingsMatrixFetch, settingsZipcodeReset } from 'actions';

import { RoundedTransparentButton } from 'atoms/Buttons';
import { PlusCircleIcon } from 'components/Icons';

import Loading from 'components/Loading';

import Zipcode from './Zipcode';
import ShippingTable from './ShippingTable';
import ConfigBlock from '../ConfigBlock';
import Warning from '../Warning';

type Props = {
  locale: {},
  order: number,
  className: string,
  selection: {},
  screenSize: string,
  matrix: {},
  zipcode: number,
  templates: {},
  dispatch: () => {},
  product: {},
  user: {},
  isCustomEnabled: boolean,
};

export default class MatrixBlock extends React.Component {
  componentDidMount() {
    const { user: { address } } = this.props;

    if (address.isZipcodeValid) {
      this.onZipcodeValid(address.zipcode);
    }
  }

  static props: Props;

  onZipcodeValid = (zipcode: number) => {
    const { dispatch } = this.props;

    dispatch(settingsMatrixFetch(zipcode));
  };

  handleZipcodeReset = () => {
    const { dispatch } = this.props;

    dispatch(settingsZipcodeReset());
  };

  renderMatrix() {
    const { selection, dispatch, screenSize, matrix, templates, product, user, isCustomEnabled } = this.props;

    return (
      <div className="app__config__matrix">
        <Zipcode
          selection={selection}
          onZipcodeValid={this.onZipcodeValid}
          dispatch={dispatch}
          defaultValue={user.address.zipcode}
          isZipcodeValid={user.address.isZipcodeValid}
          errorMessage={user.address.zipcodeErrorMessage}
          onReset={this.handleZipcodeReset}
        />
        { !matrix.isLoaded && !matrix.isRunning
          ? null
          : <ShippingTable
            dispatch={dispatch}
            screenSize={screenSize}
            matrix={matrix}
          />}
        {isCustomEnabled && <RoundedTransparentButton>
          <PlusCircleIcon />
          <span>Adicionar outra quantidade</span>
        </RoundedTransparentButton>}
        <Warning templates={templates} dispatch={dispatch} product={product} />
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
