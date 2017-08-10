// @flow
import React from 'react';
import Breadcrumbs from 'components/Breadcrumbs';
import { Link } from 'react-router-dom';

<<<<<<< 7123d2ca04dbdcea71dd8dc16143d973119ef5c0
import { CodeBar, Receipt } from 'components/Icons';

type Props = {
  screenSize: string,
};

type State = {
  secondStep: boolean,
};

export class OrderList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      secondStep: false,
    };
  }

=======
type Props = {
  screenSize: string,
}

export class OrderList extends React.Component {
>>>>>>> MyAccountOrder
  static defaultProps = {
    screenSize: 'xs',
  };

<<<<<<< 7123d2ca04dbdcea71dd8dc16143d973119ef5c0
  static props: Props;
  state: State;

  showDetails = () => {
    const { secondStep } = this.state;
    this.setState({
      secondStep: !secondStep,
    });
  }
=======
  props: Props;
>>>>>>> MyAccountOrder

  /*render() {
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
      },
    ];
    return (
      <div className="container-myorder">
        <Breadcrumbs links={breadcrumb} />
        <h2>Minha conta</h2>
        <h3 className="subtitle-myorder">Meus pedidos</h3>
        <p className="legend-myorder">Acompanhe os status do seus pedidos</p>
        <ul className="box-tableOrder">
          <li>N do pedido</li>
          <li>Realizado em</li>
          <li>Status</li>
          <li>Ações</li>
        </ul>

        <div className="box-detailsOrder delivered">
          <div className="box-firstPart">
            <div>
              <p>483093</p>
            </div>
            <div>
              <p>30/08/2016</p>
            </div>
            <div className="flagOrder">
              <p>Pedido entregue</p>
            </div>
            <div className="box-icons">
              <div className="icons">
                <img src={require('assets/media/images/card-download.jpg')} alt="Download" />
                <img src={require('assets/media/images/card-myaccount.jpg')} alt="Card" />
              </div>
              <Link to="#" className="icons align-text">ver detalhes</Link>
            </div>
          </div>
          <div className="box-secondPart">
            <div className="box-images">
              <img src={require('assets/media/images/imgteste-produto.jpg')} alt="Produto" />
              <img src={require('assets/media/images/imgteste-produto2.jpg')} alt="Produto" />
              <img src={require('assets/media/images/imgteste-produto3.jpg')} alt="Produto" />
            </div>
            <div>
              <p className="title-secondPart">Itens do pedido</p>
              <p className="txt-secondPart">3 produtos</p>
            </div>
            <div>
              <p className="title-secondPart">Valor total</p>
              <p className="txt-secondPart">R$ 2.050,30</p>
            </div>
          </div>
        </div>

        <div className="box-detailsOrder pendingPayment">
          <div className="box-firstPart">
            <div>
              <p>483093</p>
            </div>
            <div>
              <p>30/08/2016</p>
            </div>
            <div className="flagOrder">
              <p>Aguardando pagamento</p>
            </div>
            <div className="box-icons">
              <div className="icons">
                <img src={require('assets/media/images/card-download.jpg')} alt="Download" />
                <img src={require('assets/media/images/card-myaccount.jpg')} alt="Card" />
              </div>
              <Link to="#" className="icons align-text">ver detalhes</Link>
            </div>
          </div>
          <div className="box-secondPart">
            <div className="box-images">
              <img src={require('assets/media/images/imgteste-produto.jpg')} alt="Produto" />
              <img src={require('assets/media/images/imgteste-produto2.jpg')} alt="Produto" />
              <img src={require('assets/media/images/imgteste-produto3.jpg')} alt="Produto" />
            </div>
            <div>
              <p className="title-secondPart">Itens do pedido</p>
              <p className="txt-secondPart">3 produtos</p>
            </div>
            <div>
              <p className="title-secondPart">Valor total</p>
              <p className="txt-secondPart">R$ 2.050,30</p>
            </div>
          </div>
        </div>

        <div className="box-detailsOrder inTransport">
          <div className="box-firstPart">
            <div>
              <p>483093</p>
            </div>
            <div>
              <p>30/08/2016</p>
            </div>
            <div className="flagOrder">
              <p>Em transporte</p>
            </div>
            <div className="box-icons">
              <div className="icons">
                <img src={require('assets/media/images/card-download.jpg')} alt="Download" />
                <img src={require('assets/media/images/card-myaccount.jpg')} alt="Card" />
              </div>
              <Link to="#" className="icons align-text">ver detalhes</Link>
            </div>
          </div>
          <div className="box-secondPart">
            <div className="box-images">
              <img src={require('assets/media/images/imgteste-produto.jpg')} alt="Produto" />
              <img src={require('assets/media/images/imgteste-produto2.jpg')} alt="Produto" />
              <img src={require('assets/media/images/imgteste-produto3.jpg')} alt="Produto" />
            </div>
            <div>
              <p className="title-secondPart">Itens do pedido</p>
              <p className="txt-secondPart">3 produtos</p>
            </div>
            <div>
              <p className="title-secondPart">Valor total</p>
              <p className="txt-secondPart">R$ 2.050,30</p>
            </div>
          </div>
        </div>

      </div>
    );
  }*/

