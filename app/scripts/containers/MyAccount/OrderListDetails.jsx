// @flow
import React from 'react';
import Breadcrumbs from 'components/Breadcrumbs';
import { Link } from 'react-router-dom';
import { CodeBar, CheckIcon, Receipt, ExclamationMark, CloseIcon, Warning, Change, Archive, CalendarIcon, ArrowCarousel } from 'components/Icons';

type Props = {
  screenSize: string,
};

export class OrderListDetails extends React.Component {
  static defaultProps = {
    screenSize: 'xs',
  };

  static props: Props;

  renderMobile() {
    return (
      <section className="container-myaccountdetails">
        <h2>Minha conta</h2>
        <div className="box-headerDetails headerDetails--mobile">
          <div>
            <h3 className="subtitle-details">Pedido nº483.093</h3>
            <p className="total-value">Valor total: <span>R$ 350,00</span></p>
          </div>
          <div>
            <Link to="#"><i><ArrowCarousel /></i>Voltar</Link>
          </div>
        </div>
        <div className="box-warningDetails">
          <div>
            <i><Warning /></i>
          </div>
          <div>
            <p><span>Atenção!</span> Você ainda não enviou o arquivo de alguns produtos. A previsão de entrega esta sujeita a alteração caso o arquivo não seja enviado até dia 16/04/2015.</p>
          </div>
          <div>
            <i><CloseIcon /></i>
          </div>
        </div>
        <div className="btns-details">
          <Link to="#" className="btn-default btn-quarter fnt-bold btn-lg"><i><CodeBar /></i>Imprimir boleto</Link>
          <Link to="#" className="btn-default btn-quarter fnt-bold btn-lg"><i><Receipt /></i>Enviar comprovante</Link>
        </div>
        <div className="box-paymentDetails-dataDelivery">
          <div className="box-paymentDetails">
            <div className="box-headerDetails">
              <h4 className="title-details">Dados de pagamento</h4>
            </div>
            <div className="paymentDetails-dataDelivery">
              <div className="details">
                <p className="firstDetail">Nome</p>
                <p className="secondDetail">Diogo Capelo</p>
              </div>
              <div className="details">
                <p className="firstDetail">Endereço</p>
                <p className="secondDetail">Av. Brigadeiro Faria Lima, 1451 - Apt 102 Torre Pequim - Cocala</p>
              </div>
              <div className="details">
                <p className="firstDetail">Cidade/UF</p>
                <p className="secondDetail">Guarulhos/SP</p>
              </div>
              <div className="details">
                <p className="firstDetail">CEP</p>
                <p className="secondDetail">07130-000</p>
              </div>
              <p className="paymentMethod-details">forma de pagamento: <span className="typeMethod">boleto</span></p>
              <Link to="#" className="link-alterDetails--mobile"><Change />Alterar forma de pagamento</Link>
            </div>
          </div>
          <div className="box-dataDelivery">
            <div className="box-headerDetails">
              <h4 className="title-details">Entrega</h4>
            </div>
            <div className="paymentDetails-dataDelivery">
              <div className="details">
                <p className="firstDetail">Nome</p>
                <p className="secondDetail">Diogo Capelo</p>
              </div>
              <div className="details">
                <p className="firstDetail">Endereço</p>
                <p className="secondDetail">Av. Brigadeiro Faria Lima, 1451 - Apto 102 Torre Pequim - Cocala</p>
              </div>
              <div className="details">
                <p className="firstDetail">Cidade/UF</p>
                <p className="secondDetail">Guarulhos/SP</p>
              </div>
              <div className="details">
                <p className="firstDetail">CEP</p>
                <p className="secondDetail">07130-000</p>
              </div>
              <Link to="#" className="link-alterDetails--mobile"><Change />Alterar dados de entrega</Link>
            </div>
          </div>
        </div>
        <div className="box-detailsAboutProduct allright">
          <div className="header-detailsAboutProduct header-detailsAboutProduct--mobile">
            <h4 className="title-detailsAboutProduct">Cartão de visita</h4>
            <div className="alignTitles--mobile">
              <p className="title-numberOrder">[item nº 593328]</p>
              <Link to="#">
                + Toque para mais detalhes
              </Link>
            </div>
          </div>
          <div className="box-aboutProduct">
            <div className="box-statusAboutProduct-mobile">
              <ul className="status-aboutProduct scroll-statusMobile">
                <li className="allright">
                  <span />
                  <p className="legend-statusProduct">Arquivo recebido</p>
                </li>
                <li>
                  <span />
                  <p className="legend-statusProduct">Produto em produção</p>
                </li>
                <li>
                  <span />
                  <p className="legend-statusProduct">Produto em transporte</p>
                </li>
                <li>
                  <span />
                  <p className="legend-statusProduct">Produto entregue</p>
                </li>
              </ul>
            </div>
            <div className="box-detailsTransport">
              <div className="details-product">
                <div className="detail imageProduct">
                  <div className="title-imageProduct--mobile">
                    <p className="title--mobile">Arquivo</p>
                  </div>
                  <div>
                    <div className="box-imageProduct--mobile">
                      <div>
                        <img src={require('assets/media/images/captura-de-tela.png')} alt="imagem" />
                      </div>
                      <div>
                        <h5 className="title-status"><i><CheckIcon /></i>Enviado</h5>
                        <p>A imagem ao lado é meramente ilustrativa.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="detail">
                  <div className="title-imageProduct--mobile">
                    <p className="title--mobile">Datas</p>
                  </div>
                  <div>
                    <div className="box-calendarProduct--mobile">
                      <div className="icon-calendarProduct">
                        <CalendarIcon />
                      </div>
                      <div className="text-calendarProduct">
                        <p>Previsão de entrega</p>
                        <p className="title-data">20/04/2015</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="detail">
                  <div className="title-imageProduct--mobile">
                    <p className="title--mobile">Ações</p>
                  </div>
                  <div>
                    <Link className="btn-default btn-quarter fnt-sbold btn-lg w-mxw" to="#"><i><Archive /></i>Acompanhar o pedido</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="box-detailsAboutProduct attention">
          <div className="header-detailsAboutProduct header-detailsAboutProduct--mobile">
            <h4 className="title-detailsAboutProduct">Cartão de visita</h4>
            <div className="alignTitles--mobile">
              <p className="title-numberOrder">[item nº 593328]</p>
              <Link to="#">
                + Toque para mais detalhes
              </Link>
            </div>
          </div>
          <div className="box-aboutProduct">
            <div className="box-statusAboutProduct-mobile">
              <ul className="status-aboutProduct scroll-statusMobile">
                <li>
                  <span />
                  <p className="legend-statusProduct">Arquivo recebido</p>
                </li>
                <li>
                  <span />
                  <p className="legend-statusProduct">Produto em produção</p>
                </li>
                <li>
                  <span />
                  <p className="legend-statusProduct">Produto em transporte</p>
                </li>
                <li>
                  <span />
                  <p className="legend-statusProduct">Produto entregue</p>
                </li>
              </ul>
            </div>
            <div className="box-detailsTransport">
              <div className="details-product">
                <div className="detail imageProduct">
                  <div className="title-imageProduct--mobile">
                    <p className="title--mobile">Arquivo</p>
                  </div>
                  <div>
                    <div className="box-imageProduct--mobile">
                      <div>
                        <img src={require('assets/media/images/captura-de-tela.png')} alt="imagem" />
                      </div>
                      <div>
                        <h5 className="title-status"><i><ExclamationMark /></i>Atenção</h5>
                        <p>A imagem ao lado é meramente ilustrativa.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="detail">
                  <div className="title-imageProduct--mobile">
                    <p className="title--mobile">Datas</p>
                  </div>
                  <div>
                    <div className="box-calendarProduct--mobile">
                      <div className="icon-calendarProduct">
                        <CalendarIcon />
                      </div>
                      <div className="text-calendarProduct">
                        <p>Previsão de entrega</p>
                        <p className="title-data">20/04/2015</p>
                      </div>
                    </div>
                    <div className="box-calendarProduct--mobile text-uploadArt">
                      <div className="icon-calendarProduct">
                        <CalendarIcon />
                      </div>
                      <div className="text-calendarProduct">
                        <p>Prazo de upload da arte</p>
                        <p className="title-data">20/04/2015</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="detail">
                  <div className="title-imageProduct--mobile">
                    <p className="title--mobile">Ações</p>
                  </div>
                  <div>
                    <p>Para enviar sua arte, você precisa acessar sua conta através de um computador desktop.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Link to="#" className="btn-default btn-quarter btn-xs fnt-bold">Carregar todos produtos (2)</Link>
      </section>
    );
  }

