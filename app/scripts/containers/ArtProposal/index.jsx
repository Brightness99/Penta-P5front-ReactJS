// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import Breadcrumbs from 'components/Breadcrumbs';
import { proposalsFetch } from 'actions';
import Sidebar from './Sidebar';
import ArtProposalContent from './ArtProposalContent';

type Props = {
  app: AppStoreType,
  router: RouterStore,
  dispatch: () => {},
  children: any,
  artCreation: {}
};

//TODO | Ken: This will be replaced with the real item id.
const order_item_id = '801901';

export class ArtProposal extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(proposalsFetch(order_item_id));
  }

  static props: Props;

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
        url: '/Pedido',
      },
      {
        title: 'Proposta de art',
      },
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
    const { app: { screenSize }, artCreation } = this.props;
    console.log('proposals ===> ', artCreation);
    return ['xs', 'is', 'sm', 'ix', 'md', 'im'].includes(screenSize)
      ? this.renderMobile()
      : this.renderDesktop();
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return ({
    app: state.app,
    artCreation: state.artCreation,
  });
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtProposal);
