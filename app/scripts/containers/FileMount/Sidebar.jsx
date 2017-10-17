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
          <AccordionItemTitle><span className="circle-number">1</span>Criar arquivo</AccordionItemTitle>
          <AccordionItemBody>
            <ul>
              <li>
                <NavLink to="#">
                  <img src={require('assets/media/images/illustrator.png')} alt="Illustrator" className="img-mrg-r" />Illustrator
                </NavLink>
              </li>
              <li>
                <NavLink to="#">
                  <img src={require('assets/media/images/photoshop.png')} alt="Photoshop" className="img-mrg-r" />Photoshop
                </NavLink>
              </li>
              <li>
                <NavLink to="#">
                  <img src={require('assets/media/images/indesign.png')} alt="InDesign" className="img-mrg-r" />InDesign
                </NavLink>
              </li>
              <li>
                <NavLink to="#">
                  <img src={require('assets/media/images/coreldraw.png')} alt="CorelDraw" className="img-mrg-r" />CorelDraw
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
          <AccordionItemTitle>Illustrator</AccordionItemTitle>
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
            <AccordionItemTitle>Criar Arquivo</AccordionItemTitle>
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
