// @flow

import React from 'react';
import { NavLink } from 'react-router-dom';
import { Accordion, AccordionItem, AccordionItemBody, AccordionItemTitle } from 'components/Accordion/nAccordion';

import ContentText from './ContentText';

type Props = {
  screenSize: string,
  selectItem: () => {},
}

const fileMountList = [
  {
    title: 'CRIAR ARQUIVO',
    list: [
      {
        title: 'Illustrator',
        slug: '/como-criar-o-seu-arquivo-para-impressao-no-illustrator',
      },
      {
        title: 'Photoshop',
        slug: '/como-criar-o-seu-arquivo-para-impressao-no-photoshop',
      },
      {
        title: 'InDesign',
        slug: '/como-criar-o-seu-arquivo-para-impressao-no-indesign',
      },
      {
        title: 'Corel Draw',
        slug: '/como-criar-o-seu-arquivo-para-impressao-no-corel-draw',
      },
    ],
  },
  {
    title: 'FORMATO',
    list: [
      {
        title: 'Illustrator',
        slug: '/formato-final-e-numero-de-paginas-no-illustrator',
      },
      {
        title: 'Photoshop',
        slug: '/formato-final-e-numero-de-paginas-no-photoshop',
      },
      {
        title: 'InDesign',
        slug: '/formato-final-e-numero-de-paginas-no-indesign',
      },
      {
        title: 'Corel Draw',
        slug: '/formato-final-e-numero-de-paginas-no-corel-draw',
      },
    ],
  },
  {
    title: 'SANGRIA',
    list: [
      {
        title: 'Illustrator',
        slug: '/sangria-e-margem-de-seguranca-no-illustrator',
      },
      {
        title: 'Photoshop',
        slug: '/sangria-e-margem-de-seguranca-no-photoshop',
      },
      {
        title: 'InDesign',
        slug: '/sangria-e-margem-de-seguranca-no-indesign',
      },
      {
        title: 'Corel Draw',
        slug: '/sangria-e-margem-de-seguranca-no-corel-draw',
      },
    ],
  },
  {
    title: 'RESOLUÇÃO',
    list: [
      {
        title: 'Illustrator',
        slug: '/usando-imagens-em-seus-documentos-no-illustrator',
      },
      {
        title: 'Photoshop',
        slug: '/usando-imagens-em-seus-documentos-no-photoshop',
      },
      {
        title: 'InDesign',
        slug: '/usando-imagens-em-seus-documentos-no-indesign',
      },
      {
        title: 'Corel Draw',
        slug: '/usando-imagens-em-seus-documentos-no-corel-draw',
      },
    ],
  },
  {
    title: 'CMYK',
    list: [
      {
        title: 'Illustrator',
        slug: '/convertendo-seu-arquivo-para-cmyk-no-illustrator',
      },
      {
        title: 'Photoshop',
        slug: '/convertendo-seu-arquivo-para-cmyk-no-photoshop',
      },
      {
        title: 'InDesign',
        slug: '/convertendo-seu-arquivo-para-cmyk-no-indesign',
      },
      {
        title: 'Corel Draw',
        slug: '/convertendo-seu-arquivo-para-cmyk-no-corel-draw',
      },
    ],
  },
  {
    title: 'FONTES',
    list: [
      {
        title: 'Illustrator',
        slug: '/como-usar-fontes-nos-seus-textos-no-illustrator',
      },
      {
        title: 'Photoshop',
        slug: '/como-usar-fontes-nos-seus-textos-no-photoshop',
      },
      {
        title: 'InDesign',
        slug: '/como-usar-fontes-nos-seus-textos-no-indesign',
      },
      {
        title: 'Corel Draw',
        slug: '/como-usar-fontes-nos-seus-textos-no-corel-draw',
      },
    ],
  },
  {
    title: 'PDF X1A',
    list: [
      {
        title: 'Illustrator',
        slug: '/como-gerar-um-arquivo-pdf-x1a-no-illustrator',
      },
      {
        title: 'Photoshop',
        slug: '/como-gerar-um-arquivo-pdf-x1a-no-photoshop',
      },
      {
        title: 'InDesign',
        slug: '/como-gerar-um-arquivo-pdf-x1a-no-indesign',
      },
      {
        title: 'Corel Draw',
        slug: '/como-gerar-um-arquivo-pdf-x1a-no-corel-draw',
      },
    ],
  },
  {
    title: 'CINZA',
    list: [
      {
        title: 'Como configurar o cinza',
        slug: '/como-configurar-o-cinza-corretamente',
      },
    ],
  },
  {
    title: 'PRETO',
    list: [
      {
        title: 'Usando a cor preto',
        slug: '/usando-a-cor-preto-de-forma-correta',
      },
    ],
  },
  {
    title: 'LINHAS FINAS',
    list: [
      {
        title: 'Linhas finas e textos pequenos',
        slug: '/linhas-finas-e-textos-pequenos',
      },
    ],
  },
  {
    title: 'BONECO',
    list: [
      {
        title: 'Como fazer um boneco?',
        slug: '/o-que-e-um-boneco-como-fazer-um-boneco',
      },
    ],
  },
  {
    title: 'DOBRAS E VINCOS',
    list: [
      {
        title: 'Dobras e vincos',
        slug: '/dobras-e-vincos',
      },
    ],
  },
];

export class Sidebar extends React.Component {
  props: Props;

  handleItemClick() {
    this.props.selectItem('formato-final-e-numero-de-paginas-no-illustrator');
  }

  renderList() {
    const renderMark = fileMountList.map((item, index) => {
      return (
        <Accordion key={index.toString()} className="qrk-accordion-sidebar">
          <AccordionItem>
            <AccordionItemTitle><span className="circle-number">1</span>{item.title}</AccordionItemTitle>
            <AccordionItemBody>
              <ul>
                {
                  item.list.map((accordionItem, accordionIndex) => (
                    <li key={accordionIndex.toString()}>
                      <NavLink to="#" onClick={() => this.handleItemClick()}>
                        <img src={require('assets/media/images/illustrator.png')} alt="Illustrator" className="img-mrg-r" />Illustrator
                      </NavLink>
                    </li>
                  ))
                }
                {/* <li>
                  <NavLink to="#" onClick={() => this.handleItemClick()}>
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
                </li> */}
              </ul>
            </AccordionItemBody>
          </AccordionItem>
      </Accordion>
      );
    });
    return (
      <Accordion className="qrk-accordion-sidebar">
        <AccordionItem>
          <AccordionItemTitle><span className="circle-number">1</span>Criar arquivo</AccordionItemTitle>
          <AccordionItemBody>
            <ul>
              <li>
                <NavLink to="#" onClick={() => this.handleItemClick()}>
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
