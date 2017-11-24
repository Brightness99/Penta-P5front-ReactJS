// @flow
import React from 'react';
import { connect } from 'react-redux';
import { briefingDetailsFetch, saveBriefing, updateBriefing } from 'actions';
import { BoxRadio, InputText, InputTextArea } from 'atoms/Inputs';
import { Link } from 'react-router-dom';

type Props = {
  screenSize: string,
  activeIndex: string,
  artCreation: {},
  proposals: {},
  match: {},
  dispatch: () => {},
  updateTab: (str) => {},
};

const FormType = {
  CREATION: 'creation',
  NEWCREATION: 'newcreation',
};

const FieldType = {
  QUESTION1: 'question1',
  QUESTION2: 'question2',
  QUESTION3: 'question3',
  QUESTION4: 'question4',
  QUESTION5: 'question5',
  QUESTION6: 'question6',
  QUESTION7: 'question7',
  QUESTION8: 'question8',
};

export class BriefingContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: props.activeIndex,
      activeTab: '',
      newcreation: {
        file_url: {
          0: {
            0: "https://alpha-upload-dev.s3-sa-east-1.amazonaws.com/briefing%2F0%2F0%2F1506947599045_800476_800707_02102017_1533_0.pdf"
          },
          1: {
            0: "https://alpha-upload-dev.s3-sa-east-1.amazonaws.com/briefing%2F0%2F0%2F1506950055456_800476_800707_02102017_1614_0.pdf"
          },
          2: {
            0: "https://alpha-upload-dev.s3-sa-east-1.amazonaws.com/briefing%2F0%2F0%2F1506950063395_800476_800707_02102017_1614_0.pdf"
          }
        },
        content: {
          formType: 'creation',
          question1: '',
          question2: '',
          question3: '',
          question4: '',
          question5: '',
          question6: '',
          question7: '',
          question8: '',
        },
      },
      creation: {
        file_url: {
          0: {
            0: "https://alpha-upload-dev.s3-sa-east-1.amazonaws.com/briefing%2F0%2F0%2F1506947599045_800476_800707_02102017_1533_0.pdf"
          },
          1: {
            0: "https://alpha-upload-dev.s3-sa-east-1.amazonaws.com/briefing%2F0%2F0%2F1506950055456_800476_800707_02102017_1614_0.pdf"
          },
          2: {
            0: "https://alpha-upload-dev.s3-sa-east-1.amazonaws.com/briefing%2F0%2F0%2F1506950063395_800476_800707_02102017_1614_0.pdf"
          }
        },
        content: {
          formType: 'creation',
          question1: '',
          question2: '',
          question3: '',
          question4: '',
          question5: '',
          question6: '',
          question7: '',
          question8: '',
        },
      },
    };
  }

  static defaultProps = {
    screenSize: 'xs',
  };

  componentDidMount() {
    const { screenSize, dispatch, match: { params: { orderNumber, orderItemId } } } = this.props;
    const width = document.getElementsByClassName('container')[0].clientWidth;
    const minusWidth = ['xs', 'is', 'sm', 'ix', 'md', 'im'].includes(screenSize) ? 40 : 380;
    this.setState({ editorWidth: width - minusWidth });
    dispatch(briefingDetailsFetch({ order_id: orderNumber, order_item_id: orderItemId }));
  }

  componentWillReceiveProps(nextProps) {
    const { activeIndex } = this.state;
    const { artCreation } = nextProps;
    const newActiveIndex = nextProps.activeIndex;
    if (activeIndex !== newActiveIndex) {
      this.setState({
        activeIndex: newActiveIndex,
      });
    }
    if (artCreation.briefing.data && Object.keys(artCreation.briefing.data).length !== 0) {
      this.setState({
        creation: artCreation.briefing.data,
      });
    }
  }


  static props: Props;

  handleSelection = (ev) => {
    const activeTab = ev.currentTarget.value;
    this.setState({
      activeTab,
    });
  };

  inputTextChangeHandler(ev, formType, fieldType) {
    if (formType === formType.NEWCREATION) {
      const { newcreation } = this.state;
      const tempCreation = Object.assign({}, newcreation);
      const content = Object.assign({}, tempCreation.content);
      switch (fieldType) {
        case FieldType.QUESTION1:
          content.question1 = ev.currentTarget.value;
          tempCreation.content = content;
          break;
        case FieldType.QUESTION2:
          content.question2 = ev.currentTarget.value;
          tempCreation.content = content;
          break;
        case FieldType.QUESTION3:
          content.question3 = ev.currentTarget.value;
          tempCreation.content = content;
          break;
        case FieldType.QUESTION4:
          content.question4 = ev.currentTarget.value;
          tempCreation.content = content;
          break;
        case FieldType.QUESTION5:
          content.question5 = ev.currentTarget.value;
          tempCreation.content = content;
          break;
        case FieldType.QUESTION6:
          content.question6 = ev.currentTarget.value;
          tempCreation.content = content;
          break;
        case FieldType.QUESTION7:
          content.question7 = ev.currentTarget.value;
          tempCreation.content = content;
          break;
        case FieldType.QUESTION8:
          content.question8 = ev.currentTarget.value;
          tempCreation.content = content;
          break;
        default:
      }
      this.setState({ newcreation: tempCreation });
    } else {
      const { creation } = this.state;
      const tempCreation = Object.assign({}, creation);
      const content = Object.assign({}, tempCreation.content);
      switch (fieldType) {
        case FieldType.QUESTION1:
          content.question1 = ev.currentTarget.value;
          tempCreation.content = content;
          break;
        case FieldType.QUESTION2:
          content.question2 = ev.currentTarget.value;
          tempCreation.content = content;
          break;
        case FieldType.QUESTION3:
          content.question3 = ev.currentTarget.value;
          tempCreation.content = content;
          break;
        case FieldType.QUESTION4:
          content.question4 = ev.currentTarget.value;
          tempCreation.content = content;
          break;
        case FieldType.QUESTION5:
          content.question5 = ev.currentTarget.value;
          tempCreation.content = content;
          break;
        case FieldType.QUESTION6:
          content.question6 = ev.currentTarget.value;
          tempCreation.content = content;
          break;
        case FieldType.QUESTION7:
          content.question7 = ev.currentTarget.value;
          tempCreation.content = content;
          break;
        case FieldType.QUESTION8:
          content.question8 = ev.currentTarget.value;
          tempCreation.content = content;
          break;
        default:
      }
      this.setState({ creation: tempCreation });
    }
  }

  initNewCreation() {
    const { newcreation } = this.state;
    const tempCreation = Object.assign({}, newcreation);
    tempCreation.content = {
      formType: 'creation',
      question1: '',
      question2: '',
      question3: '',
      question4: '',
      question5: '',
      question6: '',
      question7: '',
      question8: '',
    };
    this.setState({
      newcreation: tempCreation,
    });
  }

  sendBriefingHandler(formType) {
    const { dispatch, match: { params: { orderNumber, orderItemId } } } = this.props;
    if (formType === FormType.NEWCREATION) {
      const { newcreation } = this.state;
      const briefingData = {
        order_item_id: orderItemId,
        order_id: orderNumber,
        ...newcreation,
      };
      dispatch(saveBriefing(briefingData));
      this.initNewCreation();
    } else {
      const { creation } = this.state;
      const briefingData = {
        order_item_id: orderItemId,
        order_id: orderNumber,
        ...creation,
      };
      dispatch(updateBriefing(briefingData));
    }
  }

  renderArtCreation() {
    const { newcreation } = this.state;
    return (
      <div className="container-createBriefing">
        <div>
          <form className="org-checkout-content-data">
            <div className="input-item-container">
              <div className="text-bold-briefing">Qual é o ramo da sua empresa?</div>
              <InputText
                placeholder=""
                value={newcreation.content.question1}
                onChange={(ev) => { this.inputTextChangeHandler(ev, FormType.NEWCREATION, FieldType.QUESTION1); }}
                className="atm-checkout-input-one"
              />
            </div>
            <div className="input-item-container">
              <div className="text-bold-briefing">Qual o nome da sua empresa?</div>
              <InputText
                placeholder=""
                value={newcreation.content.question2}
                onChange={(ev) => { this.inputTextChangeHandler(ev, FormType.NEWCREATION, FieldType.QUESTION2); }}
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
                value={newcreation.content.question8}
                onChange={(ev) => { this.inputTextChangeHandler(ev, FormType.NEWCREATION, FieldType.QUESTION8); }}
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
                value={newcreation.content.question3}
                onChange={(ev) => { this.inputTextChangeHandler(ev, FormType.NEWCREATION, FieldType.QUESTION3); }}
                className="atm-checkout-input-one"
              />
            </div>
            <div className="input-item-container">
              <div className="text-bold-briefing">Telefone:</div>
              <InputText
                placeholder=""
                value={newcreation.content.question4}
                onChange={(ev) => { this.inputTextChangeHandler(ev, FormType.NEWCREATION, FieldType.QUESTION4); }}
                className="atm-checkout-input-one"
              />
            </div>
            <div className="input-item-container">
              <div className="text-bold-briefing">E-mail:</div>
              <InputText
                placeholder=""
                value={newcreation.content.question5}
                onChange={(ev) => { this.inputTextChangeHandler(ev, FormType.NEWCREATION, FieldType.QUESTION5); }}
                className="atm-checkout-input-one"
              />
            </div>
            <div className="input-item-container">
              <div className="text-bold-briefing">Endereço:</div>
              <InputText
                placeholder=""
                value={newcreation.content.question6}
                onChange={(ev) => { this.inputTextChangeHandler(ev, FormType.NEWCREATION, FieldType.QUESTION6); }}
                className="atm-checkout-input-one"
              />
            </div>
            <div className="input-item-container">
              <div className="text-bold-briefing">Conteúdo (frases, títulos, slogans, textos, descrições, preços - escreva o conteúdo exato que irá em sua arte):</div>
              <InputTextArea
                placeholder=""
                value={newcreation.content.question7}
                onChange={(ev) => { this.inputTextChangeHandler(ev, FormType.NEWCREATION, FieldType.QUESTION7); }}
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
              <Link to="#" className="btn-default btn-primary fnt-bold btn-lg" onClick={() => this.sendBriefingHandler(FormType.NEWCREATION)}>Enviar briefing</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderReproduction() {
    const { creation } = this.state;
    return (
      <div className="container-reproduction">
        <div>
          <form className="org-checkout-content-data">
            <div className="input-item-container">
              <div className="text-bold-briefing">Qual é o ramo da sua empresa?</div>
              <InputText
                placeholder=""
                value={creation.content.question1}
                onChange={(ev) => { this.inputTextChangeHandler(ev, FormType.CREATION, FieldType.QUESTION1); }}
                className="atm-checkout-input-one"
              />
            </div>
            <div className="input-item-container">
              <div className="text-bold-briefing">Qual o nome da sua empresa?</div>
              <InputText
                placeholder=""
                value={creation.content.question2}
                onChange={(ev) => { this.inputTextChangeHandler(ev, FormType.CREATION, FieldType.QUESTION2); }}
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
                value={creation.content.question3}
                onChange={(ev) => { this.inputTextChangeHandler(ev, FormType.CREATION, FieldType.QUESTION3); }}
                className="atm-checkout-input-one"
              />
            </div>
            <div className="input-item-container">
              <div className="text-bold-briefing">Telefone:</div>
              <InputText
                placeholder=""
                value={creation.content.question4}
                onChange={(ev) => { this.inputTextChangeHandler(ev, FormType.CREATION, FieldType.QUESTION4); }}
                className="atm-checkout-input-one"
              />
            </div>
            <div className="input-item-container">
              <div className="text-bold-briefing">E-mail:</div>
              <InputText
                placeholder=""
                value={creation.content.question5}
                onChange={(ev) => { this.inputTextChangeHandler(ev, FormType.CREATION, FieldType.QUESTION5); }}
                className="atm-checkout-input-one"
              />
            </div>
            <div className="input-item-container">
              <div className="text-bold-briefing">Endereço:</div>
              <InputText
                placeholder=""
                value={creation.content.question6}
                onChange={(ev) => { this.inputTextChangeHandler(ev, FormType.CREATION, FieldType.QUESTION6); }}
                className="atm-checkout-input-one"
              />
            </div>
            <div className="input-item-container">
              <div className="text-bold-briefing">Conteúdo (frases, títulos, slogans, textos, descrições, preços - escreva o conteúdo exato que irá em sua arte):</div>
              <InputTextArea
                placeholder=""
                value={creation.content.question7}
                onChange={(ev) => { this.inputTextChangeHandler(ev, FormType.CREATION, FieldType.QUESTION7); }}
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
              <Link to="#" className="btn-default btn-primary fnt-bold btn-lg" onClick={() => this.sendBriefingHandler(FormType.CREATION)}>Enviar briefing</Link>
            </div>
          </div>
        </div>
      </div>
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
                  Se voce nao tem un modelo, deixe por conta dos nossos designers! Desenvolveremos a sua arte de acordo com as suas ideais! :)
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
    artCreation: state.artCreation,
  };
}

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(BriefingContent);

