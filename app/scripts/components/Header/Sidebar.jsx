// @flow

import React from 'react';
import SVG from 'react-inlinesvg';
import Collapse, { Panel } from 'rc-collapse';
import { NavLink } from 'react-router-dom';

import Logo from './../Logo';
import ArrowMenu from './ArrowMenu';

// https://stackoverflow.com/questions/38323226/react-js-collapsible-sidebar
// https://jsfiddle.net/davidg707/cc96ku6t/1/

type Props = {
  screenSize: string,
  links: {},
};

type State = {
  isExpanded: boolean,
};

export class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isExpanded: false,
    };
  }

  static defaultProps = {
    screenSize: 'xs',
  };

  // AccordionClose = <SVG src={require('assets/media/svg/icon_accordionclose.svg')} key="accordion-closed" />;

  // AccordionOpen = <SVG src={require('assets/media/svg/icon_accordionopen.svg')} key="accordion-open" />;

  props: Props;

  state: State;


  handleExpand = (key) => {
    this.setState({
      isExpanded: key.length > 0,
    });
  };

  /*render() {
    const { isExpanded } = this.state;

    return (
      <div className="container-sidebar">
        <p onChange={this.handleExpand}>blablablabla</p>
      </div>
    );
  }*/

  renderMobile() {

    return (
      <div className="container-sidebar" onChange={this.handleExpand}>
        <div className="box-logo" id="logo-sidebar">
          <Logo />
        </div>
        <div className="boxItem-sidebar boxItem-sidebar-mobile">
          <h3 className="titleItem-sidebar">Produtos <ArrowMenu /></h3>
          <ul className="list-item awol-pdd awol-list-style listItem-mobile-sidebar">
            <li className="item-sidebar-mobile">Mais vendidos <ArrowMenu /></li>
            <ul className="list-item awol-list-style subItem-sidebar">
              <li>Bloco de notas</li>
              <li>Cartão de visita</li>
              <li>Envelope</li>
              <li>Papel timbrado</li>
              <li>Pasta</li>
              <li>Receituário</li>
              <li>Calendário de mesa</li>
              <li>Cartão postal</li>
              <li>Convite</li>
              <li>Jogo americano</li>
              <li>Etiqueta</li>
            </ul>
            <li className="item-sidebar-mobile">Papelaria <ArrowMenu /></li>
              <ul className="list-item awol-list-style subItem-sidebar">
                <li>Agenda</li>
                <li>Apostila</li>
                <li>Cartão de visita</li>
                <li>Convite</li>
                <li>Certificados</li>
                <li>Envelope</li>
                <li>Papel timbrado</li>
                <li>Save the Date</li>
                <li>Caléndario de mesa</li>
                <li>Certificados</li>
                <li>Calendário de parede</li>
              </ul>
            <li className="item-sidebar-mobile">Promocionais <ArrowMenu /></li>
              <ul className="list-item awol-list-style subItem-sidebar">
                <li>Balcão PDV</li>
                <li>Cartão fidelidade</li>
                <li>Convie</li>
                <li>Convite de casamento</li>
                <li>Crachá</li>
                <li>Tag</li>
                <li>Cartão postal</li>
                <li>Santinho</li>
                <li>Filipeta</li>
                <li>Folhetos</li>
              </ul>
            <li className="item-sidebar-mobile">Banners e cartazes <ArrowMenu /></li>
              <ul className="list-item awol-list-style subItem-sidebar">
                <li>Banner</li>    
                <li>Banner L</li>
                <li>Banner Roll Up</li>
                <li>Banner X</li>
                <li>Canvas</li>
                <li>Faixa</li>
                <li>Cartaz</li>
                <li>Pôster</li>
                <li>Mobiliário Urbano</li>
              </ul>
            <li className="item-sidebar-mobile">Sinalização <ArrowMenu /></li>
              <ul className="list-item awol-list-style subItem-sidebar">
                <li>Display de Balcão</li>
                <li>Display de Retrovisor</li>
                <li>Identificador de Porta</li>
                <li>Móbile</li>
                <li>Placa</li>
                <li>Prisma de Mesa</li>
                <li>Take One</li>
                <li>Totem</li>
              </ul>
            <li className="item-sidebar-mobile">Ponto de venda <ArrowMenu /></li>
              <ul className="list-item awol-list-style subItem-sidebar">
                <li>Adesivo de Parede</li>
                <li>Adesivo de Piso</li>
                <li>Balcão PDV</li>
                <li>Cardápio de Papel</li>
                <li>Cardápio de Plástico</li>
                <li>Display de Balcão</li>
                <li>Display de mesa</li>
                <li>Jogo americano</li>
                <li>Móbile</li>
                <li>Papel bandeja</li>
                <li>Placa</li>
                <li>Prisma de Mesa</li>
              </ul>
            <li className="item-sidebar-mobile">Revista e catálogos <ArrowMenu /></li>
              <ul className="list-item awol-list-style subItem-sidebar">
                <li>Brochura</li>
                <li>Catálogo</li>
                <li>Livreto</li>
                <li>Revista</li>
              </ul>
            <li className="item-sidebar-mobile">Adesivos e rótulos <ArrowMenu /></li>
              <ul className="list-item awol-list-style subItem-sidebar">
                <li>Adesivo</li>
                <li>Adesivo de Notebook</li>
                <li>Adesivo de Parede</li>
                <li>Adesivo de Piso</li>
                <li>Etiquetas</li>
                <li>Pôster Adesivo</li>
                <li>Pragão</li>
                <li>Rótulo</li>
              </ul>
          </ul>
        </div>
        <div className="boxItem-sidebar">
          <h3 className="titleItem-sidebar">Institucional <ArrowMenu /></h3>
          <ul className="list-item awol-pdd awol-list-style">
            <li>Atendimento</li>
            <li>Blog</li>
            <li>Portfólio</li>
            <li>Printi na imprensa</li>
            <li>Sobre a Printi</li>
          </ul>
        </div>
        <div className="boxItem-sidebar">
          <h3 className="titleItem-sidebar">Ferramentas <ArrowMenu /></h3>
          <ul className="list-item awol-pdd awol-list-style">
            <li>Checagem do arquivo</li>
            <li>Gabaritos</li>
            <li>Guia de impressão</li>
            <li>Montagem do arquivo</li>
            <li>Peso do papel</li>
            <li>Tutoriais</li>
          </ul>
        </div>
        <div className="boxItem-sidebar">
          <h3 className="titleItem-sidebar">Informações <ArrowMenu /></h3>
          <ul className="list-item awol-pdd awol-list-style">
            <li>Como funciona</li>
            <li>Glossário</li>
            <li>Política de privacidade</li>
            <li>Termos de uso</li>
            <li>Vagas</li>
          </ul>
        </div>
      </div>
    );
  }

  renderDesktop() {
    const { isExpanded } = this.state;
    const header = (<div>
      {isExpanded ? this.AccordionClose : this.AccordionOpen}
    </div>);
    return (
      <div className="container-sidebar" onChange={this.handleExpand}>
        <div className="box-logo" id="logo-sidebar">
          <Logo />
        </div>
        <div className="boxItem-sidebar">
          <h3 className="titleItem-sidebar">Institucional <ArrowMenu /></h3>
          <ul className="list-item awol-pdd awol-list-style">
            <li>Atendimento</li>
            <li>Blog</li>
            <li>Portfólio</li>
            <li>Printi na imprensa</li>
            <li>Sobre a Printi</li>
          </ul>
        </div>
        <div className="boxItem-sidebar">
          <h3 className="titleItem-sidebar">Ferramentas <ArrowMenu /></h3>
          <ul className="list-item awol-pdd awol-list-style">
            <li>Checagem do arquivo</li>
            <li>Gabaritos</li>
            <li>Guia de impressão</li>
            <li>Montagem do arquivo</li>
            <li>Peso do papel</li>
            <li>Tutoriais</li>
          </ul>
        </div>
        <div className="boxItem-sidebar">
          <h3 className="titleItem-sidebar">Informações <ArrowMenu /></h3>
          <ul className="list-item awol-pdd awol-list-style">
            <li>Como funciona</li>
            <li>Glossário</li>
            <li>Política de privacidade</li>
            <li>Termos de uso</li>
            <li>Vagas</li>
          </ul>
        </div>
      </div>
    );
  }

  render() {
    const { screenSize } = this.props;

    return ['xs', 'is', 'sm', 'ix', 'md', 'im'].includes(screenSize)
      ? this.renderMobile()
      : this.renderDesktop();
  }
}

export default Sidebar;
