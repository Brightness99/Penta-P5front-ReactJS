// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { CustomersRely } from 'components/LandingPage';
import GraphicPlantBlock from 'containers/GraphicPlantBlock/GraphicPlantBlock';
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
  dispatch: () => {},
  children: any,
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
          <CustomersRely screenSize={screenSize} />
        </div>
        <GraphicPlantBlock screenSize={screenSize} />
      </section>
    );
  }
}

/* istanbul ignore next */
function mapStoreToProps(state) {
  return ({
    app: state.app,
  });
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStoreToProps, mapDispatchToProps)(CloudCompany);
