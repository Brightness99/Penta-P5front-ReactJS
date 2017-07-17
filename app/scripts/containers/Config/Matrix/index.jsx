// @flow

import React from 'react';

import { settingsMatrixFetch } from 'actions';

import { RoundedTransparentButton } from 'atoms/Buttons';
import { PlusCircleIcon } from 'components/Icons';

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
};

export default class MatrixBlock extends React.Component {
  static props: Props;

  onZipcodeValid = (zipcode: number) => {
    const { dispatch } = this.props;

    dispatch(settingsMatrixFetch(zipcode));
  };

  renderMatrix() {
    const { selection, dispatch, screenSize, matrix, templates } = this.props;
    return (
      <div className="app__config__matrix">
        <Zipcode
          selection={selection}
          onZipcodeValid={this.onZipcodeValid}
          dispatch={dispatch}
        />
        { !matrix.isLoaded && !matrix.isRunning
          ? null
          : <ShippingTable
            dispatch={dispatch}
            screenSize={screenSize}
            matrix={matrix}
          />}
        <RoundedTransparentButton>
          <PlusCircleIcon />
          <span>Adicionar outra quantidade</span>
        </RoundedTransparentButton>
        <Warning templates={templates} />
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
