// @flow

import React from 'react';
import { NavLink } from 'react-router-dom';
import { Accordion, AccordionItem, AccordionItemBody, AccordionItemTitle } from 'components/Accordion/nAccordion';

import ContentText from './ContentText';

type Props = {
  screenSize: string;
}

export class Sidebar extends React.Component {
  props: Props;

  renderList() {
    return (
      <Accordion className="qrk-accordion-sidebar">
        <AccordionItem>
          <AccordionItemTitle><span className="circle-number">1</span>Formatos e sangria</AccordionItemTitle>
          <AccordionItemBody>
            <ul>
              <li>
                <NavLink to="#">
                  Formatos de papel
                </NavLink>
              </li>
              <li>
                <NavLink to="#">
                  Formato aberto ou fechado
                </NavLink>
              </li>
              <li>
                <NavLink to="#">
                  Folhas e páginas
                </NavLink>
              </li>
              <li>
                <NavLink to="#">
                  Lâminas
                </NavLink>
              </li>
              <li>
                <NavLink to="#">
                  Sangria e margens
                </NavLink>
              </li>
            </ul>
          </AccordionItemBody>
        </AccordionItem>
      </Accordion>
    );
  }

  renderListMobile() {
    return (
      <Accordion className="qrk-accordion-sidebar accordion-mobile">
        <AccordionItem>
          <AccordionItemTitle>Formatos de papel</AccordionItemTitle>
          <AccordionItemBody>
            <ContentText />
          </AccordionItemBody>
        </AccordionItem>
      </Accordion>
    );
  }

  renderMobile() {
    return (
      <div className="atm-sidebar-file">
        <Accordion className="qrk-accordion-sidebar">
          <AccordionItem>
            <AccordionItemTitle>Formatos e sangria</AccordionItemTitle>
            <AccordionItemBody>
              {this.renderListMobile()}
            </AccordionItemBody>
          </AccordionItem>
        </Accordion>
      </div>
    );
  }

  renderDesktop() {
    return (
      <div className="atm-sidebar-file">
        {this.renderList()}
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
