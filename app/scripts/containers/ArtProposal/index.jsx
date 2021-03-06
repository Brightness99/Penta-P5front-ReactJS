// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import Breadcrumbs from 'components/Breadcrumbs';
import { proposalsFetch } from 'actions';
import Sidebar from './Sidebar';
import ArtProposalContent from './ArtProposalContent';
import BriefingContent from './BriefingContent';

type Props = {
  app: AppStoreType,
  router: RouterStore,
  match: {},
  dispatch: () => {},
  setBreadcrumbs: () => void,
  children: any,
  artCreation: any,
};

type State = {
  activeIndex: number,
};

//TODO | Ken: This will be replaced with the real item id.
//const order_item_id = '801901';
const order_item_id = '801904';
export class ArtProposal extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0,
    };
  }

  componentDidMount() {
    const { match: { params: { orderItemId } }, dispatch } = this.props;
    this.handleBreadcrumbs();
    dispatch(proposalsFetch(orderItemId));
  }

  componentWillReceiveProps(nextProps) {
    const { artCreation } = this.props;
    if (nextProps.artCreation.file.url !== artCreation.file.url && nextProps.artCreation.file.url !== '') {
      setTimeout(() => {
        const response = {
          file: nextProps.artCreation.file.url,
        };
        window.open(response.file);
      }, 100);
    }
  }

  static props: Props;

  static state: State;

  handleBreadcrumbs = () => {
    const { setBreadcrumbs, match: { params: { orderNumber, orderItemId } } } = this.props;

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
          title: `Pedido nº' ${orderItemId} - Proposta de art`,
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

  sideBarClickHandler = (index) => {
    this.setState({ activeIndex: index });
  }

  renderDesktop() {
    const { app: { screenSize }, artCreation } = this.props;
    const { activeIndex } = this.state;
    let sideBar = null;
    const label = (artCreation.proposals.list.length === 0) ?
      'There isn\'t any proposal' :
      'Acompanhe a criação da sua arte';
    return (
      <div className="container">
        <div className="header-artproposal">
          <p className="title">PROPOSTA DE ARTE</p>
          <p className="destitle">{label}</p>
        </div>
        {
          (artCreation.proposals.isLoaded) ?
          (
            <div className="container-artproposal">
              <Sidebar
                screenSize={screenSize}
                proposals={artCreation.proposals.list}
                activeIndex={activeIndex}
                onSidebarItemClick={this.sideBarClickHandler}
              />
              {this.renderContainer()}
            </div>
          ) :
          null
        }
      </div>
    );
  }

  renderContainer() {
    const { app: { screenSize }, artCreation, match } = this.props;

    const { activeIndex } = this.state;
    const renderContainerMark = (activeIndex === artCreation.proposals.list.length) ?
      (
        <BriefingContent
          activeIndex={this.state.activeIndex}
          proposals={artCreation.proposals.list}
          screenSize={screenSize}
          match={match}
        />
      ) :
      (artCreation.proposals.list.length !== 0) &&
      (
        <ArtProposalContent
          activeIndex={this.state.activeIndex}
          proposals={artCreation.proposals.list}
          screenSize={screenSize}
          match={match}
        />
      );

    return renderContainerMark;
  }

  render() {
    const { app: { screenSize } } = this.props;
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
