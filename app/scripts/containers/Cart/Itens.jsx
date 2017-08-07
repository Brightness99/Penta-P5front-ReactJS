// @flow

import React from 'react';
import swal from 'sweetalert2';
import { shouldComponentUpdate, isMobile } from 'utils/helpers';
import { NavLink } from 'react-router-dom';
import { cartDuplicateFetch, cartDeleteFetch } from 'actions';
import { FilesIcon, PencilIcon, TrashIcon, ChevronRightIcon } from 'components/Icons';
import { IntlDate, IntlMoney, IntlZipcode } from 'components/Intl';
import Modal from 'components/Modal';
import ProductImage from './ProductImage';
import { ProductDetailsModal, UpsellingModal } from './Modals';

const failbackImage = require('assets/media/images/blue-logo.png');

type Props = {
  screenSize: string,
  items: {},
  zipcode: number,
  dispatch: () => {},
};

type State = {
  modal: {
    type: string,
    isOpen: boolean,
    itemId: string,
  },
  isUpsellSelected: boolean,
  upsell: {
    isOpen: boolean,
    product: string,
    isSelected: boolean,
  }
};

export default class CartItens extends React.Component {
  constructor(props: Props) {
    super(props);

    this.state = {
      upsell: {
        isOpen: false,
        product: '',
        isSelected: false,
      },
      modal: {
        type: '',
        isOpen: false,
        itemId: '',
      },
      isUpsellSelected: false,
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
      isUpsellSelected: false,
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
    const { items } = this.props;
    const { modal, isUpsellSelected } = this.state;

    if (!modal.type || !modal.itemId || !(modal.type === 'details' || modal.type === 'upsell')) {
      return null;
    }

    return (
      <Modal handleCloseModal={this.handleModalClose}>
        {
          modal.type === 'upsell'
            ? <UpsellingModal
              isUpsellSelected={isUpsellSelected}
              handleUpsellChoose={this.handleUpsellChoose}
              handleModalClose={this.handleModalClose}
            />
            : <ProductDetailsModal item={items[modal.itemId]} failbackImage={failbackImage} />
        }
      </Modal>
    );
  }

  handleDuplicate = (ev) => {
    const { dispatch } = this.props;

    dispatch(cartDuplicateFetch(ev.currentTarget.value));
  };

  handleDelete = (ev) => {
    const { dispatch } = this.props;
    const targetValue = ev.currentTarget.value;
    swal({
      title: "Você tem certeza?",
      text: "Ao remover este produto ele não estará mais disponível no carrinho!",
      type: "warning",
      confirmButtonColor: "#2cac57",
      confirmButtonText: "Sim",
      cancelButtonText: "Não",
      showCancelButton: true,
      reverseButtons: true,
    })
      .then(() => dispatch(cartDeleteFetch(targetValue)));
  };

  renderActions(item, itemId) {
    if (item.type === 'cloud') {
      return (
        <div className="mol-cart-item-actions">
          <NavLink to={`/configuracao-${item.product_slug.slug}/editar/${itemId}`} className="atm-cart-action"><PencilIcon />editar</NavLink>
          <NavLink to={`/${item.product_slug.slug}/editar-produto/${itemId}`} className="atm-cart-action"><PencilIcon />trocar arte</NavLink>
        </div>
      );
    }

    return (
      <div className="mol-cart-item-actions">
        <button className="atm-cart-action" value={itemId} onClick={this.handleDuplicate}><FilesIcon />duplicar</button>
        <NavLink to={`/configuracao-${item.product_slug.slug}/editar/${itemId}`} className="atm-cart-action"><PencilIcon />editar</NavLink>
      </div>
    );
  }

  renderProductInfos(item, itemId) {
    const slicedList = Object.keys(item.product_parts[Object.keys(item.product_parts)[0]].options)
      .slice(0, 3)
      .reduce((prevOption, currentOption) => (
        [
          ...prevOption,
          <li key={currentOption}>{item.product_parts[Object.keys(item.product_parts)[0]].options[currentOption].name}</li>
        ]
      ), []);
    return (
      <div className="mol-cart-item-infos">
        <div className="atm-cart-item-name">{item.project_name}</div>
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
              Ver mais...
            </button>
          </li>
        </ul>
      </div>
    );
  }

  renderDesktop() {
    const { items, zipcode } = this.props;
    const { upsell, modal: { isOpen } } = this.state;

    return (
      <div className="org-cart-items-desktop">
        <div className="mol-cart-items-header">
          <span>produto</span>
          <span>entrega</span>
          <span>quantidade</span>
          <span>valor</span>
        </div>
        <ul className="mol-cart-items-list">
          {Object.keys(items).map((item) => (
            <li className="mol-cart-item-desktop" key={item}>
              <div className="mol-cart-item-product">
                <div className="mol-cart-item-image">
                  <ProductImage thumbnail={items[item].thumbnail} failbackImage={failbackImage} alt={items[item].final_product.name} />
                  <div className="atm-button-up-sell-desktop">
                    <button
                      onClick={this.handleModalOpen}
                      value={item}
                      name="upsell"
                      className="atm-button-up-sell"
                    >
                      turbine seu produto <ChevronRightIcon />
                    </button>
                  </div>
                </div>
                <div className="mol-cart-item-desktop-infos">
                  {this.renderProductInfos(items[item], item)}
                  {this.renderActions(items[item], item)}
                </div>
              </div>
              <div className="mol-cart-item-delivery">
                <IntlDate className="atm-cart-item-date">{items[item].expected_delivery_date}</IntlDate>
                <div className="atm-cart-item-zipcode">CEP: <IntlZipcode>{zipcode}</IntlZipcode></div>
              </div>
              <div className="mol-cart-item-quantity">
                <div className="atm-cart-item-quantity">{items[item].quantity}</div>
              </div>
              <div className="mol-cart-item-price">
                <div className="atm-cart-item-price"><IntlMoney>{items[item].prices.total}</IntlMoney></div>
                <div className="mol-cart-item-actions">
                  <button
                    className="atm-cart-action atm-cart-action--red"
                    value={item}
                    onClick={this.handleDelete}
                  >
                    <TrashIcon />excluir
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        {isOpen && this.renderModal()}
      </div>
    );
  }

  renderMobileItem(item, key) {
    const { zipcode } = this.props;

    return (
      <li className="org-cart-section" key={key}>
        <div className="mol-cart-item-data">
          <img src={require('assets/media/images/cart-item.png')} alt="prod" />
          {this.renderProductInfos(item, key)}
        </div>
        <div className="org-cart-item-section">
          <div className="mol-cart-item-section-title">
            <div className="atm-cart-title">Entrega</div>
          </div>
          <div className="mol-cart-item-section-data">
            <IntlDate className="atm-cart-item-date">{item.expected_delivery_date}</IntlDate>
            <div className="atm-cart-item-zipcode">CEP: <IntlZipcode>{zipcode}</IntlZipcode></div>
          </div>
        </div>
        <div className="org-cart-item-section">
          <div className="mol-cart-item-section-title">
            <div className="atm-cart-title">Quantidade</div>
            <div className="atm-cart-title">Valor</div>
          </div>
          <div className="mol-cart-item-section-data">
            <div className="atm-cart-item-quantity">{item.quantity}</div>
            <div className="atm-cart-item-price"><IntlMoney>{item.prices.total}</IntlMoney></div>
          </div>
        </div>
        <div className="atm-button-up-sell-mobile">
          <button
            onClick={this.handleModalOpen}
            value={item}
            name="upsell"
            className="atm-button-up-sell atm-button-up-sell--mobile"
          >
            turbine seu produto <ChevronRightIcon />
          </button>
        </div>
        <div className="org-cart-mobile-actions">
          {this.renderActions(item, key)}
          <button
            className="atm-cart-action atm-cart-action--red"
            value={key}
            onClick={this.handleDelete}
          >
            <TrashIcon />excluir
          </button>
        </div>
      </li>
    );
  }

  renderMobile() {
    const { items } = this.props;
    const { modal: { isOpen } } = this.state;

    return (
      <ul className="org-cart-item-list">
        {Object.keys(items).map(item => this.renderMobileItem(items[item], item))}
        {isOpen && this.renderModal()}
      </ul>
    );
  }

  render() {
    const { screenSize } = this.props;

    return isMobile(screenSize) ? this.renderMobile() : this.renderDesktop();
  }
}
