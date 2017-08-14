// @flow

import React from 'react';
import swal from 'sweetalert2';
import { shouldComponentUpdate, isMobile } from 'utils/helpers';
import { NavLink } from 'react-router-dom';
import { cartDuplicateFetch, cartDeleteFetch, cartUpdateFetch } from 'actions';
import { FilesIcon, PencilIcon, TrashIcon, ChevronRightIcon } from 'components/Icons';
import { IntlDate, IntlMoney, IntlZipcode } from 'components/Intl';
import Tooltip from 'components/Tooltipster';
import Modal from 'components/Modal';
import { EditableText } from 'molecules/Inputs';
import ProductImage from './ProductImage';
import { ProductDetailsModal, UpsellingModal } from './Modals';

const failbackImage = require('assets/media/images/blue-logo.png');

type Props = {
  screenSize: string,
  items: {},
  zipcode: number,
  usePickupPlaces: boolean,
  pickupPlaces: {},
  pickupPlaceId: number,
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
              className="org-up-sell-modal"
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
      title: 'Você tem certeza?',
      text: 'Ao remover este produto ele não estará mais disponível no carrinho!',
      type: 'warning',
      confirmButtonColor: '#2cac57',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
      showCancelButton: true,
      reverseButtons: true,
    })
      .then(() => dispatch(cartDeleteFetch(targetValue)));
  };

  renderActions(item, itemId) {
    const { screenSize } = this.props;
    if (item.type === 'cloud') {
      if (isMobile(screenSize)) {
        return [
          <NavLink key="editar" to={`/configuracao-${item.product_slug.slug}?edit=1&cart_index=${itemId}`} className="atm-cart-item-action"><PencilIcon />editar</NavLink>,
          <NavLink key="trocar arte" to={`/${item.product_slug.slug}/editar-produto/${itemId}`} className="atm-cart-item-action"><PencilIcon />trocar arte</NavLink>,
          <button key="excluir" className="atm-cart-item-action" value={item} onClick={this.handleDelete}><TrashIcon />excluir</button>
        ];
      }

      return [
        <Tooltip key="editar" text="editar">
          <NavLink to={`/configuracao-${item.product_slug.slug}?edit=1&cart_index=${itemId}`} className="atm-cart-item-action"><PencilIcon /></NavLink>
        </Tooltip>,
        <Tooltip key="trocar arte" text="trocar arte">
          <NavLink to={`/${item.product_slug.slug}/editar-produto/${itemId}`} className="atm-cart-item-action"><PencilIcon /></NavLink>
        </Tooltip>,
        <Tooltip key="excluir" text="excluir">
          <button className="atm-cart-item-action" value={item} onClick={this.handleDelete}><TrashIcon /></button>
        </Tooltip>
      ];
    }

    if (isMobile(screenSize)) {
      return [
        <button key="duplicar" className="atm-cart-item-action" value={itemId} onClick={this.handleDuplicate}>
          <FilesIcon />duplicar
        </button>,
        <NavLink key="editar" to={`/configuracao-${item.product_slug.slug}?edit=1&cart_index=${itemId}`} className="atm-cart-item-action"><PencilIcon />editar</NavLink>,
        <button key="excluir" className="atm-cart-item-action" value={item} onClick={this.handleDelete}><TrashIcon />excluir</button>
      ];
    }

    return [
      <Tooltip key="duplicar" text="Duplicar">
        <button className="atm-cart-item-action" value={itemId} onClick={this.handleDuplicate}>
          <FilesIcon />
        </button>
      </Tooltip>,
      <Tooltip key="editar" text="Editar">
        <NavLink to={`/configuracao-${item.product_slug.slug}?edit=1&cart_index=${itemId}`} className="atm-cart-item-action"><PencilIcon /></NavLink>
      </Tooltip>,
      <Tooltip key="excluir" text="Excluir">
        <button className="atm-cart-item-action" value={item} onClick={this.handleDelete}><TrashIcon /></button>
      </Tooltip>
    ];
  }

  renderZipcode() {
    const { usePickupPlaces, zipcode, pickupPlaces } = this.props;

    if (usePickupPlaces) {
      if (!pickupPlaces[zipcode]) {
        return null;
      }

      return (
        <div className="atm-cart-item-zipcode">
          {pickupPlaces[zipcode].receiver_name}
        </div>
      );
    }

    return (
      <div className="atm-cart-item-zipcode">
        CEP: <IntlZipcode>{zipcode}</IntlZipcode>
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
  }

  renderProductInfos(item, itemId, size: number = 3) {
    const slicedList = Object.keys(item.product_parts[Object.keys(item.product_parts)[0]].options)
      .slice(0, size)
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
          placeholder="Nome do projeto..."
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
              Ver mais...
            </button>
          </li>
        </ul>
      </div>
    );
  }

  renderDesktop() {
    const { items } = this.props;
    const { modal: { isOpen } } = this.state;

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
                  <button
                    onClick={this.handleModalOpen}
                    value={item}
                    name="upsell"
                    className="atm-button-up-sell atm-button-up-sell--desktop"
                  >
                    turbine seu produto <ChevronRightIcon />
                  </button>
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
              </div>
              <div className="mol-cart-item-price">
                <div className="atm-cart-item-price"><IntlMoney>{items[item].prices.total}</IntlMoney></div>
                <div className="mol-cart-item-desktop-actions">
                  {this.renderActions(items[item], item)}
                </div>
              </div>
            </li>
          ))}
        </ul>
        {isOpen && this.renderModal()}
      </div>
    );
  }

  renderMobile() {
    const { items } = this.props;
    const { modal: { isOpen } } = this.state;

    return (
      <ul className="org-cart-item-list">
        {Object.keys(items).map(item => (
          <li className="org-cart-item" key={item}>
            <div className="mol-cart-item-header">
              <ProductImage failbackImage={failbackImage} alt="product" />
              {this.renderProductInfos(items[item], item, 1)}
            </div>
            <div className="mol-cart-item-body">
              <div>
                <div className="atm-cart-item-info-title">Entrega</div>
                <div className="atm-cart-item-info-text">
                  <span><IntlDate>{items[item].expected_delivery_date}</IntlDate></span>
                  {this.renderZipcode()}
                </div>
              </div>
              <div>
                <div className="atm-cart-item-info-title">Quantidade</div>
                <div className="atm-cart-item-info-text">{items[item].quantity} unidades</div>
              </div>
              <div>
                <div className="atm-cart-item-info-title">Valor</div>
                <div className="atm-cart-item-info-text"><IntlMoney className="atm-cart-price">{items[item].prices.total}</IntlMoney></div>
              </div>
              <button
                onClick={this.handleModalOpen}
                value={item}
                name="upsell"
                className="atm-button-up-sell atm-button-up-sell--mobile"
              >
                turbine seu produto <ChevronRightIcon />
              </button>
            </div>
            <div className="mol-cart-item-footer">
              {this.renderActions(items[item], item)}
            </div>
          </li>
        ))}
        {isOpen && this.renderModal()}
      </ul>
    );
  }

  render() {
    const { screenSize } = this.props;

    return isMobile(screenSize) ? this.renderMobile() : this.renderDesktop();
  }
}
