// @flow

import React from 'react';
import config from 'config'; // eslint-disable-line no-unused-vars
import { connect } from 'react-redux';
import { shouldComponentUpdate, isMobile } from 'utils/helpers';

import { BannersBlock, HighlightsBlock, BlogBlock, CustomersRelyBlock, CategoriesCarouselBlock } from 'components/LandingPage';

type Props = {
  screenSize: AppStoreType.screenSize,
};

const bannerImages = [
  {
    link: {
      URL: '/',
      TARGET: 'self',
    },
    file: {
      DESKTOP: 'https://d2ofpir5gh0cbr.cloudfront.net/files/2017-05/1493730548_banner-home-site-1920x420px.jpg',
      MOBILE: 'https://d2ofpir5gh0cbr.cloudfront.net/files/2017-05/1493730557_banner-home-mobile-1578x932px.jpg',
    },
    ALT: 'promo carnaval',
  },
  {
    link: {
      URL: '/',
      TARGET: 'self',
    },
    file: {
      DESKTOP: 'http://dev-cms.printi.com.br/files/2017-02/lan-amentos-printi.png',
      MOBILE: 'http://dev-cms.printi.com.br/files/2017-02/1486471907_lan-amentos-printi.png',
    },
    ALT: 'promo carnaval',
  },
  {
    link: {
      URL: '/',
      TARGET: 'self',
    },
    file: {
      DESKTOP: '',
      MOBILE: 'http://dev-cms.printi.com.br/files/2016-12/1482158857_matix.png',
    },
    ALT: 'mobile only',
  },
  {
    file: {
      DESKTOP: 'http://dev-cms.printi.com.br/files/2016-12/banner-desktop.png',
      MOBILE: '',
    },
    ALT: 'teste somente desktop',
  },
];

export class Home extends React.Component {
  shouldComponentUpdate = shouldComponentUpdate;

  static props: Props;

  renderMobile() {
    return (
      <div className="container-homePage">
        <BannersBlock images={bannerImages} />
        <CategoriesCarouselBlock />
        <HighlightsBlock />
        <CustomersRelyBlock />
        <BlogBlock />
      </div>
    );
  }

  renderDesktop() {
    return (
      <div className="container-homePage">
        <BannersBlock images={bannerImages} />
        <CategoriesCarouselBlock />
        <HighlightsBlock />
        <CustomersRelyBlock />
        <BlogBlock />
      </div>
    );
  }

  render() {
    const { screenSize } = this.props;

    return isMobile(screenSize) ? this.renderMobile() : this.renderDesktop();
  }
}

function mapStateToProps(state) {
  return {
    screenSize: state.app.screenSize,
  };
}

function mapDispatchToProps(dispatch) {
  return { dispatch };
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);
