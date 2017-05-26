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

  componentDidUpdate(prevProps) {
    const prevSelectedSource = prevProps.productSettings.settings.source.selectedSource;
    const selectedSource = this.props.productSettings.settings.source.selectedSource;

    if (prevSelectedSource !== selectedSource) {
      window.scrollTo(0, document.querySelector('.app__config__options').offsetTop - 25);
    }
  }

  static props: Props;

  handleSourceSelection = (ev) => {
    const { productSettings: { finalProduct: { id }, settings: { selectedSource } }, dispatch } = this.props;
    if (ev.target.value !== selectedSource) {
      dispatch(settingsSourceFetch(id, ev.target.value));
    }
  };

  renderSourceBlock() {
    const {
      app: {
        screenSize,
      },
      productSettings: {
        settings: {
          source: {
            selectedSource,
          },
        },
      },
      locale,
      dispatch,
    } = this.props;

    const configLocale = locale.translate.page.product_settings;

    return (
      <SourcesBlock
        locale={configLocale.creation}
        screenSize={screenSize}
        order="1"
        dispatch={dispatch}
        handleSourceSelection={this.handleSourceSelection}
        selectedSource={selectedSource}
      />
    );
  }

  renderOptionsBlock() {
    const {
      app: {
        config: {
          viewType
        }
      },
      productSettings: {
        options,
      },
      locale,
      dispatch
    } = this.props;
    const configLocale = locale.translate.page.product_settings.options;

    return (
      <OptionsBlock
        dispatch={dispatch}
        viewType={viewType}
        locale={configLocale}
        order="2"
        options={options}
      />
    );
  }

  renderPage() {
    const {
      productSettings: {
        product,
        settings: {
          source: {
            showSteps,
            selectedSource
          },
        },
      },
      locale,
    } = this.props;

    const configLocale = locale.translate.page.product_settings;
    return (
      <div className="app__config container">
        <h2>{`${configLocale.TITLE}: ${product.title}`}</h2>
        {showSteps.source && this.renderSourceBlock()}
        {showSteps.options && selectedSource && this.renderOptionsBlock()}
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
