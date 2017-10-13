// @flow

import React from 'react';
import { NavLink } from 'react-router-dom';
import { Accordion, AccordionItem, AccordionItemBody, AccordionItemTitle } from 'components/Accordion/nAccordion';

import ContentText from './ContentText';

type Props = {
  screenSize: string,
  selectItem: () => {},
}

const guideList = [
  {
    title: 'FORMATOS E SANGRIA',
    list: [
      {
        title: 'Formatos de papel',
        slug: 'formatos-de-papel',
      },
      {
        title: 'Formato aberto ou fechado',
        slug: 'formato-aberto-ou-fechado',
      },
      {
        title: 'Folhas e páginas',
        slug: 'folhas-e-paginas',
      },
      {
        title: 'Lâminas',
        slug: 'laminas',
      },
      {
        title: 'Sangria e margens',
        slug: 'sangria-e-margens',
      },
    ],
  },
  {
    title: 'COR E IMAGEM',
    list: [
      {
        title: 'A Impressão CMYK',
        slug: 'a-impressao-cmyk',
      },
      {
        title: 'O Preto no CMYK',
        slug: 'o-preto-no-cmyk',
      },
      {
        title: 'Cores Especiais e RGB',
        slug: 'cores-especiais-e-rgb',
      },
      {
        title: 'Bitmap e Vetor',
        slug: 'bitmap-e-vetor',
      },
    ],
  },
  {
    title: 'TIPOGRAFIA',
    list: [
      {
        title: 'Cuidados com a Tipografia',
        slug: 'cuidados-com-tipografia',
      },
    ],
  },
  {
    title: 'FINALIZAÇÃO',
    list: [
      {
        title: 'Boneco (Protótipo)',
        slug: 'boneco-prototipo',
      },
      {
        title: 'Checklist (Lista de Checagem)',
        slug: 'checklist-lista-de-checagem',
      },
    ],
  },
];

export class Sidebar extends React.Component {
  props: Props;

  handleItemClick(slug) {
    this.props.selectItem(slug);
  }

  renderAccordionItem(list) {
    const renderMark = list.map((accordionItem, accordionIndex) => {
      return (
        <li key={accordionIndex.toString()}>
          <NavLink to="#" onClick={() => this.handleItemClick(accordionItem.slug)}>
            {accordionItem.title}
          </NavLink>
        </li>
      );
    });
    return renderMark;
  }

  renderList() {
    const renderMark = guideList.map((item, index) => {
      return (
        <Accordion key={index.toString()} className="qrk-accordion-sidebar">
          <AccordionItem>
            <AccordionItemTitle><span className="circle-number">{index + 1}</span>{item.title}</AccordionItemTitle>
            <AccordionItemBody>
              <ul>
                {this.renderAccordionItem(item.list)}
              </ul>
            </AccordionItemBody>
          </AccordionItem>
        </Accordion>
      );
    });
    return renderMark;
  }

  renderListMobile(index, list) {
    const renderMark = list.map((accordionItem, accordionIndex) => (
      <AccordionItem key={accordionIndex.toString()} >
        <AccordionItemTitle handleClick={() => this.handleItemClick(accordionItem.slug)}>{accordionItem.title}</AccordionItemTitle>
      </AccordionItem>
    ));
    return (
      <Accordion className="qrk-accordion-sidebar accordion-mobile">
        {renderMark}
      </Accordion>
    );
  }

  renderMobile() {
    const renderMark = guideList.map((item, index) => (
      <Accordion key={index.toString()} className="qrk-accordion-sidebar">
        <AccordionItem>
          <AccordionItemTitle><span className="circle-number">{index + 1}</span>{item.title}</AccordionItemTitle>
          <AccordionItemBody>
            {this.renderListMobile(index, item.list)}
          </AccordionItemBody>
        </AccordionItem>
      </Accordion>
    ));
    return (
      <div className="atm-sidebar-file">
        {renderMark}
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
