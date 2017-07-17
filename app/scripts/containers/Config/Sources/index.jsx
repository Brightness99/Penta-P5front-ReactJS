// @flow

import React from 'react';
import cx from 'classnames';

import { settingsSourceFetch } from 'actions';
import { RefreshIcon, SettingsArtCreationIcon, SettingsTweakIcon, SettingsUploadIcon } from 'components/Icons';

import { RadioButton } from 'components/Input';

import ConfigBlock from '../ConfigBlock';


type Props = {
  locale: LocaleState,
  screenSize: string,
  order: number,
  finalProductId: string,
  dispatch: () => {},
  source: {},
};

type State = {
  reselection: boolean,
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
    };
  }

  static props: Props;

  static state: State;

  handleSourceSelection = (ev) => {
    const { finalProductId, dispatch, source: { selectedSource } } = this.props;

    this.setState({
      reselection: false,
    });

    if (ev.target.value !== selectedSource) {
      dispatch(settingsSourceFetch(finalProductId, ev.currentTarget.value));
    }
  };

  handleReselection = () => {
    this.setState({
      reselection: true,
    });
  };

  renderSelectedBlock() {
    const { source: { selectedSource }, locale } = this.props;

    return (
      <div className="org-selected-source">
        <div className="mol-selected-source">
          <div className="atm-settings-image">{images[selectedSource]}</div>
          <span>{locale[selectedSource].TITLE}</span>
          <p>{locale[selectedSource].SUBTITLE}</p>
        </div>
        <div className="atm-blue-link" onClick={this.handleReselection} role="link">
          <RefreshIcon /> Alterar forma de criar o produto
        </div>
      </div>
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
              onChange={this.handleSourceSelection}
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
    const { source: { selectedSource }, locale, screenSize, order } = this.props;
    const { reselection } = this.state;

    let block = null;

    if (selectedSource && !reselection) {
      block = this.renderSelectedBlock();
    } else {
      block = this.renderSelectionBlock();
    }

    return (
      <ConfigBlock locale={locale} screenSize={screenSize} order={order} className="app__config__sources-block">
        {block}
      </ConfigBlock>
    );
  }
}
