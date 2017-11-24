// @flow

import React from 'react';

import { settingsMatrixFetch, settingsZipcodeReset } from 'actions';
import MoreInfo from 'components/MoreInfo';
import { FunnelBlock } from 'components/Funnel';

import Loading from 'components/Loading';

import Zipcode from './Zipcode';
import ShippingTable from './ShippingTable';
import Warning from '../Warning';

type Props = {
  locale: {},
  order: number,
  className: string,
  selection: {},
  screenSize: string,
  matrix: {},
  templates: {},
  dispatch: () => {},
  product: {},
  config: {},
  isCustomEnabled: boolean,
  onSelect: () => {},
  loyalty: {},
};

export default class MatrixBlock extends React.Component {
  componentDidMount() {
    const { config: { zipcode } } = this.props;

    if (zipcode.isZipcodeValid) {
      this.onZipcodeValid(zipcode.value);
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

  handleSelection = (ev) => {
    const { onSelect } = this.props;

    if (typeof onSelect === 'function') {
      onSelect(ev);
    }
  };

  renderDeliveryMethods() {
    const { selection, dispatch, config: { zipcode } } = this.props;

    return (
      <Zipcode
        selection={selection}
        onZipcodeValid={this.onZipcodeValid}
        dispatch={dispatch}
        defaultValue={zipcode.value}
        isZipcodeValid={zipcode.isZipcodeValid}
        errorMessage={zipcode.zipcodeErrorMessage}
        onReset={this.handleZipcodeReset}
      />
    );
  }

  renderMatrix() {
    const { dispatch, screenSize, matrix, loyalty, locale, isCustomEnabled } = this.props;

    return (
      <div className="app__config__matrix">
        {this.renderDeliveryMethods()}
        {!matrix.isLoaded && !matrix.isRunning
          ? null
          : [
            <ShippingTable
              key="matrix"
              dispatch={dispatch}
              screenSize={screenSize}
              matrix={matrix}
              onSelect={this.handleSelection}
              loyalty={loyalty}
              isCustomEnabled={isCustomEnabled}
              locale={locale}
            />,
            <Warning
              locale={locale}
              key="warning"
            />,
          ]
        }
      </div>
    );
  }

  render() {
    const { locale, order, screenSize } = this.props;

    return (
      <FunnelBlock
        order={order}
        locale={locale}
        screenSize={screenSize}
        header={[
          <span key="options-block-title">{locale.TITLE}</span>,
          <MoreInfo key="options-block-more-info" text={locale.MORE_INFO_TEXT} />,
        ]}
        className="app__config__matrix-block"
      >
        {this.renderMatrix()}
      </FunnelBlock>
    );
  }
}
