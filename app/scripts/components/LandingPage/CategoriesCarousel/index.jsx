// @flow

import React from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import { shouldComponentUpdate, isMobile } from 'utils/helpers';
import { Tabs, TabHeader, TabNav, TabBody } from 'components/Tabs';
import { ProductCard } from 'molecules/Products';
import { PrevArrow, NextArrow } from 'components/Carousel';

type Props = {
  screenSize: string,
};

const categoryCarousel = [
  {
    id: '11',
    title: 'Lançamentos',
    show_header: '0',
    show_carousel: '1',
    image: '',
    image_link: '',
    position_header: '1',
    position_carousel: '0',
    product_final_slug: null,
    pages: [
      {
        products: [
          {
            id: '708',
            title: 'Santinho',
            slug: 'santinho',
            image_small: '',
            image_medium: '',
            final_product_id: 'fflyeu_eleiçoes',
            minimum_price: '',
            position_header: '0',
            position_carousel: '0',
            template_enabled: '0',
          },
          {
            id: '26',
            title: 'Caderneta',
            slug: 'caderneta',
            image_small: {
              file: '2016-06/1465997319_fcaderneta.jpg',
              title: 'Impressão Digital de Caderneta',
              alt: 'Impressão Digital de Caderneta',
            },
            image_medium: '',
            final_product_id: 'fcaderneta',
            minimum_price: '131,99',
            position_header: '0',
            position_carousel: '0',
            template_enabled: '0',
          },
          {
            id: '27',
            title: 'Caderno',
            slug: 'caderno',
            image_small: {
              file: '2016-06/fcaderno.jpg',
              title: 'Grafica para Caderno',
              alt: 'Grafica para Caderno',
            },
            image_medium: '',
            final_product_id: 'fcaderno',
            minimum_price: '258,99',
            position_header: '0',
            position_carousel: '1',
            template_enabled: '0',
          },
          {
            id: '30',
            title: 'Caneta Plástica',
            slug: 'caneta-plastica',
            image_small: {
              file: '2016-06/fcaneta-plast.jpg',
              title: 'Impressão Digital de Caneta Plástica',
              alt: 'Impressão Digital de Caneta Plástica',
            },
            image_medium: '',
            final_product_id: 'fcaneta_plast',
            minimum_price: '84,99',
            position_header: '0',
            position_carousel: '2',
            template_enabled: '0',
          },
          {
            id: '33',
            title: 'Chaveiro',
            slug: 'chaveiro',
            image_small: {
              file: '2016-06/fchaveiros.jpg',
              title: 'Gráfica Online para Chaveiro',
              alt: 'Gráfica Online para Chaveiro',
            },
            image_medium: '',
            final_product_id: 'fchaveiros',
            minimum_price: '101,99',
            position_header: '0',
            position_carousel: '3',
            template_enabled: '0',
          },
          {
            id: '31',
            title: 'Canvas',
            slug: 'canvas',
            image_small: {
              file: '2016-06/1466089611_fcanvas-canvas.jpg',
              title: 'Gráfica para Canvas',
              alt: 'Gráfica para Canvas',
            },
            image_medium: '',
            final_product_id: 'fcanvas',
            minimum_price: '23,99',
            position_header: '0',
            position_carousel: '4',
            template_enabled: '0',
          },
          {
            id: '44',
            title: 'Lápis',
            slug: 'lapis',
            image_small: {
              file: '2016-06/flapis.jpg',
              title: 'Impressão Digital em Lápis',
              alt: 'Impressão Digital em Lápis',
            },
            image_medium: '',
            final_product_id: 'flapis',
            minimum_price: '159,99',
            position_header: '0',
            position_carousel: '5',
            template_enabled: '0',
          },
          {
            id: '52',
            title: 'Porta Cartões',
            slug: 'porta-cartoes',
            image_small: {
              file: '2016-06/1466093529_fporta-cartoes.jpg',
              title: 'Gráfica Online para Porta Cartão',
              alt: 'Gráfica Online para Porta Cartão',
            },
            image_medium: '',
            final_product_id: 'fporta_cartoes',
            minimum_price: '232,99',
            position_header: '0',
            position_carousel: '6',
            template_enabled: '0',
          },
        ],
      },
      {
        products: [
          {
            id: '56',
            title: 'Squeeze',
            slug: 'squeeze',
            image_small: {
              file: '2016-06/fsqueeze.jpg',
              title: 'Gráfica Online para Squeeze',
              alt: 'Gráfica Online para Squeeze',
            },
            image_medium: '',
            final_product_id: 'fsqueeze',
            minimum_price: '594,99',
            position_header: '0',
            position_carousel: '7',
            template_enabled: '0',
          },
        ],
      },
    ],
  },
  {
    id: '2',
    title: 'Mais Vendidos',
    show_header: '1',
    show_carousel: '1',
    image: {
      file: '2016-06/mais-vendidos-flyer-vitrine.jpg',
      title: 'Os mais vendidos da gráfica Printi: flyer',
      alt: 'Os mais vendidos da gráfica Printi: flyer',
    },
    image_link: 'flyer',
    position_header: '1',
    position_carousel: '1',
    product_final_slug: 'flyer',
    pages: [
      {
        products: [
          {
            id: '1',
            title: 'Cartão de Visita',
            slug: 'cartao-de-visita',
            image_small: {
              file: '2016-05/fbcard.jpg',
              title: 'Grafica Online para cartões de visita',
              alt: 'Grafica Online para cartões de visita',
            },
            image_medium: {
              file: '2016-09/fbcard-grande.jpg',
              title: '',
              alt: '',
            },
            final_product_id: 'fbcard',
            minimum_price: '26,99',
            position_header: '0',
            position_carousel: '0',
            template_enabled: '1',
          },
          {
            id: '14',
            title: 'Flyer',
            slug: 'flyer',
            image_small: {
              file: '2016-06/fflyeu.jpg',
              title: 'Gráfica para imprimir flyer',
              alt: 'Gráfica para imprimir flyer',
            },
            image_medium: '',
            final_product_id: 'fflyeu',
            minimum_price: '31,99',
            position_header: '0',
            position_carousel: '1',
            template_enabled: '1',
          },
          {
            id: '2',
            title: 'Adesivo',
            slug: 'adesivo',
            image_small: {
              file: '2016-06/fadesivo.jpg',
              title: 'Gráfica Online para imprimir adesivos',
              alt: 'Gráfica Online para imprimir adesivos',
            },
            image_medium: '',
            final_product_id: 'fadesivo',
            minimum_price: '29,99',
            position_header: '0',
            position_carousel: '2',
            template_enabled: '1',
          },
          {
            id: '19',
            title: 'Panfletos',
            slug: 'panfletos',
            image_small: {
              file: '2016-06/fpanfleto.jpg',
              title: 'Gráfica para impressão de panfleto',
              alt: 'Gráfica para impressão de panfleto',
            },
            image_medium: '',
            final_product_id: 'fpanfleto',
            minimum_price: '20,99',
            position_header: '0',
            position_carousel: '3',
            template_enabled: '1',
          },
          {
            id: '5',
            title: 'Banner',
            slug: 'banner',
            image_small: {
              file: '2016-06/fbanner.jpg',
              title: 'Gráfica para impressão de banner',
              alt: 'Gráfica para impressão de banner',
            },
            image_medium: '',
            final_product_id: 'fbanner',
            minimum_price: '31,99',
            position_header: '0',
            position_carousel: '4',
            template_enabled: '1',
          },
          {
            id: '15',
            title: 'Folder',
            slug: 'folder',
            image_small: {
              file: '2016-06/fflyef.jpg',
              title: 'Gráfica online para folder',
              alt: 'Gráfica online para folder',
            },
            image_medium: '',
            final_product_id: 'fflyef',
            minimum_price: '55,99',
            position_header: '0',
            position_carousel: '5',
            template_enabled: '1',
          },
          {
            id: '58',
            title: 'Tag',
            slug: 'tag',
            image_small: {
              file: '2016-06/ftag.jpg',
              title: 'Gráfica online para tag',
              alt: 'Gráfica online para tag',
            },
            image_medium: '',
            final_product_id: 'ftag',
            minimum_price: '14,99',
            position_header: '0',
            position_carousel: '6',
            template_enabled: '0',
          },
        ],
      },
      {
        products: [
          {
            id: '11',
            title: 'Cartaz',
            slug: 'cartaz',
            image_small: {
              file: '2016-06/fpostr-cartaz.jpg',
              title: 'Gráfica para Cartaz',
              alt: 'Gráfica para Cartaz',
            },
            image_medium: '',
            final_product_id: 'fpostr',
            minimum_price: '14,99',
            position_header: '0',
            position_carousel: '7',
            template_enabled: '1',
          },
          {
            id: '10',
            title: 'Cartão Postal',
            slug: 'cartao-postal',
            image_small: {
              file: '2016-06/fpostal.jpg',
              title: 'Gráfica para impressão de postal',
              alt: 'Gráfica para impressão de postal',
            },
            image_medium: '',
            final_product_id: 'fpostal',
            minimum_price: '29,99',
            position_header: '0',
            position_carousel: '8',
            template_enabled: '1',
          },
          {
            id: '17',
            title: 'Marca Página',
            slug: 'marca-pagina',
            image_small: {
              file: '2016-06/fmp.jpg',
              title: 'Gráfica para Marca-Página',
              alt: 'Gráfica para Marca-Página',
            },
            image_medium: '',
            final_product_id: 'fmp',
            minimum_price: '27,99',
            position_header: '0',
            position_carousel: '9',
            template_enabled: '1',
          },
          {
            id: '21',
            title: 'Pasta',
            slug: 'pasta',
            image_small: {
              file: '2016-06/fpasta.jpg',
              title: 'Gráfica Online para Pasta',
              alt: 'Gráfica Online para Pasta',
            },
            image_medium: '',
            final_product_id: 'fpasta',
            minimum_price: '160,99',
            position_header: '0',
            position_carousel: '10',
            template_enabled: '1',
          },
          {
            id: '12',
            title: 'Convite',
            slug: 'convite',
            image_small: {
              file: '2016-06/fconvite.jpg',
              title: 'Impressão Digital de Convite',
              alt: 'Impressão Digital de Convite',
            },
            image_medium: '',
            final_product_id: 'fconvite',
            minimum_price: '29,99',
            position_header: '0',
            position_carousel: '11',
            template_enabled: '1',
          },
          {
            id: '39',
            title: 'Etiquetas',
            slug: 'etiquetas',
            image_small: {
              file: '2016-06/fetiqueta.jpg',
              title: 'Gráfica On line para Etiqueta',
              alt: 'Gráfica On line para Etiqueta',
            },
            image_medium: '',
            final_product_id: 'fetiqueta',
            minimum_price: '29,99',
            position_header: '0',
            position_carousel: '12',
            template_enabled: '0',
          },
          {
            id: '22',
            title: 'Pôster',
            slug: 'poster',
            image_small: {
              file: '2016-06/fpostr2.jpg',
              title: 'Gráfica Online para Pôster',
              alt: 'Gráfica Online para Pôster',
            },
            image_medium: '',
            final_product_id: 'fpostr2',
            minimum_price: '14,99',
            position_header: '0',
            position_carousel: '13',
            template_enabled: '1',
          },
          {
            id: '62',
            title: 'Bloco de Notas',
            slug: 'bloco-de-notas',
            image_small: {
              file: '2017-04/bloco-notas-header1.jpg',
              title: 'Gráfica para imprimir bloco de nota',
              alt: 'Gráfica para imprimir bloco de nota',
            },
            image_medium: '',
            final_product_id: 'fwrpad',
            minimum_price: '95,99',
            position_header: '0',
            position_carousel: '14',
            template_enabled: '1',
          },
        ],
      },
      {
        products: [
          {
            id: '51',
            title: 'Placa',
            slug: 'placa',
            image_small: {
              file: '2016-06/fplaca.jpg',
              title: 'Impressão Digital de Placa',
              alt: 'Impressão Digital de Placa',
            },
            image_medium: '',
            final_product_id: 'fplaca',
            minimum_price: '23,99',
            position_header: '0',
            position_carousel: '15',
            template_enabled: '0',
          },
        ],
      },
    ],
  },
  {
    id: '12',
    title: 'Ofertas',
    show_header: '0',
    show_carousel: '1',
    image: '',
    image_link: '',
    position_header: '0',
    position_carousel: '2',
    product_final_slug: null,
    pages: [
      {
        products: [
          {
            id: '20',
            title: 'Papel Timbrado',
            slug: 'papel-timbrado',
            image_small: {
              file: '2016-06/fnotep.jpg',
              title: 'Gráfica On line para Papel Timbrado',
              alt: 'Gráfica On line para Papel Timbrado',
            },
            image_medium: '',
            final_product_id: 'fnotep',
            minimum_price: '28,99',
            position_header: '0',
            position_carousel: '0',
            template_enabled: '1',
          },
          {
            id: '55',
            title: 'Rótulo',
            slug: 'rotulo',
            image_small: {
              file: '2016-06/frotulo.jpg',
              title: 'Gráfica para impressão de rótulo',
              alt: 'Gráfica para impressão de rótulo',
            },
            image_medium: '',
            final_product_id: 'frotulo',
            minimum_price: '29,99',
            position_header: '0',
            position_carousel: '1',
            template_enabled: '0',
          },
          {
            id: '16',
            title: 'Folhetos',
            slug: 'folhetos',
            image_small: {
              file: '2016-06/ffolheto.jpg',
              title: 'Gráfica Online para Folhetos',
              alt: 'Gráfica Online para Folhetos',
            },
            image_medium: '',
            final_product_id: 'ffolheto',
            minimum_price: '31,99',
            position_header: '0',
            position_carousel: '2',
            template_enabled: '1',
          },
          {
            id: '40',
            title: 'Faixa',
            slug: 'faixa',
            image_small: {
              file: '2016-06/ffaixa.jpg',
              title: 'Gráfica Online para Faixa',
              alt: 'Gráfica Online para Faixa',
            },
            image_medium: '',
            final_product_id: 'ffaixa',
            minimum_price: '43,99',
            position_header: '0',
            position_carousel: '3',
            template_enabled: '0',
          },
          {
            id: '38',
            title: 'Envelope',
            slug: 'envelope',
            image_small: {
              file: '2016-06/fenvelope.jpg',
              title: 'Gráfica para Envelopes',
              alt: 'Gráfica para Envelopes',
            },
            image_medium: '',
            final_product_id: 'fenvelope',
            minimum_price: '577,99',
            position_header: '0',
            position_carousel: '4',
            template_enabled: '0',
          },
          {
            id: '23',
            title: 'Receituário',
            slug: 'receituario',
            image_small: {
              file: '2016-06/fwrpad2.jpg',
              title: 'Impressão Digital de Receituário',
              alt: 'Impressão Digital de Receituário',
            },
            image_medium: '',
            final_product_id: 'fwrpad2',
            minimum_price: '95,99',
            position_header: '0',
            position_carousel: '5',
            template_enabled: '1',
          },
          {
            id: '32',
            title: 'Catálogo',
            slug: 'catalogo',
            image_small: {
              file: '2016-06/fstbro.jpg',
              title: 'Gráfica On line para Catálogo',
              alt: 'Gráfica On line para Catálogo',
            },
            image_medium: '',
            final_product_id: 'fstbro',
            minimum_price: '280,99',
            position_header: '0',
            position_carousel: '6',
            template_enabled: '0',
          },
          {
            id: '7',
            title: 'Banner Roll Up',
            slug: 'banner-roll-up',
            image_small: {
              file: '2016-06/fbannerroll.jpg',
              title: 'Impressão Digital de Banner Roll-Up',
              alt: 'Impressão Digital de Banner Roll-Up',
            },
            image_medium: '',
            final_product_id: 'fbannerroll',
            minimum_price: '187,99',
            position_header: '0',
            position_carousel: '7',
            template_enabled: '1',
          },
        ],
      },
      {
        products: [
          {
            id: '9',
            title: 'Cartão Fidelidade',
            slug: 'cartao-fidelidade',
            image_small: {
              file: '2016-06/fcfidel.jpg',
              title: 'Gráfica Online para Cartão Fidelidade',
              alt: 'Gráfica Online para Cartão Fidelidade',
            },
            image_medium: '',
            final_product_id: 'fcfidel',
            minimum_price: '26,99',
            position_header: '0',
            position_carousel: '8',
            template_enabled: '1',
          },
          {
            id: '3',
            title: 'Adesivo de Parede',
            slug: 'adesivo-de-parede',
            image_small: {
              file: '2016-06/fadesivo-parede.jpg',
              title: 'Gráfica para imprimir adesivo de parede',
              alt: 'Gráfica para imprimir adesivo de parede',
            },
            image_medium: '',
            final_product_id: 'fadesivo_parede',
            minimum_price: '36,99',
            position_header: '0',
            position_carousel: '9',
            template_enabled: '0',
          },
          {
            id: '29',
            title: 'Caneta Metálica',
            slug: 'caneta-metalica',
            image_small: {
              file: '2016-06/1465997502_fcaneta-metal.jpg',
              title: 'Gráfica Online para Caneta Metálica',
              alt: 'Gráfica Online para Caneta Metálica',
            },
            image_medium: '',
            final_product_id: 'fcaneta_metal',
            minimum_price: '132,99',
            position_header: '0',
            position_carousel: '10',
            template_enabled: '0',
          },
          {
            id: '24',
            title: 'Banner X',
            slug: 'banner-x',
            image_small: {
              file: '2016-06/fbannerx.jpg',
              title: 'Gráfica para Banner X',
              alt: 'Gráfica para Banner X',
            },
            image_medium: '',
            final_product_id: 'fbannerx',
            minimum_price: '54,99',
            position_header: '0',
            position_carousel: '11',
            template_enabled: '1',
          },
          {
            id: '13',
            title: 'Filipeta',
            slug: 'filipeta',
            image_small: {
              file: '2016-06/ffilipeta.jpg',
              title: 'Impressão Digital de Filipeta',
              alt: 'Impressão Digital de Filipeta',
            },
            image_medium: '',
            final_product_id: 'ffilipeta',
            minimum_price: '31,99',
            position_header: '0',
            position_carousel: '12',
            template_enabled: '1',
          },
          {
            id: '54',
            title: 'Revista',
            slug: 'revista',
            image_small: {
              file: '2016-06/frevista.jpg',
              title: 'Gráfica para Revista',
              alt: 'Gráfica para Revista',
            },
            image_medium: '',
            final_product_id: 'frevista',
            minimum_price: '280,99',
            position_header: '0',
            position_carousel: '13',
            template_enabled: '0',
          },
          {
            id: '8',
            title: 'Cardápio de Plástico',
            slug: 'cardapio-de-plastico',
            image_small: {
              file: '2016-06/fcardapio.jpg',
              title: 'Gráfica para Cardápio de Plástico',
              alt: 'Gráfica para Cardápio de Plástico',
            },
            image_medium: '',
            final_product_id: 'fcardapio',
            minimum_price: '17,99',
            position_header: '0',
            position_carousel: '14',
            template_enabled: '1',
          },
          {
            id: '36',
            title: 'Display de Mesa',
            slug: 'display-de-mesa',
            image_small: {
              file: '2016-06/fdisplay-mesa.jpg',
              title: 'Gráfica Online para Display de Mesa',
              alt: 'Gráfica Online para Display de Mesa',
            },
            image_medium: '',
            final_product_id: 'fdisplay_mesa',
            minimum_price: '21,99',
            position_header: '0',
            position_carousel: '15',
            template_enabled: '0',
          },
        ],
      },
    ],
  },
];

