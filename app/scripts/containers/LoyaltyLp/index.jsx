// @flow

import React from 'react';
import { connect } from 'react-redux';
import { BannerLoyalty } from './BannerLoyalty';
import { MemberLoyalty } from './MemberLoyalty';
import { BenefitsMembers } from './BenefitsMembers';
import { WhatLost } from './WhatLost';
import { StartPremium } from './StartPremium';

type Props = {
  app: AppStore,
  router: RouterStore,
  locale: {},
  dispatch: () => {},
};

export class LoyaltyLp extends React.Component {
  static props: Props;

  render() {
    const { app: { screenSize } } = this.props;
    return (
      <section className="tpl-loyalty-lp">
        <div className="org-loyalty-lp">
          <div className="mol-banner-member-loyalty">
            <BannerLoyalty screenSize={screenSize} />
            <MemberLoyalty screenSize={screenSize} />
          </div>
          <BenefitsMembers screenSize={screenSize} />
          <WhatLost />
          <StartPremium />
        </div>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return { app: state.app };
}

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoyaltyLp);
