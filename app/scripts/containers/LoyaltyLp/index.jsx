import React from 'react';
import { Link } from 'react-router-dom';
import { BannerLoyalty } from './BannerLoyalty';
import { MemberLoyalty } from './MemberLoyalty';
import { BenefitsMembers } from './BenefitsMembers';
import { WhatLost } from './WhatLost';
import { StartPremium } from './StartPremium';

export class LoyaltyLp extends React.Component {
  render() {
    return (
      <section className="tpl-loyalty-lp">
        <div className="org-loyalty-lp">

          <div className="mol-banner-member-loyalty">
            <BannerLoyalty />
            <MemberLoyalty />
          </div>

          {/* final container tipos de programa de fidelidade*/}
          <BenefitsMembers />
          {/* final container tipos de programa de fidelidade*/}

          {/* começo container o que está perdendo */}
          <WhatLost />
          {/* final container o que está perdendo */}

          {/* começo container ser premium */}
          <StartPremium />
          {/* final container ser premium */}

        </div>
      </section>
    );
  }
}

export default LoyaltyLp;