  renderMobile() {
    return (
      <div className="container-myorder">
        <h2>Minha conta</h2>
        <h3 className="subtitle-myorder">Meus pedidos</h3>
        <p className="legend-myorder">Acompanhe os status do seus pedidos</p>
        <div className="box-detailsOrder pendingPayment">
          <div className="box-firstPart">
            <div>
<<<<<<< 7123d2ca04dbdcea71dd8dc16143d973119ef5c0
              <p className="title-myorderMobile">Pedido</p>
              <p className="subtitle-myorderMobile">Nº 210.016</p>
            </div>
          </div>
          <span className="detach" />
          <div className="box-secondPart">
            <div>
              <p className="title-secondPart">Itens do pedido</p>
              <p className="txt-secondPart">4 produtos</p>
            </div>
            <div className="box-statusMobile">
              <p className="title-statusMobile">status</p>
              <p className="subtitle-statusMobile">Aguardando pagamento</p>
            </div>
            <div>
              <Link className="btn-default btn-quarter fnt-bold btn-lg" to="#"><i><CodeBar /></i>imprimir boleto</Link>
              <Link className="btn-default btn-quarter fnt-bold btn-lg" to="#"><i><Receipt /></i>enviar comprovante</Link>
              <Link className="btn-default btn-secondary fnt-bold btn-lg" to="#">ver detalhes</Link>
            </div>
          </div>
        </div>

        <div className="box-detailsOrder inTransport">
          <div className="box-firstPart">
            <div>
              <p className="title-myorderMobile">Pedido</p>
              <p className="subtitle-myorderMobile">Nº 210.016</p>
            </div>
          </div>
          <span className="detach" />
          <div className="box-secondPart">
            <div>
              <p className="title-secondPart">Itens do pedido</p>
              <p className="txt-secondPart">4 produtos</p>
            </div>
            <div className="box-statusMobile">
              <p className="title-statusMobile">status</p>
              <p className="subtitle-statusMobile">Em transporte</p>
            </div>
            <div>
              <Link className="btn-default btn-quarter fnt-bold btn-lg" to="#"><i><CodeBar /></i>imprimir boleto</Link>
              <Link className="btn-default btn-quarter fnt-bold btn-lg" to="#"><i><Receipt /></i>enviar comprovante</Link>
              <Link className="btn-default btn-secondary fnt-bold btn-lg" to="#">ver detalhes</Link>
            </div>
          </div>
        </div>

        <div className="box-detailsOrder delivered">
          <div className="box-firstPart">
            <div>
              <p className="title-myorderMobile">Pedido</p>
              <p className="subtitle-myorderMobile">Nº 210.016</p>
            </div>
          </div>
          <span className="detach" />
          <div className="box-secondPart">
            <div>
              <p className="title-secondPart">Itens do pedido</p>
              <p className="txt-secondPart">4 produtos</p>
            </div>
            <div className="box-statusMobile">
              <p className="title-statusMobile">status</p>
              <p className="subtitle-statusMobile">Entregue</p>
            </div>
            <div>
              <Link className="btn-default btn-quarter fnt-bold btn-lg" to="#"><i><CodeBar /></i>imprimir boleto</Link>
              <Link className="btn-default btn-quarter fnt-bold btn-lg" to="#"><i><Receipt /></i>enviar comprovante</Link>
              <Link className="btn-default btn-secondary fnt-bold btn-lg" to="#">ver detalhes</Link>
            </div>
          </div>
        </div>

=======
              <p>Pedido</p>
              <p>N 483093</p>
            </div>
            <div>
              <p>30/08/2016</p>
            </div>
          </div>
          <span className="blabla" />
          <div className="box-secondPart">
            <div>
              <p className="title-secondPart">Itens do pedido</p>
              <p className="txt-secondPart">3 produtos</p>
            </div>
            <div>
              <p>status</p>
              <p>aguardando pagamento</p>
            </div>
            <div>
              <p>imprimir boleto</p>
              <p>enviar comprovante</p>
              <p>ver detalhes</p>
            </div>
          </div>
        </div>
>>>>>>> MyAccountOrder
      </div>
    );
  }

