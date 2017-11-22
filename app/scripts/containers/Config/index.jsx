// @flow

import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Helmet from 'react-helmet';
import { sprintf } from 'sprintf-js';
import { settingsFetch, settingsOptionsFetch, settingsAdditionalOptionsFetch } from 'actions';
import { isMobile } from 'utils/helpers';

import { PageTitle } from 'atoms/Titles';
import { RoundedConfirmationButton } from 'atoms/Buttons';
import Breadcrumbs from 'components/LandingPage/Breadcrumbs';
import Loading from 'components/Loading';
import { TruckIcon } from 'components/Icons';
import Modal from 'components/Modal';
import CartZipcodeModal from './Modals/CartZipcode';
import SourcesBlock from './Sources';
import OptionsBlock from './Options';
import MatrixBlock from './Matrix';
import Summary from './Summary';

type Props = {
  app: AppStoreType,
  dispatch: () => {},
  locale: ProductSettingsLocaleType,
  products: ProductStore,
  productSettings: SettingsStore,
  router: RouterStore,
  match: {},
  options: {},
  cart: {},
  loyalty: {},
};

type State = {
  isModalOpen: boolean,
};

export class Config extends React.Component {
  constructor(props: Props) {
    super(props);

    this.state = {
      isModalOpen: false,
    };
  }

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

  renderSummary() {
    const { productSettings: { selection, optionSectionInfo, calculator, matrix } } = this.props;

    let selectedDate = '';

    if (matrix.selection.date !== 0) {
      selectedDate = moment(new Date(matrix.selection.date * 1000));
    }

    return (
    <div className="app__settings__summary">
      <h3>Resumo do produto</h3>
      {Object.keys(selection).map((option) => (
        <div key={option}>
          {Object.keys(selection).length > 1 && <span>{calculator[option].name}</span>}
          {Object.keys(selection) > 1 && <b>{option}:</b>}
          <ul>
            {Object.keys(selection[option]).map((item) => (
              <li key={item}>
                  <span>{
                    optionSectionInfo[option]
                      .filter(obj => obj.key === item)
                      .reduce((prevValue, currentValue) => currentValue.name, '')
                  }</span>: {
                calculator[option].options[item]
                  .filter(obj => obj.id === selection[option][item])
                  .reduce((prevValue, currentValue) => currentValue.name, '')
              }
              </li>
            ))}
          </ul>
        </div>
      ))}
      {!!matrix.selection.date && !!matrix.selection.quantity && <div className="atm-summary-warning">
        <TruckIcon />Previsão de entrega: {selectedDate.format('DD/MM/YYYY')}
      </div>}
    </div>
    );
  }

  handleOptionSelection = (ev) => {
    const {
      dispatch,
      productSettings: {
        selection,
        source: {
          selectedSource,
        },
        finalProduct: {
          id,
        },
      },
    }  = this.props;

    const part = ev.currentTarget.name.split('-')[0];
    const attribute = ev.currentTarget.name.split('-')[1] || '';

    dispatch(settingsOptionsFetch({
      selection: {
        [part]: Object.keys(selection[part])
          .map((item) => ({
            key: item,
            value: attribute === item ? ev.currentTarget.value : selection[part][item],
          }))
          .reduce((prevSelect, currentSelect) => ({
            ...prevSelect,
            [currentSelect.key]: Object.keys(selection[part])
              .slice(0, Object.keys(selection[part]).indexOf(attribute) + 1)
              .includes(currentSelect.key)
              ? currentSelect.value
              : '',
          }), {}),
      },
      partId: part,
      productId: id,
      selectedSource,
    }));
  };

  handleMatrixSelection = (ev) => {
    const { dispatch, productSettings } = this.props;

    dispatch(settingsAdditionalOptionsFetch({
      selection: {
        delivery_method: productSettings.matrix.rows[ev.currentTarget.value][ev.currentTarget.name].delivery_method,
        production_type: productSettings.matrix.rows[ev.currentTarget.value][ev.currentTarget.name].production_type.id,
          ...Object.keys(productSettings.additionalOptions)
            .filter((additionalOption) => productSettings.additionalOptions[additionalOption].length > 0)
            .reduce((prevOption, currentOption) => ({
              ...prevOption,
              [currentOption]: productSettings.additionalOptions[currentOption]
                .filter((additionalOption) => additionalOption.price === 0)
                .reduce((prevAdditionalOption, currentAdditionalOption) => (currentAdditionalOption.id), '')
            }), {}),
      },
      data: {
        customQuantity: 0,
        qty: ev.currentTarget.value,
        product_parts: productSettings.selection,
      },
      additional_options: {
        ...productSettings.additionalOptions,
        delivery_method: [productSettings.matrix.rows[ev.currentTarget.value][ev.currentTarget.name].delivery_method],
        production_type: [productSettings.matrix.rows[ev.currentTarget.value][ev.currentTarget.name].production_type],
      },
      selectedDate: ev.currentTarget.name,
      selectedQuantity: ev.currentTarget.value,
      productId: productSettings.finalProduct.id,
      selectedSource: productSettings.source.selectedSource,
    }));
  };

