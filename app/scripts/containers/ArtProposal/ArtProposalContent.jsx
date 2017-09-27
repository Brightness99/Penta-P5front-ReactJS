// @flow
import React from 'react';
import Breadcrumbs from 'components/Breadcrumbs';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ProposalItem from './ProposalItem';

type Props = {
  screenSize: string,
};

export class ArtProposalContent extends React.Component {
  static defaultProps = {
    screenSize: 'xs',
  };

  static props: Props;

  renderMobile() {
    return (
      <div>d</div>
    );
  }

  renderDesktop() {
    return (
      <div className="container-proposal">
        <div className="content-proposal">
          <div className="proposal-header">
            <h2 className="title-proposal">Proposta 2</h2>
            <div className="container-right">
              <div className="container-status">
                <p className="sidetitle regular">Última alteração</p>
                <p className="sidetitle">22/04/2015 | 11:35</p>
              </div>
              <div className="container-status">
                <p className="sidetitle regular">Status</p>
                <span><image className="status-image" /></span>
                <p className="sidetitle">22/04/2015 | 11:35</p>
              </div>
            </div>
          </div>
          <p className="subtitle">Alteração solicitada</p>
          <ProposalItem />
        </div>
      </div>
    );
  }

  render() {
    const { screenSize } = this.props;

    return ['xs', 'is', 'sm', 'ix', 'md', 'im'].includes(screenSize)
      ? this.renderMobile()
      : this.renderDesktop();
  }
}

function mapStateToProps(state) {
  return {
    account: state.account,
  };
}

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtProposalContent);

