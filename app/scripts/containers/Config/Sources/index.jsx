// @flow

import React from 'react';
import cx from 'classnames';
import Modal from 'components/Modal';
import { RoundedConfirmationButton } from 'atoms/Buttons';
import { settingsSourceFetch, settingsSourceReset } from 'actions';
import { RefreshIcon, SettingsArtCreationIcon, SettingsTweakIcon, SettingsUploadIcon } from 'components/Icons';

import { RadioButton, CheckBox } from 'components/Input';

import ConfigBlock from '../ConfigBlock';

type Props = {
  locale: LocaleState,
  screenSize: string,
  order: number,
  finalProductId: string,
  dispatch: () => {},
  source: {},
  isComplete: boolean,
};

type State = {
  reselection: boolean,
  openArtModal: boolean,
  isArtCheckboxChecked: boolean,
};

const images = {
  upload: <SettingsUploadIcon />,
  template: <SettingsTweakIcon />,
  art_creation: <SettingsArtCreationIcon />,
};

export default class SourcesBlock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reselection: false,
      openArtModal: false,
      isArtCheckboxChecked: false,
    };
  }

  componentDidMount() {
    const { finalProductId, dispatch, source: { selectedSource } } = this.props;

    if (selectedSource) {
      dispatch(settingsSourceFetch(finalProductId, selectedSource));
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { dispatch } = this.props;
    const { openArtModal } = this.state;

    if (openArtModal && !prevState.openArtModal) {
      dispatch(settingsSourceReset());
    }
  }

  static props: Props;

  static state: State;

  handleSourceChange = (source) => {
    const { finalProductId, dispatch, source: { selectedSource } } = this.props;
    this.setState({
      reselection: false,
    });

    if (source !== selectedSource) {
      dispatch(settingsSourceFetch(finalProductId, source));
    }
  };

  handleSourceSelection = (ev) => {
    this.handleSourceChange(ev.currentTarget.value);
  };

  handleReselection = () => {
    this.setState({
      reselection: true,
    });
  };

  handleArtModalOpen = () => {
    this.setState({
      openArtModal: true,
    });
  };

  handleArtModalConfirmation = () => {
    this.setState({
      isArtCheckboxChecked: !this.state.isArtCheckboxChecked,
    });
  };

  handleArtModalClose = () => {
    this.setState({
      openArtModal: false,
    });
  };

  handleArtModalSubmit = (ev) => {
    this.setState({
      openArtModal: false,
      isArtCheckboxChecked: false,
    });

    this.handleSourceChange(ev.currentTarget.value);
  };

  renderSelectedBlock() {
    const { source: { selectedSource }, locale } = this.props;

    return (
      <div className="org-selected-source">
        <div className="mol-selected-source">
          <div>
            <div className="atm-settings-image">{images[selectedSource]}</div>
            <span>{locale[selectedSource].TITLE}</span>
          </div>
          <p>{locale[selectedSource].SUBTITLE}</p>
        </div>
        <div className="atm-blue-link" onClick={this.handleReselection} role="link">
          <RefreshIcon /> Alterar forma de criar o produto
        </div>
      </div>
    );
  }

  renderArtCreationValidation() {
    const { isArtCheckboxChecked } = this.state;
    return (
      <Modal handleCloseModal={this.handleArtModalClose}>
        <div className="app__sources-block__art-validation">
          <div>
            <h2>Regras da Criação de Arte</h2>
            <p>Olá!</p>
            <p>Vamos conhecer mais sobre o serviço de criação de arte?</p>
            <ul>
              <li>Um designer será o responsável pela criação da sua arte.</li>
              <li>O serviço prestado dá direito a uma montagem por pedido.</li>
              <li>Após o pagamento você irá preencher um briefing (formulário) no qual proverá as informações necessárias para a criação da arte.</li>
              <li>Serão permitidas apenas TRÊS alterações por pedido. A partir da 4ª alteração é gerado um custo adicional de R$ 10,00 (para cada nova alteração).</li>
              <li>O preenchimento do briefing tem prazo de 30 dias. Caso nossos profissionais não recebam interação neste período, o pedido será cancelado e um e-mail com orientações de como proceder com uma nova compra será encaminhado.</li>
            </ul>
            <p>Neste serviço <b>NÃO</b> estão inclusos:</p>
            <ul>
              <li>Criação, edição ou vetorização de logotipos.</li>
              <li>Criação e revisão de textos, o conteúdo é de sua responsabilidade.</li>
              <li>Nós não possuímos bancos de imagens, nem as retiramos de sites de busca, portanto estas são de sua responsabilidade.</li>
            </ul>
          </div>
        </div>
        <div className="app__sources-block__art-validation__footer">
          <div>
            <label>
              <CheckBox
                onChange={this.handleArtModalConfirmation}
                checked={isArtCheckboxChecked}
              />
              Li e aceito as regras da criação de arte.
            </label>
          </div>
          <div>
            <div role="link" onClick={this.handleArtModalClose}>CANCELAR</div>
            <RoundedConfirmationButton
              isEnabled={isArtCheckboxChecked}
              onClick={this.handleArtModalSubmit}
              value="art_creation"
            >
              OK
            </RoundedConfirmationButton>
          </div>
        </div>
      </Modal>
    );
  }

  renderBlock(blockName, icon, locale) {
    const { source: { selectedSource } } = this.props;

    return (
      <div className={`app__config__creation-${blockName}`}>
        <label
          className={cx(
            'app__config__creation-label',
            selectedSource === blockName && 'app__config__creation-label--selected'
          )}
          htmlFor={`config-${blockName}`}
        >
          <div className="app__config__creation-image">
            {icon}
          </div>
          <div className="app__config__creation-input">
            <RadioButton
              name="config-creation"
              id={`config-${blockName}`}
              value={blockName}
              onChange={blockName === 'art_creation' ? this.handleArtModalOpen : this.handleSourceSelection}
              checked={selectedSource === blockName}
            />
            {locale.TITLE}
          </div>
        </label>
        <p>
          {locale.SUBTITLE}
        </p>
      </div>
    );
  }

  renderSelectionBlock() {
    const { locale, source: { enabledSources } } = this.props;

    return (
      <div className="app__config__creation">
        {Object.keys(enabledSources)
          .filter((source) => enabledSources[source])
          .map((source) => this.renderBlock(source, images[source], locale[source]))
        }
      </div>
    );
  }

  render() {
    const { source: { selectedSource }, locale, screenSize, order, isComplete } = this.props;
    const { reselection, openArtModal } = this.state;

    let block = null;

    if (selectedSource && !reselection) {
      block = this.renderSelectedBlock();
    } else {
      block = this.renderSelectionBlock();
    }

    return (
      <ConfigBlock
        locale={locale}
        screenSize={screenSize}
        order={order}
        isComplete={isComplete}
        className="app__config__sources-block"
      >
        <div>
          {block}
          {openArtModal && this.renderArtCreationValidation()}
        </div>
      </ConfigBlock>
    );
  }
}
