// @flow
import React from 'react';
import { connect } from 'react-redux';

import { productFetch } from 'actions';
import productsSelector from 'selectors/products';

import Blog from 'containers/Blog/Blog';
import CustomersRelyBlock from 'containers/CustomersRelyBlock/CustomersRelyBlock';
import Loading from 'components/Loading';

import ProductBlock from './ProductBlock';
import InformationBlock from './InformationBlock';
import TutorialBlock from './TutorialBlock';
import WarrantyBlock from './WarrantyBlock';
import BenefitsBlock from './BenefitsBlock';
import GraphicPlantBlock from './GraphicPlantBlock';
import OpinionsBlock from './OpinionsBlock';
import DetailsProductBlock from './DetailsProductBlock';
import PrintProductBlock from './PrintProductBlock';

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
    const { match: { params: { slug } }, dispatch } = this.props;

    dispatch(productFetch(slug));
  }

  static props: Props;

  renderMobile = () => {
    const { products: { product, informations, tutorials, opinions, isRunning, isLoaded }, app: { screenSize } } = this.props;
    const { locale: { translate: { page: { product_landing_page: { advantages, graphic_plant, print }, home: { clients, testimonials } } } } } = this.props;

    if (isRunning || !isLoaded) {
      return <Loading />;
    }

    return (
      <div>
        <div className="bgProduct">
          <div className="container">
            <ProductBlock product={product} screenSize={screenSize} />
          </div>
        </div>
        <div>
          <div className="container">
            <InformationBlock screenSize={screenSize} informations={informations} />
            <TutorialBlock screenSize={screenSize} tutorials={tutorials} />
            <WarrantyBlock screenSize={screenSize} />
            <BenefitsBlock screenSize={screenSize} advantages={advantages} />
            <GraphicPlantBlock screenSize={screenSize} graphic_plant={graphic_plant} />
            <CustomersRelyBlock />
            <Blog />
            <OpinionsBlock screenSize={screenSize} opinions={opinions} />
            <DetailsProductBlock product={product} screenSize={screenSize} />
            <PrintProductBlock product={product} print={print} screenSize={screenSize} />
          </div>
        </div>
      </div>
    );
  };

  renderDesktop = () => {
    const { products: { product, informations, tutorials, opinions, isRunning, isLoaded }, app: { screenSize } } = this.props;
    const { locale: { translate: { page: { product_landing_page: { advantages, graphic_plant, print }, home: { clients, testimonials } } } } } = this.props;

    if (isRunning || !isLoaded) {
      return <Loading />;
    }

    return (
      <div>
        <div className="bgProduct">
          <div className="container">
            <ProductBlock product={product} screenSize={screenSize} />
          </div>
        </div>
        <div>
          <div className="container">
            <InformationBlock screenSize={screenSize} informations={informations} />
            <TutorialBlock screenSize={screenSize} tutorials={tutorials} />
            <WarrantyBlock screenSize={screenSize} />
            <BenefitsBlock screenSize={screenSize} advantages={advantages} />
            <GraphicPlantBlock screenSize={screenSize} graphic_plant={graphic_plant} />
            <CustomersRelyBlock />
            <Blog />
            <OpinionsBlock screenSize={screenSize} opinions={opinions} />
            <DetailsProductBlock product={product} screenSize={screenSize} />
            <PrintProductBlock product={product} print={print} screenSize={screenSize} />
          </div>
        </div>
      </div>
    );
  }

  render() {
    // const { app: { screenSize } } = this.props;
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
  return productsSelector(state);
}

function mapDispatchToProps(dispatch) {
  return { dispatch };
}


export default connect(mapStateToProps, mapDispatchToProps)(Products);

