//@flow

import React from 'react';
import SVG from 'react-inlinesvg';
import Collapse, { Panel } from 'rc-collapse';

import { NavLink } from 'react-router-dom';

//https://stackoverflow.com/questions/38323226/react-js-collapsible-sidebar
//https://jsfiddle.net/davidg707/cc96ku6t/1/

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

  //AccordionClose = <SVG src={require('assets/media/svg/icon_accordionclose.svg')} key="accordion-closed" />;

  //AccordionOpen = <SVG src={require('assets/media/svg/icon_accordionopen.svg')} key="accordion-open" />;

  props: Props;

  state: State;


  handleExpand = (key) => {
    this.setState({
      isExpanded: key.length > 0,
    });
  };

  render() {
    const { isExpanded } = this.state;

    return (
      <div className="container-sidebar">
        <p onChange={this.handleExpand}>blablablabla</p>
      </div>
    );
  }

  /*render() {
    const { isExpanded } = this.state;
    const header = (<div>
      {isExpanded ? this.AccordionClose : this.AccordionOpen}
    </div>);
    return (
      //images/new-printi-logo.png
      <Collapse
        className="container-sidebar"
        onChange={this.handleExpand}
      >
        <p>asdadsasdasdasdasd</p>
        <Panel
          header={header}
          showArrow={false}
        >
          <ul>
            <li>Institucional</li>
            <li>Atendimento</li>
            <li>Blog</li>
            <li>Portfólio</li>
            <li>Printi na imprensa</li>
            <li>Sobre a Printi</li>
          </ul>
          <ul>
            <li>Ferramentas</li>
            <li>Checagem do arquivo</li>
            <li>Gabaritos</li>
            <li>Guia de impressão</li>
            <li>Montagem do arquivo</li>
            <li>Peso do papel</li>
            <li>Tutoriais</li>
          </ul>
          <ul>
            <li>Informações</li>
            <li>Como funciona</li>
            <li>Glossário</li>
            <li>Política de privacidade</li>
            <li>Termos de uso</li>
            <li>Vagas</li>
          </ul>
        </Panel>
      </Collapse>
    );
  }*/
}

export default Sidebar;
