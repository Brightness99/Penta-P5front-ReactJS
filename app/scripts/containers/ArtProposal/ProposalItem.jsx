// @flow
import React from 'react';
import Breadcrumbs from 'components/Breadcrumbs';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import config from 'config';
import Slider from 'react-slick';
import Carousel from '../../components/Carousel';
import { DownloadIcon } from '../../components/Icons';

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
  }
];

export class ProposalItem extends React.Component {

  // renderMobile() {
  //   return (
  //     <div className="proposal-item">
  //       <div className="item-header">
  //         <div className="avatar-wrapper">
  //           <image src="" />
  //         </div>
  //         <div className="name-wrapper">
  //           <p className="name">Enviado por</p>
  //           <p className="position">Designer Printi</p>
  //         </div>
  //       </div>
  //       <p className="proposal-text">Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Nullam quis risus eget urna mollis ornare vel eu leo. Donec ullamcorper nulla non metus auctor fringilla. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Sed posuere consectetur est at lobortis.</p>
  //       <div className="date">Enviado em 20/04/2015 | 16:45</div>
  //       <div className="box-doc">
  //         <Carousel>
  //           <img src="https://d2ofpir5gh0cbr.cloudfront.net/assets/final/img/parque.jpg" alt="Parque Gráfico" />
  //           <img src="https://d2ofpir5gh0cbr.cloudfront.net/assets/final/img/parque.jpg" alt="Parque Gráfico2" />
  //         </Carousel>
  //       </div>
  //       <div className="item-footer">
  //         <div className="">
  //           <button className="download-button">
  //             <SearchIcon />
  //               DOWNLOAD Dos ARQUIVOS
  //           </button>
  //         </div>
  //         <div className="note">
  //           IMPORTANTE! Esse arquivo é apenas para aprovação. Não é o arquivo final e não deve ser utilizado para a produção do material. 
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  // renderDesktop() {
  //   return (
  //     0
  //   );
  // }

  renderDocs = () => (
    docs.map((doc) => ( 
      <div className="slider-doc-item">
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
                dotsClass="atm-carousel-dots"
                autoplay={false}
                slidesToShow={3}
                slidesToScroll={1}
              >
                {this.renderDocs()}
              </Slider>
            </div>
          </div>
        </div>
        <div className="item-footer">
          <div className="button-wrapper">
            <button className="download-button">
              <DownloadIcon />
                DOWNLOAD Dos ARQUIVOS
            </button>
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

