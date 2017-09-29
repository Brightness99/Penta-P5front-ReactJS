// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { CustomersRelyBlock, GraphicPlant } from 'components/LandingPage';
import BannerCloud from './BannerCloud';
import AboutCloud from './AboutCloud';
import BenefitsCloud from './BenefitsCloud';
import BrandIntegrity from './BrandIntegrity';
import CloudCustomized from './CloudCustomized';
import OrderPlataform from './OrderPlataform';
import GuiteCloud from './GuiteCloud';

type Props = {
  app: AppStore,
  router: RouterStore,
  locale: {},
  dispatch: () => {},
};

export class CloudCompany extends React.Component {
  static props: Props;

  render() {
    const { app: { screenSize } } = this.props;
    return (
      <section>
        <BannerCloud screenSize={screenSize} />
        <AboutCloud screenSize={screenSize} />
        <BenefitsCloud screenSize={screenSize} />
        <BrandIntegrity screenSize={screenSize} />
        <CloudCustomized screenSize={screenSize} />
        <OrderPlataform screenSize={screenSize} />
        <GuiteCloud screenSize={screenSize} />
        <div className="org-customers-rely">
          <CustomersRelyBlock />
        </div>
        <GraphicPlant />
      </section>
    );
  }
}

function mapStoreToProps(state) {
  return { app: state.app };
}

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStoreToProps, mapDispatchToProps)(CloudCompany);
