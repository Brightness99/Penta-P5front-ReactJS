// @flow

import React from 'react';
import { shouldComponentUpdate, isMobile } from 'utils/helpers';
import { NavLink } from 'react-router-dom';
import { cartDuplicateFetch, cartDeleteFetch } from 'actions';
import { FilesIcon, PencilIcon, TrashIcon, ChevronRightIcon } from 'components/Icons';
import { IntlDate, IntlMoney, IntlZipcode } from 'components/Intl';
import { CheckBox } from 'components/Input';
import { TextButton, RoundedConfirmationButton } from 'atoms/Buttons';

import cx from 'classnames';
import Modal from 'components/Modal';

type Props = {
  screenSize: string,
  items: {},
  zipcode: number,
  dispatch: () => {},
};

type State = {
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
    };
  }
  shouldComponentUpdate = shouldComponentUpdate;

  static props: Props;

  static state: State;

  handleUpsellOpen = (ev) => {
    const { upsell } = this.state;

    this.setState({
      upsell: {
        ...upsell,
        isOpen: true,
        product: ev.currentTarget.name,
      }
    });
  };

  handleUpsellClose = () => {
    this.setState({
      upsell: {
        isOpen: false,
        product: '',
        isSelected: false,
      }
    });
  };

  handleUpsellChoose = (ev) => {
    const { upsell } = this.state;

    this.setState({
      upsell: {
        ...upsell,
        isSelected: !upsell.isSelected,
      }
    });
  };

  handleDuplicate = (ev) => {
    const { dispatch } = this.props;

    dispatch(cartDuplicateFetch(ev.currentTarget.value));
  };

  handleDelete = (ev) => {
    const { dispatch } = this.props;

    dispatch(cartDeleteFetch(ev.currentTarget.value));
  };

  renderModal(product) {
    const { upsell } = this.state;

    return (
      <Modal handleCloseModal={this.handleUpsellClose}>
        <div className="org-up-sell">
          <div className="mol-up-sell-header">
            Turbine seu produto
            <span>Antecipe sua entrega agora mesmo! :)</span>
          </div>
          <div className="mol-up-sell-content">
            <div className="atm-up-sell-content-title">previsão de entrega</div>
            <div className="mol-up-sell-content-main">
              <div className="atm-up-sell-days">-3 <span>dias</span></div>
              <div className="atm-up-sell-delivery">Nova previsão de entrega <IntlDate>04/08/2017</IntlDate></div>
              <label className={cx('atm-up-sell-checkbox', upsell.isSelected && 'atm-up-sell-checkbox--checked')}>
                <CheckBox checked={upsell.isSelected} onChange={this.handleUpsellChoose} value='123' />+ <IntlMoney>{10}</IntlMoney>
              </label>
            </div>
          </div>
          <div className="mol-up-sell-footer">
            <div className="atm-up-sell-prices">
              <IntlMoney>{90.99}</IntlMoney>
              <IntlMoney className="atm-up-sell-prices-after">{100.99}</IntlMoney>
            </div>
            <div className="atm-up-sell-add">
              <TextButton onClick={this.handleUpsellClose}>Cancelar</TextButton>
              <RoundedConfirmationButton
                isEnabled={upsell.isSelected}
                value="val"
                onClick={() => console.log(123)}
              >
                ADICIONAR
              </RoundedConfirmationButton>
            </div>
          </div>
        </div>
      </Modal>
    );
  }

  renderDesktop() {
    const { items } = this.props;
    const { upsell } = this.state;

    return (
      <div className="org-cart-items-desktop">
        {upsell.isOpen && this.renderModal(upsell.product)}
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
                  <img src={require('assets/media/images/cart-item.png')} alt="prod" />
                  <button onClick={this.handleUpsellOpen} name={'revista'} className="atm-button-up-sell">turbine seu produto <ChevronRightIcon /></button>
                </div>
                <div className="mol-cart-item-infos">
                  <div className="atm-cart-item-name">{items[item].project_name}</div>
                  <div className="atm-cart-item-product">{items[item].final_product.name}</div>
                  <ul>
                    <li>90x50mm</li>
                    <li>4x4 cores - couché brilho 250g</li>
                    <li>laminação fosca</li>
                  </ul>
                  <div className="mol-cart-item-actions">
                    <button className="atm-cart-action" value={item} onClick={this.handleDuplicate}><FilesIcon />duplicar</button>
                    <NavLink to={`/configuracao-${items[item].product_slug.slug}/editar/${item}`} className="atm-cart-action"><PencilIcon />editar</NavLink>
                  </div>
                </div>
              </div>
              <div className="mol-cart-item-delivery">
                <IntlDate className="atm-cart-item-date">{'06-25-2015'}</IntlDate>
                <div className="atm-cart-item-zipcode">CEP: <IntlZipcode>{18900000}</IntlZipcode></div>
              </div>
              <div className="mol-cart-item-quantity">
                <div className="atm-cart-item-quantity">2000</div>
              </div>
              <div className="mol-cart-item-price">
                <div className="atm-cart-item-price"><IntlMoney>{150}</IntlMoney></div>
                <div className="mol-cart-item-actions">
                  <button className="atm-cart-action atm-cart-action--red" value={item} onClick={this.handleDelete}><TrashIcon />excluir</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  renderMobileItem(item, key) {
    const { zipcode } = this.props;

    return (
      <li className="org-cart-section" key={key}>
        <div className="mol-cart-item-data">
          <img src={require('assets/media/images/cart-item.png')} alt="prod" />
          <div className="mol-cart-item-infos">
            <div className="atm-cart-item-name">{item.project_name}</div>
            <div className="atm-cart-item-product">{item.final_product.name}</div>
            <ul>
              <li>90x50mm</li>
              <li>4x4 cores - couché brilho 250g</li>
              <li>laminação fosca</li>
            </ul>
          </div>
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
        <div className="mol-cart-item-actions">
          <button className="atm-cart-action"><FilesIcon />duplicar</button>
          <button className="atm-cart-action"><PencilIcon />editar</button>
          <button className="atm-cart-action atm-cart-action--red"><TrashIcon />excluir</button>
        </div>
      </li>
    );
  }

  renderMobile() {
    const { items } = this.props;

    return (
      <ul className="org-cart-item-list">
        {Object.keys(items).map(item => this.renderMobileItem(items[item], item))}
        {/*<Modal onClose={this.handleUpsellClose} />*/}
        <TextButton>Dumb add to cart</TextButton>
      </ul>
    );
  }

  render() {
    const { screenSize } = this.props;

    return isMobile(screenSize) ? this.renderMobile() : this.renderDesktop();
  }
}
