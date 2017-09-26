// @flow

import React from 'react';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { isMobile } from 'utils/helpers';
import Breadcrumbs from 'components/Breadcrumbs';
import { Arrow } from 'components/Icons';

type Props = {
  app: AppStore,
  router: RouterStore,
  locale: {},
  dispatch: () => {},
};

export class Sitemap extends React.Component {
  static props: Props;

  render() {
    const { app: { screenSize } } = this.props;
    const breadcrumb = [
      {
        title: 'Home',
        url: '/',
      },
      {
        title: 'Mapa do site',
      },
    ];
    return (
      <section>
        <div className="container">
          {!isMobile(screenSize) && <Breadcrumbs links={breadcrumb} />}
          <div className="org-sitemap">
            <h2 className="title-sitemap">Mapa do site</h2>

            <div className="list-columns">
              <div className="atm-list">
                <ul className="qrk-list-links">
                  <li className="title-list-link">Produtos</li>
                  <li><NavLink to="#"><Arrow />Cartão de visita</NavLink></li>
                  <li><NavLink to="#"><Arrow />Papel timbrado</NavLink></li>
                  <li><NavLink to="#"><Arrow />Pasta</NavLink></li>
                  <li><NavLink to="#"><Arrow />Receituário</NavLink></li>
                  <li><NavLink to="#"><Arrow />Envelope</NavLink></li>
                  <li><NavLink to="#"><Arrow />Bloco de Notas</NavLink></li>
                  <li><NavLink to="#"><Arrow />Santinho</NavLink></li>
                  <li><NavLink to="#"><Arrow />Cartão fidelidade</NavLink></li>
                  <li><NavLink to="#"><Arrow />Cartão postal</NavLink></li>
                  <li><NavLink to="#"><Arrow />Convite</NavLink></li>
                  <li><NavLink to="#"><Arrow />Filipeta</NavLink></li>
                  <li><NavLink to="#"><Arrow />Flyer</NavLink></li>
                  <li><NavLink to="#"><Arrow />Folder</NavLink></li>
                  <li><NavLink to="#"><Arrow />Folhetos</NavLink></li>
                  <li><NavLink to="#"><Arrow />Marca Página</NavLink></li>
                  <li><NavLink to="#"><Arrow />Panfletos</NavLink></li>
                  <li><NavLink to="#"><Arrow />Calendário de Mesa</NavLink></li>
                  <li><NavLink to="#"><Arrow />Sacola Ecobag</NavLink></li>
                  <li><NavLink to="#"><Arrow />Carimbo</NavLink></li>
                </ul>

                <ul className="qrk-list-links">
                  <li><NavLink to="#"><Arrow />Caneca</NavLink></li>
                  <li><NavLink to="#"><Arrow />Display de Retrovisor</NavLink></li>
                  <li><NavLink to="#"><Arrow />Tag</NavLink></li>
                  <li><NavLink to="#"><Arrow />Vale Presente</NavLink></li>
                  <li><NavLink to="#"><Arrow />Ventarola</NavLink></li>
                  <li><NavLink to="#"><Arrow />Crachá</NavLink></li>
                  <li><NavLink to="#"><Arrow />Banner</NavLink></li>
                  <li><NavLink to="#"><Arrow />Banner L</NavLink></li>
                  <li><NavLink to="#"><Arrow />Banner Roll Up</NavLink></li>
                  <li><NavLink to="#"><Arrow />Cartaz</NavLink></li>
                  <li><NavLink to="#"><Arrow />Posters</NavLink></li>
                  <li><NavLink to="#"><Arrow />Banner X</NavLink></li>
                  <li><NavLink to="#"><Arrow />Faixa</NavLink></li>
                  <li><NavLink to="#"><Arrow />Pôster Adesivo</NavLink></li>
                  <li><NavLink to="#"><Arrow />Canvas</NavLink></li>
                  <li><NavLink to="#"><Arrow />Lona Blackligth</NavLink></li>
                  <li><NavLink to="#"><Arrow />Mobiliário Urbano</NavLink></li>
                  <li><NavLink to="#"><Arrow />Adesivo de Parede</NavLink></li>
                  <li><NavLink to="#"><Arrow />Adesivo de Piso</NavLink></li>
                  <li><NavLink to="#"><Arrow />Cardápio de Plástico</NavLink></li>
                </ul>

                <ul className="qrk-list-links">
                  <li><NavLink to="#"><Arrow />Cardápio de Balcão</NavLink></li>
                  <li><NavLink to="#"><Arrow />Display de Balcão</NavLink></li>
                  <li><NavLink to="#"><Arrow />Display de Mesa</NavLink></li>
                  <li><NavLink to="#"><Arrow />Jogo americano</NavLink></li>
                  <li><NavLink to="#"><Arrow />Móbile</NavLink></li>
                  <li><NavLink to="#"><Arrow />Papel Bandeja</NavLink></li>
                  <li><NavLink to="#"><Arrow />Placa</NavLink></li>
                  <li><NavLink to="#"><Arrow />Testeira</NavLink></li>
                  <li><NavLink to="#"><Arrow />Brochura</NavLink></li>
                  <li><NavLink to="#"><Arrow />Catálogo</NavLink></li>
                  <li><NavLink to="#"><Arrow />Livreto</NavLink></li>
                  <li><NavLink to="#"><Arrow />Revista</NavLink></li>
                  <li><NavLink to="#"><Arrow />Adesivo</NavLink></li>
                  <li><NavLink to="#"><Arrow />Etiquetas</NavLink></li>
                  <li><NavLink to="#"><Arrow />Calendário de Parede</NavLink></li>
                  <li><NavLink to="#"><Arrow />Rótulo</NavLink></li>
                  <li><NavLink to="#"><Arrow />Cardeneta</NavLink></li>
                  <li><NavLink to="#"><Arrow />Caderno</NavLink></li>
                  <li><NavLink to="#"><Arrow />Caneta Metĺica</NavLink></li>
                  <li><NavLink to="#"><Arrow />Caneta Plástica</NavLink></li>
                </ul>

                <ul className="qrk-list-links">
                  <li><NavLink to="#"><Arrow />Chaveiro</NavLink></li>
                  <li><NavLink to="#"><Arrow />Ímã</NavLink></li>
                  <li><NavLink to="#"><Arrow />Lápis</NavLink></li>
                  <li><NavLink to="#"><Arrow />Pen drive</NavLink></li>
                  <li><NavLink to="#"><Arrow />Porta Cartões</NavLink></li>
                  <li><NavLink to="#"><Arrow />Squeeze</NavLink></li>
                  <li><NavLink to="#"><Arrow />Display de Balcão</NavLink></li>
                  <li><NavLink to="#"><Arrow />Display de Retrovisor</NavLink></li>
                  <li><NavLink to="#"><Arrow />Identificador de Porta</NavLink></li>
                  <li><NavLink to="#"><Arrow />Agenda</NavLink></li>
                  <li><NavLink to="#"><Arrow />Calendário de Parede</NavLink></li>
                  <li><NavLink to="#"><Arrow />Pragão</NavLink></li>
                </ul>
              </div>
            </div>

            <div className="list-columns">
              <div className="three-columns">
                <div className="atm-list">
                  <ul className="qrk-list-links">
                    <li className="title-list-link">Categorias</li>
                    <li><NavLink to="#"><Arrow />Eleições</NavLink></li>
                    <li><NavLink to="#"><Arrow />Fotógrafos</NavLink></li>
                    <li><NavLink to="#"><Arrow />Advogados</NavLink></li>
                    <li><NavLink to="#"><Arrow />Informática</NavLink></li>
                    <li><NavLink to="#"><Arrow />Engenharia</NavLink></li>
                    <li><NavLink to="#"><Arrow />Contadores</NavLink></li>
                  </ul>

                  <ul className="qrk-list-links">
                    <li><NavLink to="#"><Arrow />Dentistas</NavLink></li>
                    <li><NavLink to="#"><Arrow />Bares e Restaurantes</NavLink></li>
                    <li><NavLink to="#"><Arrow />Baladas</NavLink></li>
                    <li><NavLink to="#"><Arrow />Papelaria</NavLink></li>
                    <li><NavLink to="#"><Arrow />Materiais Promocionais</NavLink></li>
                    <li><NavLink to="#"><Arrow />Materiais de Sinalização</NavLink></li>
                    <li><NavLink to="#"><Arrow />Ponto de Venda</NavLink></li>
                  </ul>

                  <ul className="qrk-list-links">
                    <li><NavLink to="#"><Arrow />Banners</NavLink></li>
                    <li><NavLink to="#"><Arrow />Adesivos</NavLink></li>
                    <li><NavLink to="#"><Arrow />Materiais para Eventos</NavLink></li>
                    <li><NavLink to="#"><Arrow />Materiais para Escritório</NavLink></li>
                    <li><NavLink to="#"><Arrow />Mais vendidos</NavLink></li>
                    <li><NavLink to="#"><Arrow />Brindes</NavLink></li>
                  </ul>
                </div>
              </div>

              <div className="two-columns">
                <div className="atm-list">
                  <ul className="qrk-list-links">
                    <li className="title-list-link">Institucional</li>
                    <li><NavLink to="#"><Arrow />Banners</NavLink></li>
                    <li><NavLink to="#"><Arrow />Adesivos</NavLink></li>
                    <li><NavLink to="#"><Arrow />Materiais para Eventos</NavLink></li>
                    <li><NavLink to="#"><Arrow />Materiais para Escritório</NavLink></li>
                    <li><NavLink to="#"><Arrow />Mais vendidos</NavLink></li>
                    <li><NavLink to="#"><Arrow />Brindes</NavLink></li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="list-columns">
              <div className="atm-list">
                <ul className="qrk-list-links">
                  <li className="title-list-link">Montagem do Arquivo</li>
                  <li><NavLink to="#"><Arrow />Montagem do Arquivo</NavLink></li>
                  <li><NavLink to="#"><Arrow />Como criar o seu arquivo para impressão no illustrator</NavLink></li>
                  <li><NavLink to="#"><Arrow />Como criar o seu arquivo para impressão no Photoshop</NavLink></li>
                  <li><NavLink to="#"><Arrow />Como criar o seu arquivo para impressão no InDesign</NavLink></li>
                  <li><NavLink to="#"><Arrow />Como criar o seu arquivo para impressão no Corel Draw</NavLink></li>
                  <li><NavLink to="#"><Arrow />Formato final e número de páginas no illustrator</NavLink></li>
                  <li><NavLink to="#"><Arrow />Formato final e número de páginas no Photoshop</NavLink></li>
                  <li><NavLink to="#"><Arrow />Formato final e número de páginas no InDesign</NavLink></li>
                </ul>

                <ul className="qrk-list-links">
                  <li><NavLink to="#"><Arrow />Formato final e número de páginas no Corel Draw</NavLink></li>
                  <li><NavLink to="#"><Arrow />Sangria e margem de segurança no Illustrator</NavLink></li>
                  <li><NavLink to="#"><Arrow />Sangria e margem de segurança no Photoshop</NavLink></li>
                  <li><NavLink to="#"><Arrow />Sangria e margem de segurança no InDesign</NavLink></li>
                  <li><NavLink to="#"><Arrow />Usando imagens em seus documentos no Corel Draw</NavLink></li>
                  <li><NavLink to="#"><Arrow />Convertendo seu arquivo para CMYK no Illustrator</NavLink></li>
                  <li><NavLink to="#"><Arrow />Convertendo seu arquivo para CMYK no Photoshop</NavLink></li>
                </ul>

                <ul className="qrk-list-links">
                  <li><NavLink to="#"><Arrow />Convertendo seu arquivo para CMYK no InDesign</NavLink></li>
                  <li><NavLink to="#"><Arrow />Convertendo seu arquivo para CMYK no Corel Draw</NavLink></li>
                  <li><NavLink to="#"><Arrow />Como usar fontes nos seus textos no Illustrator</NavLink></li>
                  <li><NavLink to="#"><Arrow />Como usar fontes nos seus textos no Photoshop</NavLink></li>
                  <li><NavLink to="#"><Arrow />Como usar fontes nos seus textos no InDesign</NavLink></li>
                  <li><NavLink to="#"><Arrow />Como gerar um arquivo PDF/X-1A no Illustrator</NavLink></li>
                  <li><NavLink to="#"><Arrow />Como gerar um arquivo PDF/X-1A no Illustrator</NavLink></li>
                  <li><NavLink to="#"><Arrow />Como gerar um arquivo PDF/X-1A no InDesign</NavLink></li>
                </ul>

                <ul className="qrk-list-links">
                  <li><NavLink to="#"><Arrow />Como gerar um arquivo PDF/X-1A no Corel Draw</NavLink></li>
                  <li><NavLink to="#"><Arrow />Como configurar o cinza corretamente</NavLink></li>
                  <li><NavLink to="#"><Arrow />Usando a cor preto de forma correta</NavLink></li>
                  <li><NavLink to="#"><Arrow />Linhas finas e textos pequenos</NavLink></li>
                  <li><NavLink to="#"><Arrow />O que é um boneco? Como fazer um boneco?</NavLink></li>
                  <li><NavLink to="#"><Arrow />Dobras e vincos</NavLink></li>
                </ul>
              </div>
            </div>

            <div className="list-columns">
              <div className="two-columns">
                <div className="atm-list">
                  <ul className="qrk-list-links">
                    <li className="title-list-link">Guia de Impressão</li>
                    <li><NavLink to="#"><Arrow />Formatos de Papel</NavLink></li>
                    <li><NavLink to="#"><Arrow />Formato Aberto ou Fechado</NavLink></li>
                    <li><NavLink to="#"><Arrow />Folhas e Páginas</NavLink></li>
                    <li><NavLink to="#"><Arrow />Lâminas</NavLink></li>
                    <li><NavLink to="#"><Arrow />Sangria e Margens</NavLink></li>
                    <li><NavLink to="#"><Arrow />A impressão CMYK</NavLink></li>
                  </ul>

                  <ul className="qrk-list-links">
                    <li><NavLink to="#"><Arrow />O preto no CMYK</NavLink></li>
                    <li><NavLink to="#"><Arrow />Cores especiais e RGB</NavLink></li>
                    <li><NavLink to="#"><Arrow />Bitmap e Vetor</NavLink></li>
                    <li><NavLink to="#"><Arrow />Cuidados com a Tipografia</NavLink></li>
                    <li><NavLink to="#"><Arrow />Boneco (Protótipo)</NavLink></li>
                    <li><NavLink to="#"><Arrow />Checklist (Lista de Checagem)</NavLink></li>
                  </ul>
                </div>
              </div>
              <div className="two-columns">
                <div className="atm-list">
                  <ul className="qrk-list-links">
                    <li className="title-list-link">Gráficas Cidade</li>
                    <li><NavLink to="#"><Arrow />Gráficas em SP</NavLink></li>
                    <li><NavLink to="#"><Arrow />Gráficas em Manaus</NavLink></li>
                    <li><NavLink to="#"><Arrow />Gráficas no RJ</NavLink></li>
                    <li><NavLink to="#"><Arrow />Gráficas em Salvador</NavLink></li>
                    <li><NavLink to="#"><Arrow />Gráficas em Fortaleza</NavLink></li>
                    <li><NavLink to="#"><Arrow />Gráficas em Brasília</NavLink></li>
                  </ul>

                  <ul className="qrk-list-links">
                    <li><NavLink to="#"><Arrow />Gráficas em BH</NavLink></li>
                    <li><NavLink to="#"><Arrow />Gráfica em Porto Alegre</NavLink></li>
                    <li><NavLink to="#"><Arrow />Gráficas em Recife</NavLink></li>
                    <li><NavLink to="#"><Arrow />Gráficas em Curitiba</NavLink></li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return { app: state.app };
}

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(Sitemap);
