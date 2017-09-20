// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import { corporateSalesFetch } from 'actions';
import corporateSalesSelector from 'selectors/products';

import { CustomersRelyBlock } from 'components/LandingPage';
import MainBenefits from './MainBenefits';
import CloudTools from './CloudTools';
import RequestSample from './RequestSample';

type Props = {
  app: AppStoreType,
  router: RouterStore,
  locale: {},
  CorporateSales: {},
  dispatch: () => {},
};

export class CorporateSales extends React.Component {
  renderBanner() {
    return (
      <div className="container">
        <img src={require('assets/media/images/corporate-sales.png')} alt="Atendimento exclusivo" />
      </div>
    );
  }

  render() {
    return (
      <section>
        {this.renderBanner()}
        <MainBenefits />
        <CloudTools />
        <CustomersRelyBlock />
        <RequestSample />
      </section>
    );
  }
}

function mapStateToProps(state) {
  return corporateSalesSelector(state);
}

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(CorporateSales);
