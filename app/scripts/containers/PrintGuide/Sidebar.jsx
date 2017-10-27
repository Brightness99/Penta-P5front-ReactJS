// @flow

import React from 'react';
import { NavLink } from 'react-router-dom';
import { Accordion, AccordionItem, AccordionItemBody, AccordionItemTitle } from 'components/Accordion/nAccordion';

import ContentText from './ContentText';

type Props = {
  screenSize: string,
  selectItem: () => {},
  guide: {
    guideData: {
      content: ''
    }
  }
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

  state = {
    index1: -1,
    index2: -1,
    activeIndex: -1,
  }

  handleItemClick(slug, i1 = 0, i2 = 0) {
    const { selectItem } = this.props;
    const { index1, index2 } = this.state;
    if (typeof selectItem === 'function') {
      selectItem(slug);
    }
    if (index1 === i1 && index2 === i2) {
      this.setState({
        index1: -1,
        index2: -1,
      });
    } else {
      this.setState({
        index1: i1,
        index2: i2,
      });
    }
  }

  handleMobileHeaderItemClick(active, index) {
    if (active) {
      this.setState({
        activeIndex: index,
      });
    } else {
      this.setState({
        activeIndex: -1,
      });
    }
  }

  handleMobileSubHeaderItemClick(active, slug, i1 = 0, i2 = 0) {
    const { selectItem } = this.props;
    const { index1, index2 } = this.state;

    if (index1 === i1 && index2 === i2) {
      this.setState({
        index1: -1,
        index2: -1,
      });
    } else {
      this.setState({
        index1: i1,
        index2: i2,
      });
      if (typeof selectItem === 'function' && active) {
        selectItem(slug);
      }
    }
  }

  renderAccordionItem(list) {
    const renderMark = list.map((accordionItem, accordionIndex) => {
      return (
        <li key={accordionIndex.toString()}>
          <NavLink to={`/guia-de-impressao/${accordionItem.slug}`} onClick={() => this.handleItemClick(accordionItem.slug)}>
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
    const { guide } = this.props;
    const { index1, index2 } = this.state;
    const renderMark = list.map((accordionItem, accordionIndex) => {
      const guideData = (index1 === index && index2 === accordionIndex) ? guide : null;
      return (
        <AccordionItem key={accordionIndex.toString()}>
          <AccordionItemTitle handleActive={(active) => this.handleMobileSubHeaderItemClick(active, accordionItem.slug, index, accordionIndex)}>{accordionItem.title}</AccordionItemTitle>
          <AccordionItemBody className={(index1 === -1 && index2 === -1) ? '' : 'atm-accordion-sub-item-body'}>
            <ContentText guide={guideData} />
          </AccordionItemBody>
        </AccordionItem>
      );
    });
    return (
      <Accordion className="qrk-accordion-sidebar accordion-mobile">
        {renderMark}
      </Accordion>
    );
  }

  renderMobile() {
    const { activeIndex } = this.state;
    const renderMark = guideList.map((item, index) => {
      const subClass = (index === activeIndex) ? 'atm-accordion-sub-item-body' : 'atm-accordion-sub-item-body-close';
      return (
        <AccordionItem key={index.toString()}>
          <AccordionItemTitle handleActive={(active) => this.handleMobileHeaderItemClick(active, index)}><span className="circle-number">{index + 1}</span>{item.title}</AccordionItemTitle>
          <AccordionItemBody className={subClass}>
            {this.renderListMobile(index, item.list)}
          </AccordionItemBody>
        </AccordionItem>
      );
    });
    return (
      <div className="atm-sidebar-file">
        <Accordion className="qrk-accordion-sidebar">
          {renderMark}
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
