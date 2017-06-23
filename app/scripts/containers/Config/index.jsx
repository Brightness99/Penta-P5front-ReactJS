// @flow

import React from 'react';
import { connect } from 'react-redux';

import { settingsFetch, settingsOptionsFetch } from 'actions';
import { settingsSelector } from 'selectors';

import Loading from 'components/Loading';
import SummaryBlock from './Summary';
import SourcesBlock from './SourcesBlock';
import OptionsBlock from './Options';
import MatrixBlock from './Matrix';

type Props = {
  app: AppStore,
  dispatch: () => {},
  locale: {},
  products: ProductStore,
  productSettings: SettingsStore,
  router: RouterStore,
  match: {},
  options: {},
};

export class Config extends React.Component {
  componentDidMount() {
    const { match: { params: { slug } }, dispatch } = this.props;

    dispatch(settingsFetch(slug));
  }

  componentDidUpdate(prevProps) {
    const { app: { screenSize } } = this.props;
    const prevSelectedSource = prevProps.productSettings.source.selectedSource;
    const selectedSource = this.props.productSettings.source.selectedSource;
    const prevScreenSize = prevProps.app.screenSize;

    if (prevSelectedSource !== selectedSource || prevScreenSize !== screenSize) {
      // const scrollTop = document.querySelector('.app__config__options').offsetTop - 25; // TODO: Fix this shit
      // window.scrollTo(0, scrollTop);
    }
  }

  static props: Props;

  handleOptionSelection = (ev) => {
    const {
      dispatch,
      productSettings: {
        selection,
        calculator,
        source: {
          selectedSource,
        },
        finalProduct: {
          id,
        },
      },
    }  = this.props;

    const name = ev.target.name.split('-');

    const selectionKeys = Object.keys(selection[name[0]]);

    dispatch(settingsOptionsFetch({
      selection: selectionKeys
        .map((item) => ({
          key: item,
          value: name[1] === item ? ev.target.value : selection[name[0]][item],
        }))
        .reduce((prevSelect, currentSelect) => ({
          ...prevSelect,
          [currentSelect.key]: selectionKeys
            .slice(0, selectionKeys.indexOf(name[1]) + 1)
            .includes(currentSelect.key)
              ? currentSelect.value
              : '',
        }), {}),
      partId: name[0],
      productId: id,
      option: calculator,
      selectedSource,
    }));
  };

  renderSourceBlock() {
    const {
      app: {
        screenSize,
      },
      productSettings: {
        source: {
          selectedSource,
        },
        finalProduct: {
          id,
        }
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
        finalProductId={id}
        dispatch={dispatch}
        selectedSource={selectedSource}
      />
    );
  }

  renderOptionsBlock() {
    const {
      app: {
        config: {
          viewType,
        },
      },
      productSettings: {
        selection,
        source: {
          isRunning,
          isLoaded,
        },
        settings: {
          showSteps,
        }
      },
      productSettings,
      locale,
      dispatch,
      options,
    } = this.props;
    const configLocale = locale.translate.page.product_settings.options;

    if (isRunning || !isLoaded) {
      return (<Loading />);
    }

    return (
      <OptionsBlock
        dispatch={dispatch}
        viewType={viewType}
        locale={configLocale}
        order={showSteps.source ? 2 : 1}
        options={{ ...productSettings.options, ...options }}
        selection={selection}
        onSelect={this.handleOptionSelection}
      />
    );
  }

  renderMatrixBlock() {
    const {
      productSettings: {
        source: {
          selectedSource,
        },
        matrix,
        selection,
      },
      dispatch,
      locale,
      app: {
        screenSize,
      },
    } = this.props;

    const configLocale = locale.translate.page.product_settings.matrix;

    return (
      <MatrixBlock
        order="3"
        locale={configLocale}
        className="app__config__matrix"
        dispatch={dispatch}
        selection={selection}
        selectedSource={selectedSource}
        screenSize={screenSize}
        matrix={matrix}
      />
    );
  }

  renderPage() {
    const {
      productSettings: {
        product,
        config: {
          showSteps,
          isFulfilled,
        },
        selection,
      },
      locale,
    } = this.props;

    const configLocale = locale.translate.page.product_settings;
    return (
      <div className="app__config container">
        <h2>{`${configLocale.TITLE}: ${product.title}`}</h2>
        {showSteps.source && this.renderSourceBlock()}
        {showSteps.options && isFulfilled.source && this.renderOptionsBlock()}
        {showSteps.matrix && isFulfilled.options && this.renderMatrixBlock()}
        <SummaryBlock selection={selection} />
      </div>
    );
  }

  render() {
    const { productSettings: { isRunning, isLoaded } } = this.props;

    if (isRunning || !isLoaded) {
      return (<Loading />);
    }

    return this.renderPage();
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return settingsSelector(state);
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(Config);
