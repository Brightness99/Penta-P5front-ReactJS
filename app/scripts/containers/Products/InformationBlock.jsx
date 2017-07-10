// @flow
import React from 'react';

type Props = {
  screenSize: string;
  className: string,
  locale: {},
  button?: typeof React.Component,
};

export class InformationBlock extends React.Component {

  static defaultProps = {
    screenSize: 'xs',
  };

  props: Props;

  renderMobile() {
    return (
      <section className="container-productInformation">
        <div className="box-productInformation">
          <h4 className="productInformation-title">Informações do produto</h4>
          <div>
            <ul>
              <li>Dicas</li>
              <li>Como utilizar</li>
              <li>Especificações</li>
              <li>Gabaritos</li>
            </ul>
            <div>
              <ul>
                <li>
                  <img src="http://localhost:3000/34b63a5f4fa0c95e74577ea1d544030e.png" alt="asdasd" />
                  <h5>Sugestão 1 - Benefício por visita</h5>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris convallis sem quis consequat sollicitudin. Morbi vestibulum ultricies tellus sit amet ultrices. Ler mais </p></li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  }

  renderDesktop() {
    return (
      <section className="container-productInformation">
        <div className="box-productInformation">
          <h4 className="productInformation-title">Informações do produto</h4>
          <div>

            <ul className="list-item awol-pdd awol-list-style">
              <li>Dicas</li>
              <li>Como utilizar</li>
              <li>Especificações</li>
              <li>Gabaritos</li>
            </ul>

            <div className="card-productInformation">
              <div className="card-productInformation-image">
                <img src="https://www.printi.com.br/thumbs/272x269c/2016-06/cartao-visita-dica1.jpg" alt="asdasd" />
              </div>
              <div className="card-productInformation-text">
                <h4 className="card-productInformation-title">1. Inclua apenas dados básicos de identificação e contato</h4>
                <p>Os cartões de visita são os principais impressos de apresentação pessoal disponíveis.</p>
                <p>Para que ele seja eficiente e cumpra seu papel, insira apenas informações relevantes, que ajudem na sua identificação.</p>
                <p>Veja mais em nosso Tutorial de <span>Cartão de Visita</span></p>
              </div>
            </div>       
          </div>
        </div>
      </section>
    );
  }

  render() {
    const { screenSize } = this.props;
    return (
      <div>
        {
          ['xs', 'is', 'sm', 'ix', 'md', 'im'].includes(screenSize)
            ? this.renderMobile()
            : this.renderDesktop()
        }
      </div>
    );
  }
}

export default InformationBlock;
