// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import Breadcrumbs from 'components/Breadcrumbs';
import Sidebar from './Sidebar';
import ArtProposalContent from './ArtProposalContent';

type Props = {
  app: AppStoreType,
  router: RouterStore,
  dispatch: () => {},
  children: any,
};

export class ArtProposal extends React.Component {
  static props: Props;

  renderMobile() {
    return (
      <div className="container-artproposal">
        {this.renderContainer()}
      </div>
    );
  }

  renderDesktop() {
    const { app: { screenSize } } = this.props;

    const breadcrumb = [
      {
        title: 'Home',
        url: '/',
      },
      {
        title: 'Minha conta',
        url: '/minha-conta',
      },
      {
        title: 'Meus pedidos',
        url: '/meus-pedidos',
      },
      {
        title: 'Pedido nº483.093',
      },
      {
        title: 'Proposta de art',
        url: '/proposta-de-arte',
      }
    ];

    return (
      <div className="container">
        <div className="header-artproposal">
          <Breadcrumbs links={breadcrumb} />
          <p className="title">PROPOSTA DE ARTE</p>
          <p className="destitle">Acompanhe a criação da sua arte</p>
        </div>
        <div className="container-artproposal">
          <Sidebar screenSize={screenSize} />
          {this.renderContainer()}
        </div>
      </div>
    );
  }

  renderContainer() {
    const { app: { screenSize } } = this.props;

    return (
      <Switch>
        <Route
          path="/proposta-de-arte/a"
          render={(props) => <ArtProposalContent {...props} screenSize={screenSize} />}
        />
        <Route
          path="/proposta-de-arte/b"
          render={(props) => <ArtProposalContent {...props} screenSize={screenSize} />}
        />
        <Route
          render={(props) => <ArtProposalContent {...props} screenSize={screenSize} />}
        />
      </Switch>
    );
  }

  render() {
    const { app: { screenSize } } = this.props;

    return ['xs', 'is', 'sm', 'ix', 'md', 'im'].includes(screenSize)
      ? this.renderMobile()
      : this.renderDesktop();
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

export default connect(mapStoreToProps, mapDispatchToProps)(ArtProposal);
