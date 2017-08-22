// @flow

import React from 'react';
import swal from 'sweetalert2';
import { shouldComponentUpdate, isMobile } from 'utils/helpers';
import { cartDuplicateFetch, cartDeleteFetch, cartUpdateFetch } from 'actions';
import { FilesIcon, PencilIcon, TrashIcon, ChevronRightIcon } from 'components/Icons';
import Tooltip from 'components/Tooltipster';

type Props = {
  screenSize: string,
  actions: {},
  dispatch: () => {},
};

export default class  extends React.Component {
  shouldComponentUpdate = shouldComponentUpdate;

  static props: Props;

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

  renderAction(item) {
    const { screenSize } = this.props;
    if (isMobile(screenSize)) {
      console.log('cool');
    }
  }

  renderMobile() {
    const { actions } = this.props;

    return (
      <div className="mol-cart-item-desktop-actions">
        {Object.keys(actions)}
      </div>
    );
  }

  render() {
    return <div />;
  }
}

/*
renderActions(item, itemId) {
    const { screenSize } = this.props;
    if (item.type === 'cloud') {
      if (isMobile(screenSize)) {
        return [
          <NavLink key="editar" to={`/configuracao-${item.slug}?edit=1&cart_index=${itemId}`} className="atm-cart-item-action"><PencilIcon />editar</NavLink>,
          <NavLink key="trocar arte" to={`/${item.slug}/editar-produto/${itemId}`} className="atm-cart-item-action"><PencilIcon />trocar arte</NavLink>,
          <button key="excluir" className="atm-cart-item-action" value={itemId} onClick={this.handleDelete}><TrashIcon />excluir</button>
        ];
      }

      return [
        <Tooltip key="editar" text="editar">
          <NavLink to={`/configuracao-${item.slug}?edit=1&cart_index=${itemId}`} className="atm-cart-item-action"><PencilIcon /></NavLink>
        </Tooltip>,
        <Tooltip key="trocar arte" text="trocar arte">
          <NavLink to={`/${item.slug}/editar-produto/${itemId}`} className="atm-cart-item-action"><PencilIcon /></NavLink>
        </Tooltip>,
        <Tooltip key="excluir" text="excluir">
          <button className="atm-cart-item-action" value={itemId} onClick={this.handleDelete}><TrashIcon /></button>
        </Tooltip>
      ];
    }

    if (isMobile(screenSize)) {
      return [
        <button key="duplicar" className="atm-cart-item-action" value={itemId} onClick={this.handleDuplicate}>
          <FilesIcon />duplicar
        </button>,
        <NavLink key="editar" to={`/configuracao-${item.slug}?edit=1&cart_index=${itemId}`} className="atm-cart-item-action"><PencilIcon />editar</NavLink>,
        <button key="excluir" className="atm-cart-item-action" value={itemId} onClick={this.handleDelete}><TrashIcon />excluir</button>
      ];
    }

    return [
      <Tooltip key="duplicar" text="Duplicar">
        <button className="atm-cart-item-action" value={itemId} onClick={this.handleDuplicate}>
          <FilesIcon />
        </button>
      </Tooltip>,
      <Tooltip key="editar" text="Editar">
        <NavLink to={`/configuracao-${item.slug}?edit=1&cart_index=${itemId}`} className="atm-cart-item-action"><PencilIcon /></NavLink>
      </Tooltip>,
      <Tooltip key="excluir" text="Excluir">
        <button className="atm-cart-item-action" value={itemId} onClick={this.handleDelete}><TrashIcon /></button>
      </Tooltip>
    ];
  }
*/
