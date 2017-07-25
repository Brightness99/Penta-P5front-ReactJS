// @flow

import React from 'react';
import { connect } from 'react-redux';

import Breadcrumbs from 'components/Breadcrumbs';
import { PageTitle } from 'atoms/Titles';

type Props = {

};

export class Config extends React.Component {
  static props: Props;

  render() {
    const breadcrumb = [
      {
        title: 'Home',
        url: '/',
      },
      {
        title: 'Seu carrinho',
      },
    ];

    return (
      <div className="page-cart container">
        <Breadcrumbs links={breadcrumb} />
        <PageTitle>Seu Carrinho</PageTitle>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return state;
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(Config);
