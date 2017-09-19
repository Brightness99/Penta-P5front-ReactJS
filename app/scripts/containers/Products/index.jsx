// @flow
import React from 'react';
import { connect } from 'react-redux';

import { productFetch } from 'actions';
import productsSelector from 'selectors/products';

import { BlogBlock, CustomersRelyBlock } from 'components/LandingPage';
import Loading from 'components/Loading';
import Breadcrumbs from 'components/Breadcrumbs';

import ProductHighlightsBlock from './ProductHighlights';
import ProductInformationBlock from './ProductInformation';

import InformationBlock from './InformationBlock';
import TutorialBlock from './TutorialBlock';
import WarrantyBlock from './WarrantyBlock';
import BenefitsBlock from './BenefitsBlock';
import GraphicPlantBlock from './GraphicPlantBlock';
import OpinionsBlock from './OpinionsBlock';
import DetailsProductBlock from './DetailsProductBlock';
import PrintProductBlock from './PrintProductBlock';

type Props = {
  app: AppStoreType,
  router: RouterStore,
  locale: LocaleType.translate.page.product_landing_page.informations,
  match: {},
  products: {},
  dispatch: () => {},
};

export class Products extends React.Component {
  componentDidMount() {
    const { match: { params: { slug } }, dispatch } = this.props;

    dispatch(productFetch(slug));
  }

  static props: Props;

  renderMobile = () => {
    const { products: { product, informations, tutorials, opinions, isRunning, isLoaded }, app: { screenSize } } = this.props;
    const { locale: { translate: { page: { product_landing_page: { advantages, graphic_plant, print } } } }, locale } = this.props;

    if (isRunning || !isLoaded) {
      return <Loading />;
    }

    return (
      <div>
        <ProductHighlightsBlock screenSize={screenSize} product={product} />
        <ProductInformationBlock
          screenSize={screenSize}
          informations={informations}
          locale={locale.translate.page.product_landing_page.informations}
        />
        <div>
          <TutorialBlock screenSize={screenSize} tutorials={tutorials} />
          <WarrantyBlock screenSize={screenSize} />
          <BenefitsBlock screenSize={screenSize} advantages={advantages} />
          <GraphicPlantBlock screenSize={screenSize} graphic_plant={graphic_plant} />
          <CustomersRelyBlock />
          <BlogBlock />
          <OpinionsBlock screenSize={screenSize} opinions={opinions} />
          <DetailsProductBlock product={product} screenSize={screenSize} />
          <PrintProductBlock product={product} print={print} screenSize={screenSize} />
        </div>
      </div>
    );
  };

  renderDesktop = () => {
    const { products: { product, categories, informations, tutorials, opinions, isRunning, isLoaded }, app: { screenSize } } = this.props;
    const { locale: { translate: { page: { product_landing_page: { advantages, graphic_plant, print } } } }, locale } = this.props;
    const breadcrumb = [
      {
        title: 'Home',
        url: '/',
      },
      {
        title: product.title,
      },
    ];

    if (isRunning || !isLoaded) {
      return <Loading />;
    }

    return (
      <div>
        <Breadcrumbs links={breadcrumb} />
        <ProductHighlightsBlock category={categories[categories.length - 1]} product={product} screenSize={screenSize} />
        <ProductInformationBlock
          screenSize={screenSize}
          informations={informations}
          locale={locale.translate.page.product_landing_page.informations}
        />
        <div>
          <TutorialBlock screenSize={screenSize} tutorials={tutorials} />
          <WarrantyBlock screenSize={screenSize} />
          <BenefitsBlock screenSize={screenSize} advantages={advantages} />
          <GraphicPlantBlock screenSize={screenSize} graphic_plant={graphic_plant} />
          <CustomersRelyBlock />
          <BlogBlock />
          <OpinionsBlock screenSize={screenSize} opinions={opinions} />
          <DetailsProductBlock product={product} screenSize={screenSize} />
          <PrintProductBlock product={product} print={print} screenSize={screenSize} />
        </div>
      </div>
    );
  };

  render() {
    const { products: { isRunning, isLoaded }, app: { screenSize } } = this.props;

    if (isRunning || !isLoaded) {
      return <Loading />;
    }

    return ['xs', 'is', 'sm', 'ix', 'md', 'im'].includes(screenSize)
      ? this.renderMobile()
      : this.renderDesktop();
  }
}

function mapStateToProps(state) {
  return {
    app: state.app,
    locale: state.locale,
    router: state.router,
    products: state.products,
  };
}

function mapDispatchToProps(dispatch) {
  return { dispatch };
}


export default connect(mapStateToProps, mapDispatchToProps)(Products);

