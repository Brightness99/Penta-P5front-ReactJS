// @flow
import React from 'react';
import Breadcrumbs from 'components/Breadcrumbs';
import { Link } from 'react-router-dom';
import { CodeBar, Receipt, ExclamationMark, DocumentDownload, Clipboard, Cards, Warning } from 'components/Icons';

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
        <p>Mobile</p>
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
            <Link to="#" className="btn-default btn-quarter fnt-bold btn-lg"><CodeBar />Imprimir boleto</Link>
            <Link to="#" className="btn-default btn-quarter fnt-bold btn-lg"><Receipt />Enviar comprovante</Link>
          </div>
        </div>

        <div className="box-warningDetails">
          <div>
            <Warning />
          </div>
          <div>
            <p><span>Atenção!</span> Você ainda não enviou o arquivo de alguns produtos. A previsão de entrega esta sujeita a alteração caso o arquivo não seja enviado até dia 16/04/2015.</p>
          </div>
          <div>
            <p>x</p>
          </div>
        </div>

        <div className="box-paymentDetails-dataDelivery">
          <div className="box-paymentDetails">
            <div className="box-headerDetails">
              <h4 className="title-details">Dados de pagamento</h4>
              <Link to="#" className="link-alterDetails">Alterar </Link>
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
              <Link to="#" className="link-alterDetails">Alterar </Link>
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

        <div>
          <h4>Cartão de visita [item nº 593328]</h4>
          <Link to="#">
            + Mais detalhes
          </Link>

          <div>
            <div>
              Arquivo recebido
              Produto em produção
              Produto em transporte
              Produto entregue
            </div>
            <div>
              Arquivo
              Datas
              Ações
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
