// @flow

import React from 'react';
import { connect } from 'react-redux';

import CustomersRelyBlock from 'containers/CustomersRelyBlock/CustomersRelyBlock';
import GraphicPlantBlock from 'containers/GraphicPlantBlock/GraphicPlantBlock';
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

  // <GraphicPlantBlock />

  render() {
    return (
      <section>
        <p>carousel</p>
        <AboutCloud />
        <BenefitsCloud />
        <BrandIntegrity />
        <CloudCustomized />
        <OrderPlataform />
        <GuiteCloud />
        <CustomersRelyBlock />
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
