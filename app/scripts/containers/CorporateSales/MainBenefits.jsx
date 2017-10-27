// @flow

import React from 'react';
import Slider from 'react-slick';
import { InvoiceIcon, SpecialProjectsIcon, AccountManagerIcon } from 'components/Icons';

export class MainBenefits extends React.Component {
  render() {
    return (
      <section className="container-main-benefits">
        <section className="container">
          <h4 className="title-corporate-sales">Principais Benefícios</h4>
          <section className="boxes-our-benefits">
            <Slider
              className="org-component-banners"
              arrows={false}
              dots={true}
              autoplay={true}
            >
              <section className="box-our-benefits">
                <AccountManagerIcon />
                <p className="title-our-benefits">Gerente de contas</p>
                <p className="text-our-benefits">Ficou com dúvida na hora de fazer seu pedido? Fale com um de nossos
                  executivos especializados e tenha um atendimento personalizado.</p>
              </section>
              <section className="box-our-benefits">
                <SpecialProjectsIcon />
                <p className="title-our-benefits">Projetos especiais</p>
                <p className="text-our-benefits">Não encontrou algum produto no site? No atendimento exclusivo, você
                  também pode fazer projetos especiais de acordo com a sua demanda. </p>
              </section>
              <section className="box-our-benefits">
                <InvoiceIcon />
                <p className="title-our-benefits">Pagamento faturado</p>
                <p className="text-our-benefits">Opção de pagamento perfeita para empresas. Fature seu pagamento e tenha
                  facilidade e comodidade na realização dos pedidos.</p>
              </section>
            </Slider>
          </section>
        </section>
      </section>
    );
  }
}

export default MainBenefits;
