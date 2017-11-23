// @flow
import React from 'react';
import { connect } from 'react-redux';
import RichTextEditor from 'react-rte';
import { isObject } from 'utils/helpers';
import { newProposalRequest, approveProposalRequest, fetchSingleFileRequest } from 'actions';
import { RoundedTransparentButton, RoundedConfirmationButton } from 'atoms/Buttons';
import { BoxRadio, InputText, InputTextArea } from 'atoms/Inputs';
import { CheckBox } from 'components/Input';
import { Input } from 'quarks/Inputs';
import { InputEmail } from 'quarks/Inputs/Validatable';
import { Link } from 'react-router-dom';

type Props = {
  screenSize: string,
  activeIndex: string,
  proposals: {},
  dispatch: () => {},
  updateTab: (str) => {},
};

export class BriefingContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: props.activeIndex,
      activeTab: '',
    };
  }

  static defaultProps = {
    screenSize: 'xs',
  };

  componentWillMount() {
    const { screenSize } = this.props;
    console.log('screensize ====>', screenSize);
    if (!['xs', 'is', 'sm', 'ix', 'md', 'im'].includes(screenSize)) {
      this.setState({ activeTab: 'creation' });
    }
  }

  componentDidMount() {
    const { screenSize } = this.props;
    const width = document.getElementsByClassName('container')[0].clientWidth;
    const minusWidth = ['xs', 'is', 'sm', 'ix', 'md', 'im'].includes(screenSize) ? 40 : 380;
    this.setState({ editorWidth: width - minusWidth });
  }

  componentWillReceiveProps(nextProps) {
    const { activeIndex } = this.state;
    const newActiveIndex = nextProps.activeIndex;
    if (activeIndex !== newActiveIndex) {
      this.setState({
        activeIndex: newActiveIndex,
      });
    }
  }


  static props: Props;

  handleSelection = (ev) => {
    const { updateTab, activeIndex, proposals } = this.props;
    const activeTab = ev.currentTarget.value;
    //const className = (activeTab === 'creation' || activeTab === 'reproduction' || activeIndex === proposals.length) ? 'atm-accordion-sub-item-body' : 'atm-accordion-sub-item-body-close';
    this.setState({
      activeTab,
    });
    // this.setState({
    //   activeTab,
    // }, () => {
    //   updateTab(className);
    // });
  };

  renderArtCreation() {
    return (
      <div className="container-createBriefing">
        <div>
          <form className="org-checkout-content-data">
            <div className="input-item-container">
              <div className="text-bold-briefing">Qual é o ramo da sua empresa?</div>
              <InputText
                placeholder=""
                value=""
                onChange={() => {}}
                className="atm-checkout-input-one"
              />
            </div>
            <div className="input-item-container">
              <div className="text-bold-briefing">Qual o nome da sua empresa?</div>
              <InputText
                placeholder=""
                value=""
                onChange={() => {}}
                className="atm-checkout-input-one"
              />
            </div>
          </form>
          <div className="box-textsBriefing">
            <p className="text-bold-briefing">Há alguma referência específica ou arquivo pronto que possa ajudar o designer no processor criativo?</p>
            <p className="text-italic-briefing margin-b">Você pode enviar um modelo como referência visual e nossos profissionais poderão entender melhor o que você deseja que seja feito em sua arte.</p>
            <Link to="#" className="btn-default btn-secondary fnt-bold btn-lg">Selecione os arquivos</Link>
          </div>
        </div>

        <div>
          <form className="org-checkout-content-data">
            <div className="input-item-container">
              <div className="text-bold-briefing">Quais são as cores de sua preferência?</div>
              <InputText
                placeholder=""
                value=""
                onChange={() => {}}
                className="atm-checkout-input-one"
              />
            </div>
          </form>
          <div className="">
            <p className="text-bold-briefing">Dados pessoais</p>
            <p className="text-italic-briefing">Se desejar dados pessoas em sua arte, preencha os campos a seguir.</p>
          </div>
          <form className="org-checkout-content-data">
            <div className="input-item-container">
              <div className="text-bold-briefing">Nome:</div>
              <InputText
                placeholder=""
                value=""
                onChange={() => {}}
                className="atm-checkout-input-one"
              />
            </div>
            <div className="input-item-container">
              <div className="text-bold-briefing">Telefone:</div>
              <InputText
                placeholder=""
                value=""
                onChange={() => {}}
                className="atm-checkout-input-one"
              />
            </div>
            <div className="input-item-container">
              <div className="text-bold-briefing">E-mail:</div>
              <InputText
                placeholder=""
                value=""
                onChange={() => {}}
                className="atm-checkout-input-one"
              />
            </div>
            <div className="input-item-container">
              <div className="text-bold-briefing">Endereço:</div>
              <InputText
                placeholder=""
                value=""
                onChange={() => {}}
                className="atm-checkout-input-one"
              />
            </div>
            <div className="input-item-container">
              <div className="text-bold-briefing">Conteúdo (frases, títulos, slogans, textos, descrições, preços - escreva o conteúdo exato que irá em sua arte):</div>
              <InputTextArea
                placeholder=""
                value=""
                onChange={() => {}}
                className="atm-checkout-input-one"
              />
            </div>
          </form>
          <div>
            <div className="button-item-container">
              <p className="text-bold-briefing">A sua arte possui fotos? Você pode anéxa-las aqui!</p>
              <Link to="#" className="btn-default btn-secondary fnt-bold btn-lg">Selecione os arquivos</Link>
            </div>
            <div className="button-item-container">
              <p className="text-bold-briefing">Anexe aqui o seu logotipo:</p>
              <Link to="#" className="btn-default btn-secondary fnt-bold btn-lg">Selecione os arquivos</Link>
            </div>
            <div className="button-item-container no-margin">
              <p className="text-italic-briefing">Para garantir a qualidade de sua impressão pedimos que nos encaminhe as imagens em alta resolução e os logotipos vetorizados, se possível.</p>
              <Link to="#" className="btn-default btn-primary fnt-bold btn-lg">Enviar briefing</Link>
            </div>
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
            <div className="input-item-container">
              <div className="text-bold-briefing">Qual é o ramo da sua empresa?</div>
              <InputText
                placeholder=""
                value=""
                onChange={() => {}}
                className="atm-checkout-input-one"
              />
            </div>
            <div className="input-item-container">
              <div className="text-bold-briefing">Qual o nome da sua empresa?</div>
              <InputText
                placeholder=""
                value=""
                onChange={() => {}}
                className="atm-checkout-input-one"
              />
            </div>
          </form>
          <div className="box-textsBriefing">
            <p className="text-bold-briefing">Há alguma imagem ou arquivo pronto que possa ajudar o designer?</p>
            <p className="text-italic-briefing">- Se possuir modelos editáveis (PDF, Corel, Illustrator, Photoshop) para nos enviar será melhor ainda!</p>
            <p className="text-italic-briefing">- Se preferir, você pode tirar uma foto do que gostaria e nós faremos o possível para que sua arte fique igual a arte da foto enviada.</p>
            <p className="text-italic-briefing margin-b">- Caso a arte possua imagem ou logo, o envio dos mesmos poderá ser requisitado separadamente.</p>
            <Link to="#" className="btn-default btn-secondary fnt-bold btn-lg">Selecione os arquivos</Link>
          </div>
        </div>

        <div>
          <div className="box-textsBriefing">
            <p className="text-italic-briefing">Os brindes metálicos, como chaveiros e canetas, serão apresentados com a arte em preto, pois são gravados a laser e por isso não possuem cor</p>
          </div>
          <div className="">
            <p className="text-bold-briefing">Confirme seus dados pessoais</p>
          </div>
          <form className="org-checkout-content-data">
            <div className="input-item-container">
              <div className="text-bold-briefing">Nome:</div>
              <InputText
                placeholder=""
                value=""
                onChange={() => {}}
                className="atm-checkout-input-one"
              />
            </div>
            <div className="input-item-container">
              <div className="text-bold-briefing">Telefone:</div>
              <InputText
                placeholder=""
                value=""
                onChange={() => {}}
                className="atm-checkout-input-one"
              />
            </div>
            <div className="input-item-container">
              <div className="text-bold-briefing">E-mail:</div>
              <InputText
                placeholder=""
                value=""
                onChange={() => {}}
                className="atm-checkout-input-one"
              />
            </div>
            <div className="input-item-container">
              <div className="text-bold-briefing">Endereço:</div>
              <InputText
                placeholder=""
                value=""
                onChange={() => {}}
                className="atm-checkout-input-one"
              />
            </div>
            <div className="input-item-container">
              <div className="text-bold-briefing">Conteúdo (frases, títulos, slogans, textos, descrições, preços - escreva o conteúdo exato que irá em sua arte):</div>
              <InputTextArea
                placeholder=""
                value=""
                onChange={() => {}}
                className="atm-checkout-input-one"
              />
            </div>
          </form>
          <div>
            <div className="button-item-container">
              <p className="text-bold-briefing">A sua arte possui fotos? Você pode anéxa-las aqui!</p>
              <Link to="#" className="btn-default btn-secondary fnt-bold btn-lg">Selecione os arquivos</Link>
            </div>
            <div className="button-item-container">
              <p className="text-bold-briefing">Anexe aqui o seu logotipo:</p>
              <Link to="#" className="btn-default btn-secondary fnt-bold btn-lg">Selecione os arquivos</Link>
            </div>
            <div className="button-item-container no-margin">
              <p className="text-italic-briefing">Para garantir a qualidade de sua impressão pedimos que nos encaminhe as imagens em alta resolução e os logotipos vetorizados, se possível.</p>
              <Link to="#" className="btn-default btn-primary fnt-bold btn-lg">Enviar briefing</Link>
            </div>
          </div>
        </div>
      </div>

      
      // <div className="container-reproduction">
      //   <div>
      //     <form className="org-checkout-content-data">
      //       <Input
      //         showLabel={true}
      //         className="atm-checkout-input atm-checkout-input-one"
      //         placeholder="Qual é o ramo da sua empresa?"
      //         onClick={this.showToggleNav}
      //       />
      //       <Input
      //         showLabel={true}
      //         className="atm-checkout-input atm-checkout-input-one"
      //         placeholder="Qual o nome da sua empresa?"
      //       />
      //     </form>
      //     <div className="box-textsBriefing">
      //       <p className="text-bold-briefing">Há alguma imagem ou arquivo pronto que possa ajudar o designer?</p>
      //       <ul className="text-bold-briefing">
      //         <li>- Se possuir modelos editáveis (PDF, Corel, Illustrator, Photoshop) para nos enviar será melhor ainda!</li>
      //         <li>- Se preferir, você pode tirar uma foto do que gostaria e nós faremos o possível para que sua arte fique igual a arte da foto enviada.</li>
      //         <li>Obs: Confira a foto e certifique-se que esteja em boa qualidade.</li>
      //         <li>- Caso a arte possua imagem ou logo, o envio dos mesmos poderá ser requisitado separadamente.</li>
      //       </ul>
      //       <Link to="#" className="btn-default btn-secondary fnt-bold btn-lg">Selecione os arquivos</Link>
      //     </div>
      //     <div className="box-textsBriefing">
      //       <p className="text-italic-briefing">Os brindes metálicos, como chaveiros e canetas, serão apresentados com a arte em preto, pois são gravados a laser e por isso não possuem cor.</p>
      //     </div>
      //   </div>

      //   <div>
      //     <p className="text-bold-briefing">Confirme seus dados pessoais</p>
      //     <form className="org-checkout-content-data">
      //       <Input
      //         showLabel={true}
      //         className="atm-checkout-input atm-checkout-input-two"
      //         placeholder="Nome"
      //       />

      //       <Input
      //         showLabel={true}
      //         className="atm-checkout-input atm-checkout-input-two"
      //         placeholder="Telefone"
      //       />

      //       <InputEmail
      //         name="email"
      //         placeholder="E-mail"
      //         showLabel={true}
      //         onValidate={this.handleValidatedInput}
      //       />

      //       <Input
      //         showLabel={true}
      //         className="atm-checkout-input atm-checkout-input-two"
      //         placeholder="Endereço"
      //       />

      //       <Input
      //         showLabel={true}
      //         className="atm-checkout-input atm-checkout-input-full textArea-height"
      //         placeholder="Conteúdo (frases, títulos, slogans, textos, descrições, preços - escreva o conteúdo exato que irá em sua arte)"
      //       />
      //     </form>
      //     <div className="box-textsBriefing">
      //       <p>A sua arte possui fotos?Você pode anéxa-las aqui!</p>
      //       <Link to="#" className="btn-default btn-secondary fnt-bold btn-lg">Selecione os arquivos</Link>
      //     </div>
      //     <div className="box-textsBriefing">
      //       <p>Anexe aqui o seu logotipo:</p>
      //       <Link to="#" className="btn-default btn-secondary fnt-bold btn-lg">Selecione os arquivos</Link>
      //     </div>
      //     <div className="box-textsBriefing">
      //       <p className="text-italic-briefing">Para garantir a qualidade de sua impressão pedimos que nos encaminhe as imagens em alta resolução e os logotipos vetorizados, se possível.</p>
      //       <Link to="#" className="btn-default btn-primary fnt-bold btn-lg">Enviar briefing</Link>
      //     </div>
      //   </div>
      // </div>
      
    );
  }

  renderMobile() {
    
  }

  renderDesktop() {
    const { activeTab } = this.state;
    return (
      <div className="container-proposal briefing-container">
        <div className="content-proposal">
          <div className="bg-briefing">
            <div className="brief-header">
              {(activeTab === 'creation' || activeTab === 'reproduction') ? null : <h3>Escolha uma das opções abaixo para preencher o seu briefing</h3>}
              <BoxRadio
                value="creation"
                onChange={this.handleSelection}
                name="pane-type"
                checked={activeTab === 'creation'}
              >
                Criação
                <div className="tooltip left">
                  Sev voce nao tem un modelo, deixe por conta dos nossos designers! Desenvolveremos a sua arte de acordo com as suas ideais! :)
                </div>
              </BoxRadio>
              <BoxRadio
                value="reproduction"
                onChange={this.handleSelection}
                name="pane-type"
                checked={activeTab === 'reproduction'}
              >
                Reprodução
                <div className="tooltip right">
                  Se voce ja tem um modelo e quer qua a gente o reproduza, clique aqui! Com base na sua referencia, vamos desenvolver uma arte similar :)
                </div>
              </BoxRadio>
              {(activeTab === 'creation' || activeTab === 'reproduction') ? <div className="separate-line" /> : null}
            </div>
            <div>
              { (activeTab === 'creation') ? this.renderArtCreation() : null }
              { (activeTab === 'reproduction') ? this.renderReproduction() : null }
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { screenSize } = this.props;

    return ['xs', 'is', 'sm', 'ix', 'md', 'im'].includes(screenSize)
      ? this.renderDesktop()
      : this.renderDesktop();
  }
}

function mapStateToProps(state) {
  return {
    
  };
}

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(BriefingContent);

