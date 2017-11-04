// @flow

import React from 'react';
import config from 'config'; // eslint-disable-line no-unused-vars
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { shouldComponentUpdate } from 'utils/helpers';
import { accountFetch } from 'actions/account';

import {
  BannersBlock,
  HighlightsBlock,
  BlogBlock,
  CustomersRelyBlock,
  CategoriesCarouselBlock
} from 'components/LandingPage';
import Loading from 'components/Loading/index';

type Props = {
  screenSize: AppStoreType.screenSize,
  locale: SEOLocaleType,
  account: {},
  accountFetch: () => void,
  accountEffects: {
    isRunning: boolean,
    isLoaded: boolean,
  },
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
      DESKTOP: `${config.basePath}files/2017-02/lan-amentos-printi.png`,
      MOBILE: `${config.basePath}files/2017-02/1486471907_lan-amentos-printi.png`,
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
      MOBILE: `${config.basePath}files/2016-12/1482158857_matix.png`,
    },
    ALT: 'mobile only',
  },
  {
    file: {
      DESKTOP: `${config.basePath}files/2016-12/banner-desktop.png`,
      MOBILE: '',
    },
    ALT: 'teste somente desktop',
  },
];

export class Home extends React.Component {
  shouldComponentUpdate = shouldComponentUpdate;

  componentDidMount() {
    this.props.accountFetch();
  }

  static props: Props;

  render() {
    const { locale, accountEffects } = this.props;
    const { isRunning } = accountEffects;

    if (isRunning) {
      return <Loading />;
    }

    return (
      <div className="container-homePage">
        <Helmet>
          <title>{locale.seo.PAGE_TITLE}</title>
          <meta name="description" content={locale.seo.META_DESCRIPTION} />
        </Helmet>
        <BannersBlock images={bannerImages} />
        <CategoriesCarouselBlock />
        {locale.COUNTRY_CODE === 'BR' && <HighlightsBlock />}
        <CustomersRelyBlock />
        {locale.COUNTRY_CODE === 'BR' && <BlogBlock />}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { account, locale } = state;
  const { isRunning, isLoaded } = account;
  return ({
    locale: {
      ...locale.translate.page.home,
      COUNTRY_CODE: locale.COUNTRY_CODE,
    },
    account,
    accountEffects: { isRunning, isLoaded },
  });
};

const mapDispatchToProps = (dispatch) => ({
  accountFetch: () => dispatch(accountFetch()),
});


export default connect(mapStateToProps, mapDispatchToProps)(Home);
