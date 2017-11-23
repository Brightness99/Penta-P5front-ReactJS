// @flow

import React from 'react';
import { connect } from 'react-redux';
import { shouldComponentUpdate } from 'utils/helpers';
import { accountLoyaltyFetch } from 'actions';
import LogoLoyalty from 'components/LogoLoyalty';

type Props = {
  component: string,
  loyalty: {},
  loyaltyFetch: () => {},
};

export class LoyaltyContainer extends React.Component {
  shouldComponentUpdate = shouldComponentUpdate;

  componentDidMount() {
    const { loyalty, loyaltyFetch } = this.props;

    if ((!loyalty || !loyalty.loyalty_tier_id) && typeof loyaltyFetch === 'function') {
      loyaltyFetch();
    }
  }

  static props: Props;

  render() {
    const { loyalty, component } = this.props;

    if (!loyalty || !loyalty.loyalty_tier_id) {
      return null;
    }

    return (
      <div className="org-loyalty-container" style={{ backgroundColor: loyalty.color }}>
        <LogoLoyalty short={true} invert={true} key="LogoLoyalty" />
        {loyalty[component] || ''}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loyalty: state.account.loyalty,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loyaltyFetch: () => dispatch(accountLoyaltyFetch()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoyaltyContainer);

