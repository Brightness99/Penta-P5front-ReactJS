// @flow

import React from 'react';
import { connect } from 'react-redux';

type Props = {
  text: String,
  account: {},
};

export class LoyaltyContainer extends React.Component {
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
    const { account: { loyalty }, text } = this.props;
    return (
      <div className="org-loyalty-container">
        <div className="mol-loyalty-container" style={this.setBackgroundColor(loyalty.color)}>
          <div>
            <div className="qrk-type-of-loyalty" style={this.setColor(loyalty.color)}>
              <p>{loyalty.loyalty_tier_name}</p>
            </div>
            <p>{text}</p>
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

export default connect(mapStateToProps)(LoyaltyContainer);