  renderDesktop() {
    const breadcrumb = [
      {
        title: 'Home',
        url: '/',
      },
      {
        title: 'Minha conta',
        url: '/minha-conta',
      },
      {
        title: 'Meus pedidos',
        url: '/meus-pedidos',
      },
      {
        title: 'Pedido nº483.093',
      },
    ];
    return (
      <section className="container-myaccountdetails">
        <Breadcrumbs links={breadcrumb} />
        <h2>Minha conta</h2>
        <div className="box-headerDetails">
          <div>
            <h3 className="subtitle-details">Pedido nº483.093</h3>
            <p className="total-value">Valor total: <span>R$ 350,00</span></p>
          </div>
          <div className="btns-details">
            <Link to="#" className="btn-default btn-quarter fnt-bold btn-lg"><i><CodeBar /></i>Imprimir boleto</Link>
            <Link to="#" className="btn-default btn-quarter fnt-bold btn-lg"><i><Receipt /></i>Enviar comprovante</Link>
          </div>
        </div>
        <div className="box-warningDetails">
          <div>
            <i><Warning /></i>
          </div>
          <div>
            <p><span>Atenção!</span> Você ainda não enviou o arquivo de alguns produtos. A previsão de entrega esta sujeita a alteração caso o arquivo não seja enviado até dia 16/04/2015.</p>
          </div>
          <div>
            <i><CloseIcon /></i>
          </div>
        </div>
        <div className="box-paymentDetails-dataDelivery">
          <div className="box-paymentDetails">
            <div className="box-headerDetails">
              <h4 className="title-details">Dados de pagamento</h4>
              <Link to="#" className="link-alterDetails"><Change />Alterar</Link>
            </div>
            <div className="paymentDetails-dataDelivery">
              <div className="details">
                <p className="firstDetail">Nome</p>
                <p className="secondDetail">Diogo Capelo</p>
              </div>
              <div className="details">
                <p className="firstDetail">Endereço</p>
                <p className="secondDetail">Av. Brigadeiro Faria Lima, 1451 - Apt 102 Torre Pequim - Cocala</p>
              </div>
              <div className="details">
                <p className="firstDetail">Cidade/UF</p>
                <p className="secondDetail">Guarulhos/SP</p>
              </div>
              <div className="details">
                <p className="firstDetail">CEP</p>
                <p className="secondDetail">07130-000</p>
              </div>
              <p className="paymentMethod-details">forma de pagamento: <span className="typeMethod">boleto</span></p>
            </div>
          </div>
          <div className="box-dataDelivery">
            <div className="box-headerDetails">
              <h4 className="title-details">Entrega</h4>
              <Link to="#" className="link-alterDetails"><Change />Alterar</Link>
            </div>
            <div className="paymentDetails-dataDelivery">
              <div className="details">
                <p className="firstDetail">Nome</p>
                <p className="secondDetail">Diogo Capelo</p>
              </div>
              <div className="details">
                <p className="firstDetail">Endereço</p>
                <p className="secondDetail">Av. Brigadeiro Faria Lima, 1451 - Apto 102 Torre Pequim - Cocala</p>
              </div>
              <div className="details">
                <p className="firstDetail">Cidade/UF</p>
                <p className="secondDetail">Guarulhos/SP</p>
              </div>
              <div className="details">
                <p className="firstDetail">CEP</p>
                <p className="secondDetail">07130-000</p>
              </div>
            </div>
          </div>
        </div>
        <div className="box-detailsAboutProduct allright">
          <div className="header-detailsAboutProduct">
            <h4 className="title-detailsAboutProduct">Cartão de visita</h4>
            <p className="title-numberOrder">[item nº 593328]</p>
            <Link to="#">
              + Mais detalhes
            </Link>
          </div>
          <div className="box-aboutProduct">
            <ul className="status-aboutProduct">
              <li className="allright"><span>1</span>Arquivo recebido</li>
              <li><span>2</span>Produto em produção</li>
              <li><span>3</span>Produto em transporte</li>
              <li><span>4</span>Produto entregue</li>
            </ul>
            <div className="box-detailsTransport">
              <ul className="titlesDetails-product">
                <li>Arquivo</li>
                <li>Datas</li>
                <li>Ações</li>
              </ul>
              <div className="details-product">
                <div className="detail imageProduct">
                  <div>
                    <img src={require('assets/media/images/captura-de-tela.png')} alt="imagem" />
                  </div>
                  <div>
                    <h5 className="title-status"><i><CheckIcon /></i>Enviado</h5>
                    <p>A imagem ao lado é meramente ilustrativa.</p>
                  </div>
                </div>
                <div className="detail">
                  <p className="title-data">20/04/2015</p>
                  <p>Previsão de entrega</p>
                </div>
                <div className="detail">
                  <Link className="btn-default btn-quarter fnt-sbold btn-lg" to="#"><i><Archive /></i>Alterar arquivo</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="box-detailsAboutProduct attention">
          <div className="header-detailsAboutProduct">
            <h4 className="title-detailsAboutProduct">Cartão de visita</h4>
            <p className="title-numberOrder">[item nº 593328]</p>
            <Link to="#">
              + Mais detalhes
            </Link>
          </div>
          <div className="box-aboutProduct">
            <ul className="status-aboutProduct">
              <li className="attention"><span>1</span>Arquivo recebido</li>
              <li><span>2</span>Produto em produção</li>
              <li><span>3</span>Produto em transporte</li>
              <li><span>4</span>Produto entregue</li>
            </ul>
            <div className="box-detailsTransport">
              <ul className="titlesDetails-product">
                <li>Arquivo</li>
                <li>Datas</li>
                <li>Ações</li>
              </ul>
              <div className="details-product">
                <div className="detail imageProduct">
                  <div>
                    <img src={require('assets/media/images/captura-de-tela.png')} alt="imagem" />
                  </div>
                  <div>
                    <h5 className="title-status"><i><ExclamationMark /></i>Atenção</h5>
                    <p>O arquivo deste produto ainda não foi enviado.</p>
                  </div>
                </div>
                <div className="detail attention">
                  <p className="title-data">20/04/2015</p>
                  <p>Previsão de entrega</p>
                </div>
                <div className="detail">
                  <Link className="btn-default btn-quarter fnt-sbold btn-lg" to="#"><i><Archive /></i>Enviar arquivo</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  render() {
    const { screenSize } = this.props;

    return ['xs', 'is', 'sm', 'ix', 'md', 'im'].includes(screenSize)
      ? this.renderMobile()
      : this.renderDesktop();
  }
}

export default OrderListDetails;
