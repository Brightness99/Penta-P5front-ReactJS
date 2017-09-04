// @flow
import React from 'react';
import Breadcrumbs from 'components/Breadcrumbs';
import { Input } from 'quarks/Inputs';
import { InputEmail } from 'quarks/Inputs/Validatable';
import { Link } from 'react-router-dom';
import { BoxRadio, Select } from 'atoms/Inputs';
import { Accordion, AccordionItem } from 'components/Accordion';
import { CheckIcon, PrintiClub, CloseIcon } from 'components/Icons';

type Props = {
  screenSize: string,
};

export class Briefing extends React.Component {
  static defaultProps = {
    screenSize: 'xs',
  };

  static props: Props;

  renderArtCreation() {
    return (
      <div className="container-createBriefing">
        <div>
          <form className="org-checkout-content-data">
            <Input
              showLabel={true}
              className="atm-checkout-input atm-checkout-input-one"
              placeholder="Qual é o ramo da sua empresa?"
            />
            <Input
              showLabel={true}
              className="atm-checkout-input atm-checkout-input-one"
              placeholder="Qual o nome da sua empresa?"
            />
          </form>
          <div className="box-textsBriefing">
            <p className="text-bold-briefing">Há alguma referência específica ou arquivo pronto que possa ajudar o designer no processor criativo?</p>
            <p className="text-italic-briefing">Você pode enviar um modelo como referência visual e nossos profissionais poderão entender melhor o que você deseja que seja feito em sua arte.</p>
            <Link to="#" className="btn-default btn-secondary fnt-bold btn-lg">Selecione os arquivos</Link>
          </div>
        </div>

        <div>
          <form className="org-checkout-content-data">
            <Input
              showLabel={true}
              className="atm-checkout-input atm-checkout-input-full"
              placeholder="Quais são as cores de sua preferência?"
            />
          </form>
          <div className="box-textsBriefing">
            <p className="text-bold-briefing">Dados pessoais</p>
            <p className="text-italic-briefing">Se desejar dados pessoas em sua arte, preencha os campos a seguir.</p>
          </div>
          <form className="org-checkout-content-data">
            <Input
              showLabel={true}
              className="atm-checkout-input atm-checkout-input-two"
              placeholder="Nome"
            />

            <Input
              showLabel={true}
              className="atm-checkout-input atm-checkout-input-two"
              placeholder="Telefone"
            />

            <InputEmail
              name="email"
              placeholder="E-mail"
              showLabel={true}
              onValidate={this.handleValidatedInput}
            />

            <Input
              showLabel={true}
              className="atm-checkout-input atm-checkout-input-two"
              placeholder="Endereço"
            />

            <Input
              showLabel={true}
              className="atm-checkout-input atm-checkout-input-full textArea-height"
              placeholder="Conteúdo (frases, títulos, slogans, textos, descrições, preços - escreva o conteúdo exato que irá em sua arte)"
            />
          </form>
          <div className="box-textsBriefing">
            <p>A sua arte possui fotos? Você pode anéxa-las aqui!</p>
            <Link to="#" className="btn-default btn-secondary fnt-bold btn-lg">Selecione os arquivos</Link>
          </div>
        </div>
        <div>
          <div className="box-textsBriefing">
            <p>Anexe aqui o seu logotipo:</p>
            <Link to="#" className="btn-default btn-secondary fnt-bold btn-lg">Selecione os arquivos</Link>
          </div>
        </div>
        <div>
          <div className="box-textsBriefing">
            <p>Para garantir a qualidade de sua impressão pedimos que nos encaminhe as imagens em alta resolução e os logotipos vetorizados, se possível.</p>
            <Link to="#" className="btn-default btn-primary fnt-bold btn-lg">Enviar briefing</Link>
          </div>
        </div>
      </div>
    );
  }

