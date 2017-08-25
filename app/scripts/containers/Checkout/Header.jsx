// @flow

import React from 'react';
import { shouldComponentUpdate } from 'utils/helpers';
import cx from 'classnames';
import { CheckCircleOIcon, CircleIcon } from 'components/Icons';

type Props = {
  activeStep: number,
  onClick: () => {},
};

type State = {
};

export default class Header extends React.Component {
  shouldComponentUpdate = shouldComponentUpdate;

  static props: Props;

  static state: State;

  handleClick = (ev) => {
    const { onClick, activeStep } = this.props;

    if (typeof onClick === 'function' && activeStep > ev.currentTarget.value) {
      onClick(ev);
    }
  };

  renderIcon(state: boolean, number: number) {
    if (state === true) {
      return (
        <div className="atm-checkout-header-icon atm-checkout-header-icon--checked">
          <CheckCircleOIcon />
        </div>
      );
    }

    return (
      <div className="atm-checkout-header-icon atm-checkout-header-icon--unchecked">
        {number}
      </div>
    );
  }

  render() {
    const { activeStep } = this.props;

    return (
      <div className="org-checkout-header">
        <button
          onClick={this.handleClick}
          value={1}
          className={cx(
            'mol-checkout-step',
            activeStep === 1 && 'mol-checkout-step--active',
            activeStep > 1 && 'mol-checkout-step--clickable',
          )}
        >
          {this.renderIcon(activeStep > 1, 1)} Dados
        </button>
        <button
          onClick={this.handleClick}
          value={2}
          className={cx(
            'mol-checkout-step',
            activeStep === 2 && 'mol-checkout-step--active',
            activeStep > 2 && 'mol-checkout-step--clickable',
          )}
        >
          {this.renderIcon(activeStep > 2, 2)} Endereços
        </button>
        <button
          onClick={this.handleClick}
          value={3}
          className={cx(
            'mol-checkout-step',
            activeStep === 3 && 'mol-checkout-step--active',
          )}
        >
          {this.renderIcon(activeStep > 3, 3)} Pagamento
        </button>
      </div>
    );
  }
}
