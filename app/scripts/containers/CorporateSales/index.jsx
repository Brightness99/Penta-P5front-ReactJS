// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import { corporateSalesFetch } from 'actions';
import corporateSalesSelector from 'selectors/products';

import CustomersRelyBlock from 'containers/CustomersRelyBlock/CustomersRelyBlock';
import MainBenefits from './MainBenefits';
import CloudTools from './CloudTools';
import RequestSample from './RequestSample';

type Props = {
  app: AppStore,
  router: RouterStore,
  locale: {},
  CorporateSales: {},
  dispatch: () => {};
}

export class CorporateSales extends React.Component {
  render() {
    return (
      <div>
        <MainBenefits />
        <CloudTools />
        <CustomersRelyBlock />
        <RequestSample />
      </div>
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
