// @flow

import React from 'react';
import { connect } from 'react-redux';
import { CloseIcon } from 'components/Icons';

export class LoyaltyTopbar extends React.Component {
  props: Props;

  setBackgroundColor = (color) => {
    return {
      background: color,
    };
  }

  setColor = (color) => {
    return {
      color,
    };
  }

  render() {
    const { account: { loyalty } } = this.props;
    return (
      <div className="org-loyalty-topbar" style={this.setBackgroundColor(loyalty.color)}>
        <div className="container">
          <div className="mol-loyalty-topbar">
            <div>
              <div className="qrk-type-of-loyalty" style={this.setColor(loyalty.color)}>
                <p>{loyalty.loyalty_tier_name}</p>
              </div>
              <p>{loyalty.header}</p>
            </div>
            <div><CloseIcon /></div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    account: state.account,
  };
}

export default connect(mapStateToProps)(LoyaltyTopbar);
