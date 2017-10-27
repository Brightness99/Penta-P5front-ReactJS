// @flow
import React from 'react';
import { connect } from 'react-redux';
import { isMobile } from 'utils/helpers';
import Breadcrumbs from 'components/Breadcrumbs';
import SearchCentralRelationship from './SearchCentralRelationship';
import ItensHelpcenter from './ItensHelpcenter';
import RelationshipCentral from './RelationshipCentral';
import VideosPrinti from './VideosPrinti';

type Props = {
  app: AppStore,
  router: RouterStore,
  locale: {},
  dispatch: () => {},
};

export class HelpCenterPage extends React.Component {

  static props: Props;

  render() {
    const { app: { screenSize } } = this.props;

    const breadcrumb = [
      {
        title: 'Home',
        url: '/',
      },
      {
        title: 'Central de ajuda',
      },
    ];

    return (
      <section>
        <div className="tpl-help-center">
          <div className="container">
            {!isMobile(screenSize) && <Breadcrumbs links={breadcrumb} />}
            <SearchCentralRelationship />
            <ItensHelpcenter />
            <VideosPrinti screenSize={screenSize} />
            <RelationshipCentral />
          </div>
        </div>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return { app: state.app };
}

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(HelpCenterPage);

