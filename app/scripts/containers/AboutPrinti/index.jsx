// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { isMobile } from 'utils/helpers';
import Breadcrumbs from 'components/Breadcrumbs';

import AboutPrintiText from './AboutPrintiText';

type Props = {
  app: AppStore,
  router: RouterStore,
  locale: {},
  dispatch: () => {},
};

export class AboutPrinti extends React.Component {
  static props: Props;

  render() {
    const { app: { screenSize } } = this.props;
    const breadcrumb = [
      {
        title: 'Home',
        url: '/',
      },
      {
        title: 'Printi na imprensa',
      },
    ];

    return (
      <section>
        {!isMobile(screenSize) && <Breadcrumbs links={breadcrumb} />}
        <div className="container">
          <div className="tpl-about-printi">
            <h2 className="title-about-printi">Sobre a printi</h2>
            <AboutPrintiText />
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

export default connect(mapStateToProps, mapDispatchToProps)(AboutPrinti);
