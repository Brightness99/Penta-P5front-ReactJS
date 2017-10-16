// @flow

import * as React from 'react';
import cx from 'classnames';
import { settingsSourceFetch, settingsSourceReset } from 'actions';
import { RefreshIcon, SettingsArtCreationIcon, SettingsTweakIcon, SettingsUploadIcon } from 'components/Icons';
import Modal from 'components/Modal';
import { RadioButton } from 'components/Input';
import MoreInfo from 'components/MoreInfo';
import { FunnelBlock } from 'components/Funnel';
import { ArtCreationModal } from '../Modals';

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

  handleImage(source) {
    switch (source) {
      case 'upload':
        return <SettingsUploadIcon />;
      case 'template':
        return <SettingsTweakIcon />;
      case 'art_creation':
        return <SettingsArtCreationIcon />;
      default:
        return null;
    }
  }

  renderSelectedBlock() {
    const { source: { selectedSource }, locale } = this.props;

    const localeSource = locale.order_source_options
      .filter((sources) => sources.source === selectedSource)
      .reduce((prevSource, nextSource) => nextSource, {});

    return (
      <div className="org-selected-source">
        <div className="mol-selected-source">
          <div>
            <div className="atm-settings-image">{this.handleImage(selectedSource)}</div>
            <span>{localeSource.title}</span>
          </div>
          <p>{localeSource.description}</p>
        </div>
        <button className="atm-blue-link" onClick={this.handleReselection}>
          <RefreshIcon /> Alterar forma de criar o produto
        </button>
      </div>
    );
  }

  renderArtCreationValidation() {
    const { isArtCheckboxChecked } = this.state;

    return (
      <Modal handleCloseModal={this.handleArtModalClose}>
        <ArtCreationModal
          isChecked={isArtCheckboxChecked}
          onConfirmation={this.handleArtModalConfirmation}
          onCancel={this.handleArtModalClose}
          onSubmit={this.handleArtModalSubmit}
        />
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
            {locale.title}
          </div>
        </label>
        <p>
          {locale.description}
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
          .map(
            (source) => this.renderBlock(
              source,
              this.handleImage(source),
              locale.order_source_options
                .filter((sources) => sources.source === source)
                .reduce((prevSources, nextSources) => nextSources, {})
            )
          )
        }
      </div>
    );
  }

  render() {
    const { source: { selectedSource }, locale, order } = this.props;
    const { reselection, openArtModal } = this.state;

    let block = null;

    if (selectedSource && !reselection) {
      block = this.renderSelectedBlock();
    } else {
      block = this.renderSelectionBlock();
    }

    return (
      <FunnelBlock
        order={order}
        isComplete={selectedSource}
        className="app__config__sources-block"
        header={[
          <span key="source-block-title">{locale.TITLE}</span>,
          <MoreInfo key="source-block-more-info" text={locale.more_info.TEXT} />,
        ]}
      >
        {block}
        {openArtModal && this.renderArtCreationValidation()}
      </FunnelBlock>
    );
  }
}
