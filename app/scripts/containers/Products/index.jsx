// @flow
import React from 'react';
import { connect } from 'react-redux';

import { productFetch } from 'actions';
import productsSelector from 'selectors/products';

import Loading from 'components/Loading';

import ProductBlock from './ProductBlock';
import InformationBlock from './InformationBlock';
import TutorialBlock from './TutorialBlock';
import WarrantyBlock from './WarrantyBlock';
import BenefitsBlock from './BenefitsBlock';
import GraphicPlantBlock from './GraphicPlantBlock';
import CustomersRelyBlock from './CustomersRelyBlock';
import OpinionsBlock from './OpinionsBlock';
import DetailsProductBlock from './DetailsProductBlock';
import PrintProductBlock from './PrintProductBlock';
import BlogBlock from './BlogBlock';

type Props = {
  app: AppStore,
  router: RouterStore,
  locale: {},
  match: {},
  products: {},
  dispatch: () => {},
};

export class Products extends React.Component {
  componentDidMount() {
    const { match: { params: { slug } }, dispatch, app: { screenSize } } = this.props;

    dispatch(productFetch(slug));
  }

  static props: Props;

  renderMobile = () => {
    const { products: { product, warrantInformation, opinions, tutorials, isRunning, isLoaded }, app: { screenSize } } = this.props;

    if (isRunning || !isLoaded) {
      return <Loading />;
    }

    return (
      <div>
        <div className="container">
          <ProductBlock product={product} screenSize={screenSize} />
        </div>
        <div className="bgProduct">
          <div className="container">
            <InformationBlock screenSize={screenSize} />
            <TutorialBlock screenSize={screenSize} tutorials={tutorials} />
            <WarrantyBlock screenSize={screenSize} />
            <BenefitsBlock screenSize={screenSize} />
            <GraphicPlantBlock screenSize={screenSize} />
            <CustomersRelyBlock screenSize={screenSize} />
            <BlogBlock />
            <OpinionsBlock screenSize={screenSize} opinions={opinions} />
            <DetailsProductBlock product={product} screenSize={screenSize} />
            <PrintProductBlock product={product} warrantInformation={warrantInformation} screenSize={screenSize} />
          </div>
        </div>
      </div>
    );
  };

  renderDesktop = () => {
    const { products: { product, warrantInformation, settingsPageLink, informations, categories, tutorials, opinions, isRunning, isLoaded }, app: { screenSize } } = this.props;

    if (isRunning || !isLoaded) {
      return <Loading />;
    }

    return (
      <div>
        <div className="container">
          <ProductBlock product={product} screenSize={screenSize} />
        </div>
        <div className="bgProduct">
          <div className="container">
            <InformationBlock screenSize={screenSize} />
            <TutorialBlock screenSize={screenSize} tutorials={tutorials} />
            <WarrantyBlock screenSize={screenSize} />
            <BenefitsBlock screenSize={screenSize} />
            <GraphicPlantBlock screenSize={screenSize} />
            <CustomersRelyBlock screenSize={screenSize} />
            <BlogBlock />
            <OpinionsBlock screenSize={screenSize} opinions={opinions} />
            <DetailsProductBlock product={product} screenSize={screenSize} />
            <PrintProductBlock product={product} warrantInformation={warrantInformation} informations={informations} settingsPageLink={settingsPageLink} categories={categories} tutorials={tutorials} screenSize={screenSize} />
          </div>
        </div>
      </div>
    );
  }

  render() {
    //const { app: { screenSize } } = this.props;
    const { products: { product, warrantInformation, informations, categories, isRunning, isLoaded }, app: { screenSize } } = this.props;

    if (isRunning || !isLoaded) {
      return <Loading />;
    }

    return ['xs', 'is', 'sm', 'ix', 'md', 'im'].includes(screenSize)
      ? this.renderMobile()
      : this.renderDesktop();
  }
}

function mapStateToProps(state) {
  return productsSelector(state);
}

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);