  handleCartAdd = () => {
    const { cart, productSettings: { config } } = this.props;

    if (cart.data.zipcode !== config.zipcode.value) {
      return this.handleModalOpen();
    }

    return () => {};
  };

  handleModalOpen = () => {
    this.setState({
      isModalOpen: true,
    });
  };

  handleModalClose = () => {
    this.setState({
      isModalOpen: false,
    });
  };

  handleCepReset = () => {
    this.handleModalClose();
  };

  handleCartClear = () => {
    this.handleModalClose();
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
        source,
        options,
        product,
        config: {
          showSteps,
        },
        config,
        finalProduct,
        selection,
        templates,
        calculator,
        matrix,
        loyalty,
      },
      dispatch,
      locale,
    } = this.props;

    const { isModalOpen } = this.state;

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
      <div className="app__config">
        <Helmet>
          <title>{sprintf(locale.seo.PAGE_TITLE, product.title)}</title>
          <meta name="description" content={sprintf(locale.seo.META_DESCRIPTION, product.title)} />
        </Helmet>
        {!isMobile(screenSize) && <Breadcrumbs links={breadcrumb} />}
        <div className="container">
          <PageTitle>{`${locale.TITLE}: ${product.title}`}</PageTitle>
          <div className="app__config__content">
            <main>
              {config.showSteps.source &&
                <SourcesBlock
                  locale={locale.source}
                  screenSize={screenSize}
                  order="1"
                  finalProductId={finalProduct.id}
                  dispatch={dispatch}
                  source={source}
                />
              }
              {config.showSteps.options && source.selectedSource &&
                <OptionsBlock
                  dispatch={dispatch}
                  viewType={viewType}
                  locale={locale.options}
                  order={showSteps.source ? 2 : 1}
                  options={options}
                  selection={selection}
                  screenSize={screenSize}
                  calculator={calculator}
                  finalProduct={finalProduct}
                  onSelect={this.handleOptionSelection}
                  isLoading={source.isRunning || !source.isLoaded}
                />
              }
              {config.showSteps.matrix && options.selectionIsComplete &&
                [
                  <MatrixBlock
                    key='matrix-block'
                    order={Object.keys(showSteps).filter((obj) => obj !== 'matrix' && obj !== 'additional_options').length + 1}
                    locale={{
                      ...locale.matrix,
                      COUNTRY_CODE: locale.COUNTRY_CODE,
                    }}
                    className="app__config__matrix"
                    dispatch={dispatch}
                    selection={selection}
                    selectedSource={source.selectedSource}
                    screenSize={screenSize}
                    matrix={matrix}
                    templates={templates}
                    product={product}
                    isCustomEnabled={finalProduct.custom_qty === '1'}
                    config={config}
                    onSelect={this.handleMatrixSelection}
                    loyalty={loyalty}
                  />,
                  <RoundedConfirmationButton
                    key='confirmation-button'
                    isEnabled={matrix.selection.date > 0 && matrix.selection.quantity > 0}
                    onClick={this.handleCartAdd}
                  >
                    Continuar
                  </RoundedConfirmationButton>,
                ]
              }
            </main>
            <Summary
              selectionIsComplete={options.selectionIsComplete}
              matrix={matrix}
              templates={templates}
              dispatch={dispatch}
              productTitle={product.title}
              locale={locale}
            />
          </div>
        </div>
        {isModalOpen &&
          <Modal
            closeModal={this.handleModalClose}
          >
            <CartZipcodeModal
              onReset={this.handleCepReset}
              onClear={this.handleCartClear}
            />
          </Modal>
        }
      </div>
    );
  }

  render() {
    console.log('settings props', this.props);
    const { productSettings: { isRunning, isLoaded } } = this.props;

    if (isRunning || !isLoaded) {
      return (<Loading />);
    }

    return this.renderPage();
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    app: state.app,
    locale: {
      ...state.locale.translate.page.product_settings,
      matrix: {
        ...state.locale.translate.page.product_settings.matrix,
        flash_messages: {
          ...state.locale.translate.page.upload.flash_messages,
          delivery_text: state.locale.translate.page.upload.delivery_text,
        },
      },
      COUNTRY_CODE: state.locale.COUNTRY_CODE,
    },
    loyalty: state.account.loyalty,
    cart: state.cart,
    productSettings: state.productSettings,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(Config);
