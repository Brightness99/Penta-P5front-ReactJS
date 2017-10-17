// @flow

import React from 'react';
import { InvoiceIcon, SpecialProjectsIcon, AccountManagerIcon } from 'components/Icons';

export class MainBenefits extends React.Component {
  render() {
    return (
      <section className="container-mainBenefits">
        <div className="container">
          <h4 className="title-corporateSales">Principais Benefícios</h4>
          <div className="boxes-ourBenefits">
            <div className="box-ourBenefits">
              <AccountManagerIcon />
              <p className="title-ourBenefits">Gerente de contas</p>
              <p className="text-ourBenefits">Ficou com dúvida na hora de fazer seu pedido? Fale com um de nossos executivos especializados e tenha um atendimento personalizado.</p>
            </div>
            <div className="box-ourBenefits">
              <SpecialProjectsIcon />
              <p className="title-ourBenefits">Projetos especiais</p>
              <p className="text-ourBenefits">Não encontrou algum produto no site? No atendimento exclusivo, você também pode fazer projetos especiais de acordo com a sua demanda. </p>
            </div>
            <div className="box-ourBenefits">
              <InvoiceIcon />
              <p className="title-ourBenefits">Pagamento faturado</p>
              <p className="text-ourBenefits">Opção de pagamento perfeita para empresas. Fature seu pagamento e tenha facilidade e comodidade na realização dos pedidos.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default MainBenefits;