  renderReproduction() {
    return (
      <div className="container-reproduction">
        <div>
          <form className="org-checkout-content-data">
            <Input
              showLabel={true}
              className="atm-checkout-input atm-checkout-input-one"
              placeholder="Qual é o ramo da sua empresa?"
              onClick={this.showToggleNav}
            />
            <Input
              showLabel={true}
              className="atm-checkout-input atm-checkout-input-one"
              placeholder="Qual o nome da sua empresa?"
            />
          </form>
          <div className="box-textsBriefing">
            <p className="text-bold-briefing">Há alguma imagem ou arquivo pronto que possa ajudar o designer?</p>
            <ul className="text-bold-briefing">
              <li>- Se possuir modelos editáveis (PDF, Corel, Illustrator, Photoshop) para nos enviar será melhor ainda!</li>
              <li>- Se preferir, você pode tirar uma foto do que gostaria e nós faremos o possível para que sua arte fique igual a arte da foto enviada.</li>
              <li>Obs: Confira a foto e certifique-se que esteja em boa qualidade.</li>
              <li>- Caso a arte possua imagem ou logo, o envio dos mesmos poderá ser requisitado separadamente.</li>
            </ul>
            <Link to="#" className="btn-default btn-secondary fnt-bold btn-lg">Selecione os arquivos</Link>
          </div>
          <div className="box-textsBriefing">
            <p className="text-italic-briefing">Os brindes metálicos, como chaveiros e canetas, serão apresentados com a arte em preto, pois são gravados a laser e por isso não possuem cor.</p>
          </div>
        </div>

        <div>
          <p className="text-bold-briefing">Confirme seus dados pessoais</p>
          <form className="org-checkout-content-data">
            <Input
              showLabel={true}
              className="atm-checkout-input atm-checkout-input-two"
              placeholder="Nome"
            />

            <Input
              showLabel={true}
              className="atm-checkout-input atm-checkout-input-two"
              placeholder="Telefone"
            />

            <InputEmail
              name="email"
              placeholder="E-mail"
              showLabel={true}
              onValidate={this.handleValidatedInput}
            />

            <Input
              showLabel={true}
              className="atm-checkout-input atm-checkout-input-two"
              placeholder="Endereço"
            />

            <Input
              showLabel={true}
              className="atm-checkout-input atm-checkout-input-full textArea-height"
              placeholder="Conteúdo (frases, títulos, slogans, textos, descrições, preços - escreva o conteúdo exato que irá em sua arte)"
            />
          </form>
          <div className="box-textsBriefing">
            <p>A sua arte possui fotos?Você pode anéxa-las aqui!</p>
            <Link to="#" className="btn-default btn-secondary fnt-bold btn-lg">Selecione os arquivos</Link>
          </div>
          <div className="box-textsBriefing">
            <p>Anexe aqui o seu logotipo:</p>
            <Link to="#" className="btn-default btn-secondary fnt-bold btn-lg">Selecione os arquivos</Link>
          </div>
          <div className="box-textsBriefing">
            <p className="text-italic-briefing">Para garantir a qualidade de sua impressão pedimos que nos encaminhe as imagens em alta resolução e os logotipos vetorizados, se possível.</p>
            <Link to="#" className="btn-default btn-primary fnt-bold btn-lg">Enviar briefing</Link>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const breadcrumb = [
      {
        title: 'Home',
        url: '/',
      },
      {
        title: 'Briefing',
      },
    ];
    return (
      <div className="container-briefing">
        <div className="container bg-briefing">
          <Breadcrumbs links={breadcrumb} />
          <h2>Briefing</h2>
          <div>
            <h3>Escolha uma das opções abaixo para preencher o seu briefing</h3>
            <BoxRadio
              value="person"
              onChange={this.handleSelection}
              name="pane-type"
              checked={'person'}
            >
              Criação
            </BoxRadio>
            <BoxRadio
              value="person"
              onChange={this.handleSelection}
              name="pane-type"
              checked={'person'}
            >
              Reprodução
            </BoxRadio>
          </div>
          {this.renderReproduction()}
        </div>
      </div>
    );
  }

}

export default Briefing;
