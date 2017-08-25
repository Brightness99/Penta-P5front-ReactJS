// @flow

import React from 'react';
import Slider from 'react-slick';
import { shouldComponentUpdate, isMobile } from 'utils/helpers';
import { cartUpdateFetch } from 'actions';
import { ChevronRightIcon } from 'components/Icons';
import { IntlDate, IntlMoney, IntlZipcode } from 'components/Intl';
import Modal from 'components/Modal';
import { EditableText } from 'molecules/Inputs';
import ProductImage from './ProductImage';
import { ProductDetailsModal, UpsellingDateModal } from './Modals';
import Actions from './Actions';

const failbackImage = require('assets/media/images/blue-logo.png');

type Props = {
  screenSize: string,
  items: {},
  zipcode: number,
  usePickupPlaces: boolean,
  pickupPlaces: {},
  pickupPlaceId: number,
  locale: {},
  upselling: {},
  dispatch: () => {},
};

type State = {
  modal: {
    type: string,
    isOpen: boolean,
    itemId: string,
  },
  isUpsellSelected: boolean,
};

export default class CartItens extends React.Component {
  constructor(props: Props) {
    super(props);

    this.state = {
      modal: {
        type: '',
        isOpen: false,
        itemId: '',
      },
      isUpsellSelected: true,
    };
  }

  shouldComponentUpdate = shouldComponentUpdate;

  static props: Props;

  static state: State;

  handleUpsellChoose = () => {
    const { isUpsellSelected } = this.state;

    this.setState({
      isUpsellSelected: !isUpsellSelected,
    });
  };

  handleModalClose = () => {
    this.setState({
      modal: {
        isOpen: false,
        itemId: '',
        type: '',
      },
      isUpsellSelected: true,
    });
  };

  handleModalOpen = (ev) => {
    this.setState({
      modal: {
        isOpen: true,
        itemId: ev.currentTarget.value,
        type: ev.currentTarget.name,
      },
    });
  };

  renderModal() {
    const { items, locale, dispatch, upselling } = this.props;
    const { modal, isUpsellSelected } = this.state;

    if (!modal.type || !modal.itemId || !['details', 'upsellDate'].includes(modal.type)) {
      return null;
    }

    return (
      <Modal handleCloseModal={this.handleModalClose}>
        {
          modal.type === 'upsellDate'
            ? <UpsellingDateModal
              isUpsellSelected={isUpsellSelected}
              itemId={modal.itemId}
              handleUpsellChoose={this.handleUpsellChoose}
              handleModalClose={this.handleModalClose}
              className="org-up-sell-modal"
              locale={locale.upselling}
              dispatch={dispatch}
              upselling={items[modal.itemId].upselling.date}
            />
            : <ProductDetailsModal
              item={items[modal.itemId]}
              failbackImage={failbackImage}
              locale={locale.item_details_modal}
            />
        }
      </Modal>
    );
  }

  renderZipcode() {
    const { usePickupPlaces, pickupPlaceId, pickupPlaces, locale, zipcode } = this.props;

    if (usePickupPlaces) {
      if (!pickupPlaces[pickupPlaceId]) {
        return null;
      }

      return (
        <div className="atm-cart-item-zipcode">
          {pickupPlaces[pickupPlaceId].receiver_name}
        </div>
      );
    }

    return (
      <div className="atm-cart-item-zipcode">
        {locale.product_list.ZIPCODE_TYPE}: <IntlZipcode>{zipcode}</IntlZipcode>
      </div>
    );
  }

  handleProjectNameSubmit = (ev, itemId) => {
    ev.preventDefault();

    const { dispatch } = this.props;

    dispatch(cartUpdateFetch(itemId, {
      item: {
        project_name: ev.currentTarget.editableInput.value,
      },
    }));
  };

  renderProductInfos(item, itemId) {
    const { locale } = this.props;

    const slicedList = Object.keys(item.product_parts[Object.keys(item.product_parts)[0]].options)
      .slice(0, 1)
      .reduce((prevOption, currentOption) => (
        [
          ...prevOption,
          <li key={currentOption}>{item.product_parts[Object.keys(item.product_parts)[0]].options[currentOption].name}</li>,
        ]
      ), []);
    return (
      <div className="mol-cart-item-infos">
        <EditableText
          value={item.project_name}
          aditionalReturn={itemId}
          onSubmit={this.handleProjectNameSubmit}
        />
        <div className="atm-cart-item-product">{item.final_product.name}</div>
        <ul>
          {slicedList}
          <li>
            <button
              className="atm-cart-see-more"
              name="details"
              value={itemId}
              onClick={this.handleModalOpen}
            >
              {locale.product_list.SEE_MORE}
            </button>
          </li>
        </ul>
      </div>
    );
  }

