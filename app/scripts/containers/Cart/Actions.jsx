// @flow

import React from 'react';
import swal from 'sweetalert2';
import { NavLink } from 'react-router-dom';
import { shouldComponentUpdate, isMobile } from 'utils/helpers';
import { cartDuplicateFetch, cartDeleteFetch } from 'actions';
import { FilesIcon, PencilIcon, TrashIcon } from 'components/Icons';
import Tooltip from 'components/Tooltipster';

type Props = {
  screenSize: string,
  itemId: string,
  actions: {},
  locale: {},
  dispatch: () => {},
};

export default class Actions extends React.Component {
  shouldComponentUpdate = shouldComponentUpdate;

  static props: Props;

  handleDuplicate = (ev) => {
    const { dispatch } = this.props;

    dispatch(cartDuplicateFetch(ev.currentTarget.value));
  };

  handleRemove = (ev) => {
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

  renderIcon(action) {
    switch (action) {
      case 'EDIT':
        return <PencilIcon />;
      case 'DUPLICATE':
        return <FilesIcon />;
      case 'REMOVE':
        return <TrashIcon />;
      default:
        return <PencilIcon />;
    }
  }

  renderRemove(action) {
    const { screenSize, itemId, locale } = this.props;

    if (isMobile(screenSize)) {
      return (
        <button
          key={action.label}
          className="atm-cart-item-action"
          value={itemId}
          onClick={this.handleRemove}
        >
          {this.renderIcon(action.label)}
          {locale[action.label]}
        </button>
      );
    }

    return (
      <Tooltip
        key={action.label}
        text={locale[action.label]}
      >
        <button
          className="atm-cart-item-action"
          value={itemId}
          onClick={this.handleRemove}
        >
          {this.renderIcon(action.label)}
        </button>
      </Tooltip>
    );
  }

  renderDuplicate(action) {
    const { screenSize, itemId, locale } = this.props;

    if (isMobile(screenSize)) {
      return (
        <button
          key={action.label}
          className="atm-cart-item-action"
          value={itemId}
          onClick={this.handleDuplicate}
        >
          {this.renderIcon(action.label)}
          {locale[action.label]}
        </button>
      );
    }

    return (
      <Tooltip
        key={action.label}
        text={locale[action.label]}
      >
        <button
          className="atm-cart-item-action"
          value={itemId}
          onClick={this.handleDuplicate}
        >
          {this.renderIcon(action.label)}
        </button>
      </Tooltip>
    );
  }

  renderLink(action) {
    const { screenSize, locale } = this.props;

    if (isMobile(screenSize)) {
      return (
        <NavLink
          key={action.label}
          to={action.target}
          className="atm-cart-item-action"
        >
          {this.renderIcon(action.label)}
          {locale[action.label]}
        </NavLink>
      );
    }

    return (
      <Tooltip
        key={action.label}
        text={locale[action.label]}
      >
        <NavLink to={action.target} className="atm-cart-item-action">
          {this.renderIcon(action.label)}
        </NavLink>
      </Tooltip>
    );
  }

  renderAction(action) {
    if (action.target) {
      return this.renderLink(action);
    }
    switch (action.label) {
      case 'REMOVE':
        return this.renderRemove(action);
      case 'DUPLICATE':
        return this.renderDuplicate(action);
      default:
        return null;
    }
  }

  render() {
    const { screenSize, actions } = this.props;
    return (
      <div className={isMobile(screenSize) ? 'mol-cart-item-footer' : 'mol-cart-item-desktop-actions'}>
        {Object.keys(actions).map((action) => this.renderAction(actions[action]))}
      </div>
    );
  }
}
