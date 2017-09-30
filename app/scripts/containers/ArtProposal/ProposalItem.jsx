// @flow
import React from 'react';
import Breadcrumbs from 'components/Breadcrumbs';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import config from 'config';
import Slider from 'react-slick';
import { RoundedTransparentButton } from 'atoms/Buttons';
import { DownloadIcon } from 'components/Icons';
import { PrevArrow, NextArrow } from 'components/Carousel/Arrows';

const docs = [
  {
    image: {
      URL: 'assets/final/img/destaque-pagar-faturado.jpg',
      ALT: 'Pague faturado na gráfica Printi',
    },
  },
  {
    image: {
      URL: 'assets/final/img/destaque-pagina-gabaritos.jpg',
      ALT: 'Baixe Gabaritos da grafica online Printi',
    },
  },
  {
    image: {
      URL: 'assets/final/img/destaque-guia-impressao.jpg',
      ALT: 'Guia de impressão da grafica online melhor do Brasil',
    },
  },
  {
    image: {
      URL: 'assets/final/img/destaque-montagem-arquivo.jpg',
      ALT: 'Montagem do arquivo da Printi melhor gráfica do Brasil',
    },
  },
  {
    image: {
      URL: 'assets/final/img/destaque-tutorial-cartao-visita.jpg',
      ALT: 'Tutorial de cartões de visita da grafica online Printi',
    },
  },
];

export class ProposalItem extends React.Component {
  renderDocs = () => (
    docs.map((doc, index) => (
      <div className="slider-doc-item" key={index.toString()}>
        <div className="doc">
          <img src={`${config.basePath}${doc.image.URL}`} alt={doc.image.ALT} />
        </div>
      </div>
    ))
  );

  render() {
    return (
      <div className="proposal-item">
        <div className="item-header">
          <div className="avatar-wrapper">
            <image src="" />
          </div>
          <div className="name-wrapper">
            <p className="name">Enviado por</p>
            <p className="position">Designer Printi</p>
          </div>
        </div>
        <div className="item-body">
          <p className="proposal-text">Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Nullam quis risus eget urna mollis ornare vel eu leo. Donec ullamcorper nulla non metus auctor fringilla. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Sed posuere consectetur est at lobortis.</p>
          <div className="date">Enviado em 20/04/2015 | 16:45</div>
          <div className="box-docs-wrapper">
            <div className="box-docs">
              <Slider
                className="slider-docs"
                dots={false}
                infinite={false}
                nextArrow={<NextArrow />}
                prevArrow={<PrevArrow />}
                dotsClass="atm-carousel-dots"
                autoplay={false}
                slidesToShow={3}
                slidesToScroll={3}
              >
                {this.renderDocs()}
              </Slider>
            </div>
          </div>
        </div>
        <div className="item-footer">
          <div className="button-wrapper">
            <RoundedTransparentButton>
              <DownloadIcon />
              <span>DOWNLOAD Dos ARQUIVOS</span>
            </RoundedTransparentButton>
          </div>
          <div className="note">
            IMPORTANTE! Esse arquivo é apenas para aprovação. Não é o arquivo final e não deve ser utilizado para a produção do material. 
          </div>
        </div>
      </div>
    );
  }
}

export default ProposalItem;

