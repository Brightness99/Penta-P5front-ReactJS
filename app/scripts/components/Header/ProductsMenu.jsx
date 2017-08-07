//@flow

import React from 'react';
// import SVG from 'react-inlinesvg';

import TabNavigation from 'components/TabNavigation';

import { Link } from 'react-router-dom';
import { Arrow } from 'components/Icons';

type Props = {
  className: string,
  button?: typeof React.Component,
  screenSize: string,
};

type State = {
  
}

export class ProductsMenu extends React.Component {
  props: Props;
  static state: State;

  render() {
    return (
      <div className="container-submenu productsMenu">
        <ul className="menuLeft list-item awol-pdd awol-list-style" id="tabs">
          <li>Mais vendidos <Arrow /></li>
          <li>Papelaria <Arrow /></li>
          <li>Promocionais <Arrow /></li>
          <li>Banners e Cartazes <Arrow /></li>
          <li>Sinalização <Arrow /></li>
          <li>Ponto de venda <Arrow /></li>
          <li>Revistas e catálogos <Arrow /></li>
          <li>Adesivos e rótulos <Arrow /></li>
        </ul>
        <div className="menuRight tab-content">
          <div>
            <div className="listItems" id="tab-1">
              <p className="listItems-title">MAIS VENDIDOS</p>
              <ul className="list-item awol-pdd awol-list-style">
                <li>Bloco de notas</li>
                <li>Cartão de visita</li>
                <li>Envelope</li>
                <li>Papel timbrado</li>
                <li>Pasta</li>
                <li>Receituário</li>
                <li>Calendário de mesa</li>
                <li>Cartão Postal</li>
                <li>Convite</li>
                <li>Jogo americano</li>
                <li>Etiqueta</li>
                <li>Product 1</li>
                <li>Product 2</li>
                <li>Product 3</li>
                <li>Cartão Postal</li>
                <li>Convite</li>
                <li>Jogo americano</li>
                <li>Etiqueta</li>
              </ul>
            </div>
          </div>
          <div>
            <img src={require('assets/media/images/example-menu.png')} alt="Menu" />
          </div>
        </div>
      </div>
    );
  }
}

export default ProductsMenu;

