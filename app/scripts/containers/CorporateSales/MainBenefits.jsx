// @flow

import React from 'react';
import Slider from 'react-slick';
import { InvoiceIcon, SpecialProjectsIcon, AccountManagerIcon } from 'components/Icons';

const benefits = [
  {
    key: 'benefit-1',
    title: 'Gerente de contas',
    text: `Ficou com dúvida na hora de fazer seu pedido? Fale com um de nossos
            executivos especializados e tenha um atendimento personalizado.`,
    icon: AccountManagerIcon,
  },
  {
    key: 'benefit-2',
    title: 'Projetos especiais',
    text: `Não encontrou algum produto no site? No atendimento exclusivo, você
            também pode fazer projetos especiais de acordo com a sua demanda.`,
    icon: SpecialProjectsIcon,
  },
  {
    key: 'benefit-3',
    title: 'Pagamento faturado',
    text: `Opção de pagamento perfeita para empresas. Fature seu pagamento e tenha
            facilidade e comodidade na realização dos pedidos.`,
    icon: InvoiceIcon,
  },
];

type Props = {
  screenSize: string,
};

export class MainBenefits extends React.PureComponent<Props> {
  static props: Props;

  renderDesktop = () => (
    <section className="boxes-our-benefits">
      {
        benefits.map(benefit => {
          const Icon = benefit.icon;
          return (
            <section key={benefit.key} className="box-our-benefits">
              <Icon />
              <p className="title-our-benefits">
                {benefit.title}
              </p>
              <p className="text-our-benefits">
                {benefit.text}
              </p>
            </section>
          );
        })
      }
    </section>
  );

  renderMobile = () => (
    <section className="boxes-our-benefits mobile">
      <Slider
        className="org-component-banners"
        arrows={false}
        dots={true}
        autoplay={true}
      >
        {
          benefits.map(benefit => {
            const Icon = benefit.icon;
            return (
              <section key={benefit.key} className="box-our-benefits">
                <Icon />
                <p className="title-our-benefits">
                  {benefit.title}
                </p>
                <p className="text-our-benefits">
                  {benefit.text}
                </p>
              </section>
            );
          })
        }
      </Slider>
    </section>
  );


  render() {
    const { screenSize } = this.props;
    return (
      <section className="container-main-benefits">
        <section className="container">
          <h4 className="title-corporate-sales">{'Principais Benefícios'}</h4>
          {['xs', 'is', 'sm', 'ix', 'md', 'im'].includes(screenSize) ? this.renderMobile() : this.renderDesktop()}
        </section>
      </section>
    );
  }
}

export default MainBenefits;