  renderDesktop() {
    const { items, screenSize, dispatch, locale } = this.props;
    const { modal: { isOpen } } = this.state;

    return (
      <div className="org-cart-items-desktop">
        <div className="mol-cart-items-header">
          <span>{locale.product_list.PRODUCT}</span>
          <span>{locale.product_list.DELIVERY}</span>
          <span>{locale.product_list.QUANTITY}</span>
          <span>{locale.product_list.PRICE}</span>
        </div>
        <ul className="mol-cart-items-list">
          {Object.keys(items).map((item) => (
            <li className="mol-cart-item-desktop" key={item}>
              <div className="mol-cart-item-product">
                <div className="mol-cart-item-image">
                  <ProductImage thumbnail={items[item].thumbnail} failbackImage={failbackImage} alt={items[item].final_product.name} />
                  {items[item].upselling.isUpsellingDate && <button
                    onClick={this.handleModalOpen}
                    value={item}
                    name="upsellDate"
                    className="atm-button-up-sell atm-button-up-sell--desktop"
                  >
                    {locale.upselling.LABEL} <ChevronRightIcon />
                  </button>}
                </div>
                <div className="mol-cart-item-desktop-infos">
                  {this.renderProductInfos(items[item], item)}
                </div>
              </div>
              <div className="mol-cart-item-delivery">
                <IntlDate className="atm-cart-item-date">{items[item].expected_delivery_date}</IntlDate>
                {this.renderZipcode()}
              </div>
              <div className="mol-cart-item-quantity">
                <div className="atm-cart-item-quantity">{items[item].quantity}</div>
                <div className="atm-cart-item-quantity-unit">
                  {items[item].quantity > 1 ? locale.units.UNITS : locale.units.UNIT}
                </div>
              </div>
              <div className="mol-cart-item-price">
                <div className="atm-cart-item-price">
                  <IntlMoney>{items[item].prices.total}</IntlMoney>
                  <span><IntlMoney>{items[item].prices.total / items[item].quantity}</IntlMoney>/{locale.units.UNIT_SHORT}</span>
                </div>
                <Actions
                  screenSize={screenSize}
                  actions={items[item].actions}
                  itemId={item}
                  dispatch={dispatch}
                  locale={locale.actions}
                />
              </div>
            </li>
          ))}
        </ul>
        {isOpen && this.renderModal()}
      </div>
    );
  }

  renderMobile() {
    const { items, screenSize, dispatch, locale } = this.props;
    const { modal: { isOpen } } = this.state;
    const sliderSettings = {
      arrows: false,
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      centerMode: true,
      centerPadding: '25px',
    };
    return (
      <div className="org-cart-item-list">
        <Slider {...sliderSettings}>
          {Object.keys(items).map(item => (
            <div>
              <div className="org-cart-item" key={item}>
                <div className="mol-cart-item-header">
                  <ProductImage thumbnail={items[item].thumbnail} failbackImage={failbackImage} alt={items[item].final_product.name} />
                  {this.renderProductInfos(items[item], item, 1)}
                </div>
                <div className="mol-cart-item-body">
                  <div>
                    <div className="atm-cart-item-info-title">{locale.product_list.DELIVERY}</div>
                    <div className="atm-cart-item-info-text">
                      <span><IntlDate>{items[item].expected_delivery_date}</IntlDate></span>
                      {this.renderZipcode()}
                    </div>
                  </div>
                  <div>
                    <div className="atm-cart-item-info-title">{locale.product_list.QUANTITY}</div>
                    <div className="atm-cart-item-info-text">{`${items[item].quantity} ${items[item].quantity > 1 ? locale.units.UNITS : locale.units.UNIT}`}</div>
                  </div>
                  <div>
                    <div className="atm-cart-item-info-title">{locale.product_list.PRICE}</div>
                    <div className="atm-cart-item-info-text"><IntlMoney className="atm-cart-price">{items[item].prices.total}</IntlMoney></div>
                  </div>
                  {items[item].upselling.isUpsellingDate && <button
                    onClick={this.handleModalOpen}
                    value={item}
                    name="upsellDate"
                    className="atm-button-up-sell atm-button-up-sell--mobile"
                  >
                    {locale.upselling.LABEL} <ChevronRightIcon />
                  </button>}
                </div>
                <Actions
                  screenSize={screenSize}
                  actions={items[item].actions}
                  itemId={item}
                  dispatch={dispatch}
                  locale={locale.actions}
                />
              </div>
            </div>
          ))}
        </Slider>
        {isOpen && this.renderModal()}
      </div>
    );
  }

  render() {
    const { screenSize } = this.props;

    return isMobile(screenSize) ? this.renderMobile() : this.renderDesktop();
  }
}
