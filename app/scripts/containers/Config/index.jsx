// @flow

import React from 'react';
import { connect } from 'react-redux';

import { settingsFetch, settingsOptionsFetch } from 'actions';
import { settingsSelector } from 'selectors';

import { PageTitle } from 'atoms/Titles';
import { RoundedConfirmationButton } from 'atoms/Buttons';
import Breadcrumbs from 'components/Breadcrumbs';
import Loading from 'components/Loading';
import SummaryBlock from './Summary';
import SourcesBlock from './Sources';
import OptionsBlock from './Options';
import MatrixBlock from './Matrix';
import Warning from './Warning';

type Props = {
  app: AppStore,
  dispatch: () => {},
  locale: {},
  products: ProductStore,
  productSettings: SettingsStore,
  router: RouterStore,
  match: {},
  options: {},
  user: {},
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
        source,
        finalProduct: {
          id,
        },
        config: {
          isFulfilled,
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
        isComplete={isFulfilled.source}
        finalProductId={id}
        dispatch={dispatch}
        source={source}
      />
    );
  }

  renderOptionsBlock() {
    const {
      app: {
        config: {
          viewType,
        },
        screenSize,
      },
      productSettings: {
        selection,
        source: {
          isRunning,
          isLoaded,
        },
        settings: {
          showSteps,
        },
        config: {
          isFulfilled,
        },
        calculator,
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
        isComplete={isFulfilled.options}
        options={{ ...productSettings.options, ...options }}
        selection={selection}
        screenSize={screenSize}
        calculator={calculator}
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
        config: {
          isFulfilled,
        },
        matrix,
        selection,
        templates,
        product,
        finalProduct: {
          custom_qty
        },
        settings: {
          showSteps,
        },
      },
      dispatch,
      locale,
      app: {
        screenSize,
      },
      user,
    } = this.props;

    const configLocale = locale.translate.page.product_settings.matrix;

    const order = Object.keys(showSteps).filter((obj) => obj !== 'matrix' && obj !== 'additional_options').length;

    return (
      <MatrixBlock
        order={order + 1}
        isComplete={isFulfilled.matrix}
        locale={configLocale}
        className="app__config__matrix"
        dispatch={dispatch}
        selection={selection}
        selectedSource={selectedSource}
        screenSize={screenSize}
        matrix={matrix}
        templates={templates}
        product={product}
        user={user}
        isCustomEnabled={custom_qty === '1'}
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
        templates,
        optionSectionInfo,
        calculator,
      },
      dispatch,
      locale,
    } = this.props;

    const configLocale = locale.translate.page.product_settings;

    const breadcrumb = [
      {
        title: 'Home',
        url: '/',
      },
      {
        title: product.title,
        url: `/produto-${product.slug}`,
      },
      {
        title: 'Configure',
      },
    ];

    return (
      <div className="app__config container">
        <Breadcrumbs links={breadcrumb} />
        <PageTitle>{`${configLocale.TITLE}: ${product.title}`}</PageTitle>
        <div className="app__config__content">
          <main>
            {showSteps.source && this.renderSourceBlock()}
            {showSteps.options && isFulfilled.source && this.renderOptionsBlock()}
            {showSteps.matrix && isFulfilled.options && this.renderMatrixBlock()}
            <Warning templates={templates} dispatch={dispatch} product={product} />
            <div className="app__config__submit-button">
              <RoundedConfirmationButton>
                CONTINUAR
              </RoundedConfirmationButton>
            </div>
          </main>
          <SummaryBlock selection={selection} optionSectionInfo={optionSectionInfo} calculator={calculator} />
        </div>
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
