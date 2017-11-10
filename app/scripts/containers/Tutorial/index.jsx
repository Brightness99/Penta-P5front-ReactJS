// @flow

import React from 'react';
import { connect } from 'react-redux';
import BannerTutorial from './BannerTutorial';
import Sidebar from './Sidebar';
import CardsList from './CardsList';

type Props = {
  app: AppStore,
  router: RouterStore,
  locale: {},
  dispatch: () => {},
};
export class Tutorial extends React.Component {
  static props: Props;

  render() {
    const { app: { screenSize } } = this.props;
    return (
      <section className="tpl-tutorial">
        <div className="org-tutorial">
          <BannerTutorial screenSize={screenSize} />
          <div className="container">
            <h2 className="title-tutorial">Tutoriais</h2>
            <div className="mol-content-tutorial">
              <Sidebar screenSize={screenSize} />
              <CardsList screenSize={screenSize} />
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Tutorial);
