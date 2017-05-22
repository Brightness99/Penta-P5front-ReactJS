// @flow

import React from 'react';
import { connect } from 'react-redux';

import { productFetch } from 'actions';

import ConfigBlock from './ConfigBlock';
import CreationBlock from './CreationBlock';
import OptionsBlock from './OptionsBlock';
import MatrixBlock from './MatrixBlock';

type Props = {
  app: AppStore,
  dispatch: () => {},
  locale: {},
  products: ProductStore,
  productSettings: ProductSettingsStore,
  router: RouterStore,
  match: {},
};

export class Config extends React.Component {
  componentDidMount() {
    const { match: { params: { slug } }, dispatch } = this.props;

    dispatch(productFetch(slug));
  }

  static props: Props;

  render() {
    const {
      app: {
        config: {
          viewType,
        },
        screenSize,
      },
      productSettings: {
        settings,
      },
      locale,
      dispatch,
    }
    = this.props;

    const configLocale = locale.translate.page.product_settings;
    console.log(settings);
    return (
      <div className="app__config container">
        <h2>{configLocale.TITLE}: Cartão de Visita</h2>
        {true && <CreationBlock locale={configLocale.creation} screenSize={screenSize} />}
        <ConfigBlock
          order="2"
          locale={configLocale.options}
          className="app__config__options"
          button={<button className="app__config__block-header__button">Me ajude a configurar</button>}
        >
          <OptionsBlock dispatch={dispatch} viewType={viewType} />
        </ConfigBlock>
        <ConfigBlock
          order="3"
          locale={configLocale.matrix}
          className="app__config__matrix"
        >
          <MatrixBlock />
        </ConfigBlock>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    app: state.app,
    locale: state.locale,
    route: state.route,
    product: state.products,
    productSettings: state.productSettings,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(Config);
