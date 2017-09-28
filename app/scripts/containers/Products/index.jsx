// @flow
import React from 'react';
import { connect } from 'react-redux';
import { productFetch } from 'actions';
import { shouldComponentUpdate, isMobile } from 'utils/helpers';

import Loading from 'components/Loading';
import { BlogBlock, CustomersRelyBlock, BreadcrumbsBlock } from 'components/LandingPage';

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
  shouldComponentUpdate = shouldComponentUpdate;

  componentDidMount() {
    const { match: { params: { slug } }, dispatch } = this.props;

    dispatch(productFetch(slug));
  }

  static props: Props;

  render() {
    const {
      app: {
        screenSize
      },
      products: {
        product,
        categories,
        informations,
        tutorials,
        opinions,
        isRunning,
        isLoaded
      },
      locale: {
        advantages,
        graphic_plant,
        print,
      },
      locale
    } = this.props;


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
        {!isMobile(screenSize) && <BreadcrumbsBlock links={breadcrumb} />}
        <ProductHighlightsBlock category={categories[categories.length - 1]} product={product} screenSize={screenSize} />
        <ProductInformationBlock
          screenSize={screenSize}
          informations={informations}
          locale={locale.informations}
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

