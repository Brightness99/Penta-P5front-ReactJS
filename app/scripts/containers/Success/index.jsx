// @flow
import React from 'react';
import { connect } from 'react-redux';
import { CheckCircleIcon, MyAccountIcon, RefreshIcon } from 'components/Icons';
import WarningMessage from './WarningMessage';
import MethodItem from './MethodItem';
import ProductItem from './ProductItem';
import StayTunedItem from './StayTunedItem';

type Props = {
  app: AppStore,
  router: RouterStore,
  locale: {},
  dispatch: () => {},
};

export class Success extends React.Component {

  static props: Props;

  renderSubTotalMobile() {

    return (
      <div className="sub-total">
        <div className="mb-total-label">TOTAL</div>
        <div className="mb-total-value">R$ 150,00</div>
      </div>
    );
  }

  renderSubTotalDesktop() {

    return (
      <div className="sub-total">

        <div className="sub-total-row">
          <div className="key">Sub-total</div>
          <div className="value">R$150,00</div>
        </div>

        <div className="sub-total-row">
          <div className="key">Cupom</div>
          <div className="value">--</div>
        </div>

        <div className="sub-total-row">
          <div className="key">Total</div>
          <div className="value total-value">R$135,00</div>
        </div>

      </div>
    );
  }

  render() {

    const { app: { screenSize } } = this.props;
    const subTotal = ['xs', 'is', 'sm', 'ix'].includes(screenSize)
      ? this.renderSubTotalMobile()
      : this.renderSubTotalDesktop();

    return (
      <section>
        <div className="container">
          <div className="template-success">

            <div className="success-message atm-success-text">
              <CheckCircleIcon />
              <span>Pedido nº485343 efetuado com sucesso!</span>
            </div>

            <div>Falta pouco! Agora é só pagar o boleto para finalizar o seu pedido.</div>

            <div>
              <WarningMessage />
            </div>

            <div className="method-container">
              <MethodItem buttonText="Ver boleto" linkText="Copiar código do boleto" />
              <MethodItem buttonText="Enviar comprovante" linkText="Envie para agilizar o pedido" />
              <MethodItem buttonText="Enviar arte final" linkText="Envie até as 14:00 do dia 20/11/2016" />
            </div>

            <div className="main-container">

              <div className="product-container">

                <h3>RESUMO DO SEU PEDIDO</h3>

                <div className="product-item-row product-item-header">
                  <div className="product-item-col product-item-col-product">
                    <h4>PRODUTO</h4>
                  </div>

                  <div className="product-item-col product-item-col-delivery">
                    <h4>ENTREGA</h4>
                  </div>

                  <div className="product-item-col product-item-col-amount">
                    <h4>QUANTIDADE</h4>
                  </div>

                  <div className="product-item-col product-item-col-value">
                    <h4>VALOR</h4>
                  </div>
                </div>

                <div className="product-item-body">
                  <ProductItem />
                  <ProductItem />
                </div>

                <div className="product-sub-total">
                  { subTotal }
                </div>

              </div>

              <div className="stay-tuned-container">
                <h3>FIQUE ATENTO</h3>

                <div>
                  <StayTunedItem text='O prazo de entrega é válido somente após a confirmação do pagamento do boleto' />
                  <StayTunedItem text='É possível alterar a arte envia até o momento que antecede a ida do seu material para a produção' />
                  <StayTunedItem text='É possível alterar o endereço de entrega até o momento que antecede a postagem do seu pedido*' />
                  <StayTunedItem text='Acompanhe o status do seu pedido através dos emails' />
                  <StayTunedItem text='A nota fiscal será enviada por email após a postagem do seu pedido' />
                  <StayTunedItem text='Você pode acompanhar seus pedidos através do menu “Minha conta”. Acesse:' />
                </div>

                <div className="my-account">
                  <a>
                    <MyAccountIcon />
                    <div>MINHA CONTA</div>
                  </a>
                </div>

                <h3>endereço de entrega</h3>

                <div className="address">Av. Brigadeiro Faria Lima, 1451 - Apt 102 Guarulhos, SP - 07133-000</div>

                <div className="delivery-address">
                  <RefreshIcon />
                  <div>Alterar endereço de entrega</div>
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


export default connect(mapStateToProps, mapDispatchToProps)(Success);

