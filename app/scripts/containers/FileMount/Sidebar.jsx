// @flow

import React from 'react';
import { Accordion, AccordionItem, AccordionItemBody, AccordionItemTitle } from 'components/Accordion/nAccordion';

export class Sidebar extends React.Component {
  renderList() {
    return (
      <Accordion className="qrk-accordion-sidebar">
        <AccordionItem>
          <AccordionItemTitle><span className="circle-number">1</span>Criar arquivo</AccordionItemTitle>
          <AccordionItemBody>
            <ul>
              <li>Illustrator</li>
              <li>bPhotoshop</li>
              <li>InDesign</li>
              <li>CorelDraw</li>
            </ul>
          </AccordionItemBody>
        </AccordionItem>
      </Accordion>
    );
  }

  render() {
    return (
      <div className="atm-sidebar-file">
        {this.renderList()}
      </div>
    );
  }
}

export default Sidebar;
