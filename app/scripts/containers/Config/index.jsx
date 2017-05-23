// @flow

import React from 'react';
import { connect } from 'react-redux';

import { settingsFetch, settingsSourceFetch } from 'actions';

import Loading from 'components/Loading';

import ConfigBlock from './ConfigBlock';
import SourcesBlock from './SourcesBlock';
import OptionsBlock from './OptionsBlock';
import MatrixBlock from './MatrixBlock';


type Props = {
  app: AppStore,
  dispatch: () => {},
  locale: {},
  products: ProductStore,
  productSettings: SettingsStore,
  router: RouterStore,
  match: {},
};

export class Config extends React.Component {
  componentDidMount() {
    const { match: { params: { slug } }, dispatch } = this.props;

    dispatch(settingsFetch(slug));
  }

  static props: Props;

  handleSourceSelection = (ev) => {
    const { productSettings: { finalProduct: { id } }, dispatch } = this.props;

    dispatch(settingsSourceFetch(id, ev.target.value));
  };

  renderPage() {
    const {
      app: {
        config: {
          viewType,
        },
        screenSize,
      },
      productSettings: {
        product,
        settings: {
          showSteps,
          selectedSource,
        },
      },
      locale,
      dispatch,
    }
      = this.props;

    const configLocale = locale.translate.page.product_settings;
    return (
      <div className="app__config container">
        <h2>{`${configLocale.TITLE}: ${product.title}`}</h2>
        {showSteps.source &&
          <SourcesBlock
            locale={configLocale.creation}
            screenSize={screenSize}
            order="1"
            dispatch={dispatch}
            handleSourceSelection={this.handleSourceSelection}
            selectedSource={selectedSource}
          />}
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

  render() {
    const { productSettings } = this.props;

    if (productSettings.isRunning.settings || !productSettings.isLoaded.settings) {
      return (<Loading />);
    }

    return this.renderPage();
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
