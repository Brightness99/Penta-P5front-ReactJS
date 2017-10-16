// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { isMobile } from 'utils/helpers';
import { aboutFetch } from 'actions';
import Breadcrumbs from 'components/Breadcrumbs';

import AboutPrintiText from './AboutPrintiText';
import TimelineAboutPrinti from './TimelineAboutPrinti';

type Props = {
  app: AppStore,
  router: RouterStore,
  about: {},
  dispatch: () => {},
};

export class AboutPrinti extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(aboutFetch());
  }

  static props: Props;

  render() {
    const { app: { screenSize }, about } = this.props;
    const breadcrumb = [
      {
        title: 'Home',
        url: '/',
      },
      {
        title: 'Sobre a Printi',
      },
    ];
    return (
      <section>
        <div className="container">
          {!isMobile(screenSize) && <Breadcrumbs links={breadcrumb} />}
        </div>
        <div className="tpl-about-printi">
          <div className="container">
            <h2 className="title-about-printi">Sobre a printi</h2>
          </div>
          <AboutPrintiText />
          {
            (about.isLoaded) ?
              <TimelineAboutPrinti timelines={about.about} /> :
              null
          }
        </div>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    app: state.app,
    about: state.about,
  };
}

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(AboutPrinti);
