// @flow
import React from 'react';
import { connect } from 'react-redux';
import { productFetch } from 'actions';
import { shouldComponentUpdate, isMobile } from 'utils/helpers';

import Loading from 'components/Loading';
import {
  BlogBlock,
  BenefitsBlock,
  BreadcrumbsBlock,
  CustomersRelyBlock,
  GraphicPlantBlock
} from 'components/LandingPage';

import ProductHighlightsBlock from './ProductHighlights';
import ProductInformationBlock from './ProductInformation';
import ProductDetailsBlock from './ProductDetails';
import ProductBannerBlock from './ProductBanner';
import ProductOpinionsBlock from './ProductOpinions';
import ProductWarrantyBlock from './ProductWarranty';
import ProductTutorialsBlock from './ProductTutorials';

type Props = {
  app: AppStoreType,
  router: RouterStore,
  locale: LocaleType,
  match: {},
  products: {},
  dispatch: () => {},
};

export class Products extends React.Component {
  shouldComponentUpdate = shouldComponentUpdate;

  componentDidMount() {
    const { match: { params: { slug } }, dispatch } = this.props;
    console.log('this.props ========>', this.props);
    dispatch(productFetch(slug));
  }

  static props: Props;

  render() {
    const {
      app: {
        screenSize,
      },
      products: {
        product: {
          title,
        },
        isRunning,
        isLoaded,
      },
    } = this.props;

    const breadcrumb = [
      {
        title: 'Home',
        url: '/',
      },
      {
        title,
      },
    ];

    if (isRunning || !isLoaded) {
      return <Loading />;
    }

    return (
      <div>
        {!isMobile(screenSize) && <BreadcrumbsBlock links={breadcrumb} />}
        <ProductHighlightsBlock />
        <ProductInformationBlock />
        <ProductTutorialsBlock />
        <ProductWarrantyBlock />
        <BenefitsBlock />
        <GraphicPlantBlock />
        <CustomersRelyBlock />
        <BlogBlock />
        <ProductOpinionsBlock />
        <ProductDetailsBlock />
        <ProductBannerBlock />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    app: state.app,
    locale: state.locale.translate.page.product_landing_page,
    router: state.router,
    products: state.products,
  };
}

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);