export class CategoriesCarouselBlock extends React.Component {

  shouldComponentUpdate = shouldComponentUpdate;

  static props: Props;

  static state: State;

  renderMobile(category) {
    return (
      <Slider
        arrows={false}
        dots={false}
        autoplay={false}
        key={category.id}
        infinite={false}
      >
        {category.pages.map((products) => (
          products.products.map((product) => (
            <div key={product.slug}>
              <ProductCard
                slug={product.slug}
                image={product.image_small}
                title={product.title}
                price={product.minimum_price}
              />
            </div>
          ))
        ))}
      </Slider>
    );
  }

  renderDesktop(category) {
    return (
      <Slider
        nextArrow={<NextArrow />}
        prevArrow={<PrevArrow />}
        dots={false}
        autoplay={false}
        key={category.id}
      >
        {category.pages.map((products) => (
          <div key={`products-${products.products[0].slug}`}>
            {products.products.map((product) => (
              <ProductCard
                slug={product.slug}
                image={product.image_small}
                title={product.title}
                price={product.minimum_price}
                key={product.slug}
              />
            ))}
          </div>
        ))}
      </Slider>
    );
  }

  render() {
    const { screenSize } = this.props;

    return (
      <Tabs className="org-categories-carousel container">
        <TabHeader>
          {categoryCarousel.map((category) => <TabNav key={category.id}>{category.title}</TabNav>)}
        </TabHeader>
        <TabBody>
          {categoryCarousel.map((category) => (isMobile(screenSize) ? this.renderMobile(category) : this.renderDesktop(category)))}
        </TabBody>
      </Tabs>
    );
  }
}

function mapStateToProps(state) {
  return {
    screenSize: state.app.screenSize,
  };
}

export default connect(mapStateToProps)(CategoriesCarouselBlock);
