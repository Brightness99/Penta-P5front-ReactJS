// @flow

import React from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import { shouldComponentUpdate } from 'utils/helpers';

type Props = {
  short: boolean,
  invert: boolean,
  loyalty: {},
  size: 'sm' | 'md' | 'lg',
};

export class LogoLoyalty extends React.Component {
  static defaultProps = {
    short: false,
    invert: false,
    size: 'md',
  };

  shouldComponentUpdate = shouldComponentUpdate;

  static props: Props;

  handleColors = () => {
    const { loyalty, invert } = this.props;

    return ({
      backgroundColor: invert ? '#fff' : loyalty.color,
      color: invert ? loyalty.color : '#fff',
    });
  };

  render() {
    const { loyalty, short, size } = this.props;
    console.log(size);
    if (!loyalty.color) {
      return null;
    }

    return (
      <div
        className={cx(
          'mol-logo-loyalty',
          !!size && `mol-logo-loyalty--${size}`
        )}
      >
        {!short && <span>Club</span>}
        {loyalty.color && <div style={this.handleColors()}>{loyalty.loyalty_tier_name}</div>}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loyalty: state.account.loyalty,
  };
}

export default connect(mapStateToProps)(LogoLoyalty);
