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
    const { dispatch } = this.props;
    dispatch(proposalsFetch(order_item_id));
  }

  static props: Props;

  static state: State;

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
    console.log('artCreation in the index ======>', artCreation);

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
    const { app: { screenSize }, artCreation } = this.props;
    console.log('proposals map to artpropsalcontent ====>', artCreation.proposals.list);
    console.log('proposals map to artpropsalcontent ====>', artCreation.proposals.list);
    return (
      <ArtProposalContent
        activeIndex={this.state.activeIndex}
        proposals={artCreation.proposals.list}
        screenSize={screenSize}
      />
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
