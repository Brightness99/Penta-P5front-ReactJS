// @flow
import React from 'react';
import { connect } from 'react-redux';
import BannerWork from './BannerWork';
import DetailsWork from './DetailsWork';
import OwnersComment from './OwnersComment';
import WeSearch from './WeSearch';
import LookJobs from './LookJobs';

type Props = {
  app: AppStore,
  router: RouterStore,
  locale: {},
  dispatch: () => {},
};

export class Work extends React.Component {
  static props: Props;

  render() {
    const { app: { screenSize } } = this.props;
    return (
      <section className="tpl-work-us">
        <BannerWork screenSize={screenSize} />
        <DetailsWork screenSize={screenSize} />
        <OwnersComment />
        <WeSearch />
        <LookJobs screenSize={screenSize} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Work);