  renderDesktop() {
<<<<<<< 7123d2ca04dbdcea71dd8dc16143d973119ef5c0
    const { secondStep } = this.state;
=======
>>>>>>> MyAccountOrder
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
      },
    ];
    return (
      <div className="container-myorder">
        <Breadcrumbs links={breadcrumb} />
        <h2>Minha conta</h2>
        <h3 className="subtitle-myorder">Meus pedidos</h3>
        <p className="legend-myorder">Acompanhe os status do seus pedidos</p>
        <ul className="box-tableOrder">
<<<<<<< 7123d2ca04dbdcea71dd8dc16143d973119ef5c0
          <li>Nº do pedido</li>
=======
          <li>N do pedido</li>
>>>>>>> MyAccountOrder
          <li>Realizado em</li>
          <li>Status</li>
          <li>Ações</li>
        </ul>
        <div className="box-detailsOrder delivered">
          <div className="box-firstPart">
            <div>
              <p>483093</p>
            </div>
            <div>
              <p>30/08/2016</p>
            </div>
            <div className="flagOrder">
              <p>Pedido entregue</p>
            </div>
            <div className="box-icons">
              <div className="icons">
                <img src={require('assets/media/images/card-download.jpg')} alt="Download" />
                <img src={require('assets/media/images/card-myaccount.jpg')} alt="Card" />
              </div>
<<<<<<< 7123d2ca04dbdcea71dd8dc16143d973119ef5c0
              <Link to="#" className="icons align-text" onClick={this.showDetails}>ver detalhes</Link>
            </div>
          </div>
          {secondStep && (<div className="box-secondPart">
=======
              <Link to="#" className="icons align-text">ver detalhes</Link>
            </div>
          </div>
          <div className="box-secondPart">
>>>>>>> MyAccountOrder
            <div className="box-images">
              <img src={require('assets/media/images/imgteste-produto.jpg')} alt="Produto" />
              <img src={require('assets/media/images/imgteste-produto2.jpg')} alt="Produto" />
              <img src={require('assets/media/images/imgteste-produto3.jpg')} alt="Produto" />
            </div>
            <div>
              <p className="title-secondPart">Itens do pedido</p>
              <p className="txt-secondPart">3 produtos</p>
            </div>
            <div>
              <p className="title-secondPart">Valor total</p>
              <p className="txt-secondPart">R$ 2.050,30</p>
            </div>
<<<<<<< 7123d2ca04dbdcea71dd8dc16143d973119ef5c0
          </div>)}
=======
          </div>
>>>>>>> MyAccountOrder
        </div>
        <div className="box-detailsOrder pendingPayment">
          <div className="box-firstPart">
            <div>
              <p>483093</p>
            </div>
            <div>
              <p>30/08/2016</p>
            </div>
            <div className="flagOrder">
              <p>Aguardando pagamento</p>
            </div>
            <div className="box-icons">
              <div className="icons">
                <img src={require('assets/media/images/card-download.jpg')} alt="Download" />
                <img src={require('assets/media/images/card-myaccount.jpg')} alt="Card" />
              </div>
<<<<<<< 7123d2ca04dbdcea71dd8dc16143d973119ef5c0
              <Link to="#" className="icons align-text" onClick={this.showDetails}>ver detalhes</Link>
            </div>
          </div>
          {secondStep && (<div className="box-secondPart">
=======
              <Link to="#" className="icons align-text">ver detalhes</Link>
            </div>
          </div>
          <div className="box-secondPart">
>>>>>>> MyAccountOrder
            <div className="box-images">
              <img src={require('assets/media/images/imgteste-produto.jpg')} alt="Produto" />
              <img src={require('assets/media/images/imgteste-produto2.jpg')} alt="Produto" />
              <img src={require('assets/media/images/imgteste-produto3.jpg')} alt="Produto" />
            </div>
            <div>
              <p className="title-secondPart">Itens do pedido</p>
              <p className="txt-secondPart">3 produtos</p>
            </div>
            <div>
              <p className="title-secondPart">Valor total</p>
              <p className="txt-secondPart">R$ 2.050,30</p>
            </div>
<<<<<<< 7123d2ca04dbdcea71dd8dc16143d973119ef5c0
          </div>)}
=======
          </div>
>>>>>>> MyAccountOrder
        </div>
        <div className="box-detailsOrder inTransport">
          <div className="box-firstPart">
            <div>
              <p>483093</p>
            </div>
            <div>
              <p>30/08/2016</p>
            </div>
            <div className="flagOrder">
              <p>Em transporte</p>
            </div>
            <div className="box-icons">
              <div className="icons">
                <img src={require('assets/media/images/card-download.jpg')} alt="Download" />
                <img src={require('assets/media/images/card-myaccount.jpg')} alt="Card" />
              </div>
              <Link to="#" className="icons align-text">ver detalhes</Link>
            </div>
          </div>
          <div className="box-secondPart">
            <div className="box-images">
              <img src={require('assets/media/images/imgteste-produto.jpg')} alt="Produto" />
              <img src={require('assets/media/images/imgteste-produto2.jpg')} alt="Produto" />
              <img src={require('assets/media/images/imgteste-produto3.jpg')} alt="Produto" />
            </div>
            <div>
              <p className="title-secondPart">Itens do pedido</p>
              <p className="txt-secondPart">3 produtos</p>
            </div>
            <div>
              <p className="title-secondPart">Valor total</p>
              <p className="txt-secondPart">R$ 2.050,30</p>
            </div>
          </div>
        </div>
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

export default OrderList;
