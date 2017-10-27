// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import ArtProposalContent from './ArtProposalContent';

type Props = {
  app: AppStoreType,
  router: RouterStore,
  match: {},
  dispatch: () => {},
  setBreadcrumbs: () => void,
  children: any,
};

export class ArtProposal extends React.Component {
  componentDidMount() {
    this.handleBreadcrumbs();
  }

  static props: Props;

  handleBreadcrumbs = () => {
    const { setBreadcrumbs, match: { params: { orderNumber } } } = this.props;

    if (typeof setBreadcrumbs === 'function') {
      setBreadcrumbs([
        {
          title: 'Meus pedidos',
          url: '/minha-conta/meus-pedidos',
        },
        {
          title: `Pedido nº' ${orderNumber}`,
          url: `/minha-conta/pedidos/${orderNumber}`,
        },
        {
          title: 'Proposta de art',
        },
      ]);
    }
  }

  renderMobile() {
    return (
      <div className="container">
        <div className="header-artproposal mobile-header-artproposal">
          <p className="title">PROPOSTA DE ARTE</p>
        </div>
        <div className="container-artproposal mobile-container-proposal">
          {this.renderContainer()}
        </div>
      </div>
    );
  }

  renderDesktop() {
    const { app: { screenSize } } = this.props;

    return (
      <div className="container">
        <div className="header-artproposal">
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
