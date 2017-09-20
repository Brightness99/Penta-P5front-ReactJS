// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { isMobile } from 'utils/helpers';
import Breadcrumbs from 'components/Breadcrumbs';

type Props = {
  app: AppStore,
  router: RouterStore,
  locale: {},
  dispatch: () => {},
};

export class AboutPrinti extends React.Component {
  static props: Props;

  render() {
    const { app: { screenSize } } = this.props;
    const breadcrumb = [
      {
        title: 'Home',
        url: '/',
      },
      {
        title: 'Printi na imprensa',
      },
    ];

    return (
      <section>
        {!isMobile(screenSize) && <Breadcrumbs links={breadcrumb} />}
        <div className="container">
          <h2>Sobre a printi</h2>

          <h3>Revolucionando o mercado gráfico</h3>
          <p>A Printi está no mercado desde 2012</p>
          
          <p>A Printi é um modelo inovador de gráfica online no mercado brasileiro, com impressões de alta qualidade a preços acessíveis.
            Utilizamos as mais modernas ferramentas do setor de Web2Print para simplificar e agilizar o complexo processo de encomenda de impressos personalizados.
          </p>
          <p>Fundada a partir de conceitos adquiridos em 25 anos de experiência na indústria gráfica brasileira, a Printi oferece mais de 6.000 combinações diferentes de produtos impressos.
            Todas essas combinações são acessíveis através de nossa revolucionária matriz de customização, que dá ao usuário o total controle de seu produto, e calcula, em trempo real, o custo final do orçamento.
            É essa funcionalidade que traz completa transparência ao processo de compra e que separa a Printi de seus concorrentes no mercado gráfico.
          </p>
          <div>
            <p>"A Printi oferece a checagem online gratuita e imediata da arte final, uma característica oferecida somente pelos mais avançados serviços Web2Print do mundo"</p>
          </div>

          <p>Além da revolucionária matriz de customização, a Printi oferece a checagem online gratuita e imediata da arte final, uma característica oferecida somente pelos mais avançados serviços Web2Print do mundo. A checagem online elimina a maior parte do ineficiente processo de pré-impressão, fornecendo ao cliente final uma experiência rápida e eficiente, sem burocracia e sem transtornos. Essa eficiência permite à Printi repassar a seus clientes as reduções de custo obtidas, assim oferecendo preços excelentes e produtos de altíssima qualidade.</p>
          <p>A Printi convida todos a testarem nosso processo de customização e compra. Em caso de dúvidas, entre em contato conosco através do email suporte@printi.com.br ou do telefone (11) 2318.1919.</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(AboutPrinti);
