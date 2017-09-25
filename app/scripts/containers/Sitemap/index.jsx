// @flow

import React from 'react';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { isMobile } from 'utils/helpers';
import Breadcrumbs from 'components/Breadcrumbs';

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
        title: 'Termos de Uso',
      },
    ];
    return (
      <section>
        <div className="container">
          {!isMobile(screenSize) && <Breadcrumbs links={breadcrumb} />}
          <h2>Mapa do site</h2>

          <div className="aaaa">
            PRODUTOS
            <div className="atm-list">
              <ul className="qrk-list-links">
                <li>
                  <NavLink to="#"> Cartão de visita</NavLink>
                </li>
                <li>
                  <NavLink to="#">Papel timbrado</NavLink>
                </li>
                <li>
                  <NavLink to="#">Pasta</NavLink>
                </li>
                <li>
                  <NavLink to="#">Receituário</NavLink>
                </li>
                <li>
                  <NavLink to="#">Envelope  </NavLink>
                </li>
                <li>
                  <NavLink to="#">Bloco de Notas</NavLink>
                </li>
                <li>
                  <NavLink to="#">Santinho</NavLink>
                </li>
                <li>
                  <NavLink to="#">Cartão fidelidade</NavLink>
                </li>
                <li>
                  <NavLink to="#">Cartão postal</NavLink>
                </li>
                <li>
                  <NavLink to="#">Convite</NavLink>
                </li>
                <li>
                  <NavLink to="#">Filipeta</NavLink>  
                </li>
                <li>
                  <NavLink to="#">Flyer</NavLink>
                </li>
                <li>
                  <NavLink to="#">Folder</NavLink>
                </li>
                <li>
                  <NavLink to="#">Folhetos</NavLink>
                </li>
                <li>
                  <NavLink to="#">Marca Página</NavLink>
                </li>
                <li>
                  <NavLink to="#">Panfletos</NavLink>
                </li>
                <li>
                  <NavLink to="#">Calendário de Mesa</NavLink>
                </li>
              </ul>
              <ul className="qrk-list-links">
                <li>
                  <NavLink to="#">Sacola Ecobag</NavLink>
                </li>
                <li>
                  <NavLink to="#">Carimbo</NavLink>
                </li>
                <li>
                  <NavLink to="#">Caneca</NavLink>
                </li>
                <li>
                  <NavLink to="#">Display de Retrovisor</NavLink>
                </li>
                <li>
                  <NavLink to="#">Tag</NavLink>
                </li>
                <li>
                  <NavLink to="#">Vale Presente</NavLink>
                </li>
                <li>
                  <NavLink to="#">Ventarola</NavLink>
                </li>
                <li>
                  <NavLink to="#">Crachá</NavLink>
                </li>
                <li>
                  <NavLink to="#">Banner</NavLink>
                </li>
                <li>
                  <NavLink to="#">Banner L</NavLink>
                </li>
                <li>
                  <NavLink to="#">Banner Roll Up</NavLink>
                </li>
                <li>
                  <NavLink to="#">Cartaz</NavLink>
                </li>
                <li>
                  <NavLink to="#">Posters</NavLink>
                </li>
                <li>
                  <NavLink to="#">Banner X</NavLink>
                </li>
                <li>
                  <NavLink to="#">Faixa</NavLink>
                </li>
                <li>
                  <NavLink to="#">Pôster Adesivo</NavLink>
                </li>
                <li>
                  <NavLink to="#">Canvas</NavLink>
                </li>
                <li>
                  <NavLink to="#">Lona Blackligth</NavLink>
                </li>
                <li>
                  <NavLink to="#">Mobiliário Urbano</NavLink>
                </li>
                <li>
                  <NavLink to="#">Adesivo de Parede</NavLink>
                </li>
              </ul>
              <ul className="qrk-list-links">
                <li>
                  <NavLink to="#">Adesivo de Piso</NavLink>
                </li>
                <li>
                  <NavLink to="#">Cardápio de Plástico</NavLink>
                </li>
                <li>
                  <NavLink to="#">Cardápio de Balcão</NavLink>
                </li>
                <li>
                  <NavLink to="#">Display de Balcão</NavLink>
                </li>
                <li>
                  <NavLink to="#">Display de Mesa</NavLink>
                </li>
                <li>
                  <NavLink to="#">Jogo americano</NavLink>
                </li>
                <li>
                  <NavLink to="#">Móbile</NavLink>
                </li>
                <li>
                  <NavLink to="#">Papel Bandeja</NavLink>
                  </li>
                <li>
                  <NavLink to="#">Placa</NavLink>
                </li>
                <li>
                  <NavLink to="#">Testeira</NavLink>
                </li>
                <li>
                  <NavLink to="#">Brochura</NavLink>
                </li>
                <li>
                  <NavLink to="#">Catálogo</NavLink>
                </li>
                <li>
                  <NavLink to="#">Livreto</NavLink>
                </li>
                <li>
                  <NavLink to="#">Revista</NavLink>
                </li>
                <li>
                  <NavLink to="#">Adesivo</NavLink>
                </li>
                <li>
                  <NavLink to="#">Etiquetas</NavLink>
                </li>
                <li>
                  <NavLink to="#">Calendário de Parede</NavLink>
                </li>
                <li>
                  <NavLink to="#">Rótulo</NavLink>
                </li>
                <li>
                  <NavLink to="#">Cardeneta</NavLink>
                </li>
                <li>
                  <NavLink to="#">Caderno</NavLink>
                </li>
              </ul>
              <ul className="qrk-list-links">
                <li>
                  <NavLink to="#">Caneta Metĺica</NavLink>
                </li>
                <li>
                  <NavLink to="#">Caneta Plástica</NavLink>
                </li>
                <li>
                  <NavLink to="#">Chaveiro</NavLink>
                </li>
                <li>
                  <NavLink to="#">Ímã</NavLink>
                </li>
                <li>
                  <NavLink to="#">Lápis</NavLink>
                </li>
                <li>
                  <NavLink to="#">Pen drive</NavLink>
                </li>
                <li>
                  <NavLink to="#">Porta Cartões</NavLink>
                </li>
                <li>
                  <NavLink to="#">Squeeze</NavLink>
                </li>
                <li>
                  <NavLink to="#">Display de Balcão</NavLink>
                </li>
                <li>
                  <NavLink to="#">Display de RetrovisorIdentificador de Porta</NavLink>
                </li>
                <li>
                  <NavLink to="#">Agenda</NavLink>
                </li>
                <li>
                  <NavLink to="#">Calendário de Parede</NavLink>
                </li>
                <li>
                  <NavLink to="#">Pragão</NavLink>
                </li>
              </ul>
            </div>
          </div>

          <div className="list-columns">
            <div className="3columns">
              CATEGORIAS
              <div className="atm-list">
                <ul className="qrk-list-links">
                  <li>Eleições</li>
                  <li>Fotógrafos</li>
                  <li>Advogados</li>
                  <li>Informática</li>
                  <li>Engenharia</li>
                  <li>Contadores</li>
                </ul>
                <ul className="qrk-list-links">
                  <li>Dentistas</li>
                  <li>Bares e Restaurantes</li>
                  <li>Baladas</li>
                  <li>Papelaria</li>
                  <li>Materiais Promocionais</li>
                  <li>Materiais de Sinalização</li>
                  <li>Ponto de Venda</li>
                </ul>
                <ul className="qrk-list-links">
                  <li>Banners</li>
                  <li>Adesivos</li>
                  <li>Materiais para Eventos</li>
                  <li>Materiais para Escritório</li>
                  <li>Mais vendidos</li>
                  <li>Brindes</li>
                </ul>
              </div>
            </div>

            <div className="2columns">
              INSTITUCIONAL
              <div className="atm-list">
                <ul className="qrk-list-links">
                  <li>Banners</li>
                  <li>Adesivos</li>
                  <li>Materiais para Eventos</li>
                  <li>Materiais para Escritório</li>
                  <li>Mais vendidos</li>
                  <li>Brindes</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <div>
              MONTAGEM DO ARQUIVO
              <div className="atm-list">
                <ul className="qrk-list-links">
                  <li>Montagem do Arquivo</li>
                  <li>Como criar o seu arquivo para impressão no illustrator</li>
                  <li>Como criar o seu arquivo para impressão no Photoshop</li>
                  <li>Como criar o seu arquivo para impressão no InDesign</li>
                  <li>Como criar o seu arquivo para impressão no Corel Draw</li>
                  <li>Formato final e número de páginas no illustrator</li>
                  <li>Formato final e número de páginas no Photoshop</li>
                  <li>Formato final e número de páginas no InDesign</li>
                </ul>
                <ul className="qrk-list-links">
                  <li>Formato final e número de páginas no Corel Draw</li>
                  <li>Sangria e margem de segurança no Illustrator</li>
                  <li>Sangria e margem de segurança no Photoshop</li>
                  <li>Sangria e margem de segurança no InDesign</li>
                  <li>Usando imagens em seus documentos no Corel Draw</li>
                  <li>Convertendo seu arquivo para CMYK no Illustrator</li>
                  <li>Convertendo seu arquivo para CMYK no Photoshop</li>
                </ul>
                <ul className="qrk-list-links">
                  <li>Convertendo seu arquivo para CMYK no InDesign</li>
                  <li>Convertendo seu arquivo para CMYK no Corel Draw</li>
                  <li>Como usar fontes nos seus textos no Illustrator</li>
                  <li>Como usar fontes nos seus textos no Photoshop</li>
                  <li>Como usar fontes nos seus textos no InDesign</li>
                  <li>Como gerar um arquivo PDF/X-1A no Illustrator</li>
                  <li>Como gerar um arquivo PDF/X-1A no Illustrator</li>
                  <li>Como gerar um arquivo PDF/X-1A no InDesign</li>
                </ul>
                <ul className="qrk-list-links">
                  <li>Como gerar um arquivo PDF/X-1A no Corel Draw</li>
                  <li>Como configurar o cinza corretamente</li>
                  <li>Usando a cor preto de forma correta</li>
                  <li>Linhas finas e textos pequenos</li>
                  <li>O que é um boneco? Como fazer um boneco?</li>
                  <li>Dobras e vincos</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <div>
              GUIA DE IMPRESSÃO
            </div>
            <div>
              GRÁFICAS CIDADE
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
