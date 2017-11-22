// @flow

import React from 'react';
import { connect } from 'react-redux';
import { shouldComponentUpdate, isMobile } from 'utils/helpers';
import StickBar from 'components/StickBar';
import PrePressTemplate from 'containers/Config/PrePressTemplate';

type Props = {
  screenSize: AppStoreType.screenSize,
  locale: LocaleType.translate.page.product_settings.sidebar,
  selection: {},
  templates: {},
  dispatch: {},
  productTitle: string,
};

export class ItemSummary extends React.Component {
  shouldComponentUpdate = shouldComponentUpdate;

  static props: Props;

  static state: State;

  renderSummary() {
    const { locale } = this.props;
    return (
      <div className="app__settings__summary">
        <h3>{locale.TITLE}</h3>
        {/*{Object.keys(selection).map((option) => (*/}
        {/*<div key={option}>*/}
        {/*{Object.keys(selection).length > 1 && <span>{calculator[option].name}</span>}*/}
        {/*{Object.keys(selection) > 1 && <b>{option}:</b>}*/}
        {/*<ul>*/}
        {/*{Object.keys(selection[option]).map((item) => (*/}
        {/*<li key={item}>*/}
        {/*<span>{*/}
        {/*optionSectionInfo[option]*/}
        {/*.filter(obj => obj.key === item)*/}
        {/*.reduce((prevValue, currentValue) => currentValue.name, '')*/}
        {/*}</span>: {*/}
        {/*calculator[option].options[item]*/}
        {/*.filter(obj => obj.id === selection[option][item])*/}
        {/*.reduce((prevValue, currentValue) => currentValue.name, '')*/}
        {/*}*/}
        {/*</li>*/}
        {/*))}*/}
        {/*</ul>*/}
        {/*</div>*/}
        {/*))}*/}
        {/*{!!matrix.selection.date && !!matrix.selection.quantity && <div className="atm-summary-warning">*/}
        {/*<TruckIcon />Previsão de entrega: {selectedDate.format('DD/MM/YYYY')}*/}
        {/*</div>}*/}
      </div>
    );
  }

  renderSelection() {
    const { selection } = this.props;

    if (Object.keys(selection).length <= 0) {
      return [];
    }

    return Object.keys(selection).map((part) => (
      <div key={part}>
        {Object.keys(selection).length > 1 && <span>{part}</span>}
        <ul>
          {Object.keys(selection[part])
            .map((attribute) => <li key={attribute}><span>{attribute}:</span> {selection[part][attribute]}</li>)
          }
        </ul>
      </div>
    ));
  }

  renderMobile() {
    return (
      <div className="org-summary-mobile">
        {this.renderSummary()}
      </div>
    );
  }

  renderDesktop() {
    const { locale, templates, dispatch, productTitle } = this.props;

    return (
      <StickBar>
        <div className="org-cart-stickbar">
          <div className="atm-cart-sidebar-title">{locale.TITLE}</div>
          <div className="mol-cart-sidebar-summary">
            {this.renderSelection()}
          </div>
        </div>
        <PrePressTemplate templates={templates} dispatch={dispatch} productTitle={productTitle} />
      </StickBar>
    );
  }

  render() {
    const { screenSize } = this.props;

    return isMobile(screenSize) ? this.renderMobile() : this.renderDesktop();
  }
}

function mapStateToProps(state) {
  return {
    screenSize: state.app.screenSize,
    locale: state.locale.translate.page.product_settings.sidebar,
    selection: state.productSettings.options.parts
      .reduce((prevPart, currentPart) => ({
        ...prevPart,
        [currentPart.name]: currentPart.attributes
          .reduce((prevAttribute, currentAttribute) => ({
            ...prevAttribute,
            [currentAttribute.name]: currentAttribute.options
              .filter((option) => (state.productSettings.selection && state.productSettings.selection[currentPart.id] && option.id === state.productSettings.selection[currentPart.id][currentAttribute.key]))
              .reduce((prevOption, currentOption) => (currentOption.name), '')
          }), {}),
      }), {}),
  };
}

export default connect(mapStateToProps)(ItemSummary);
