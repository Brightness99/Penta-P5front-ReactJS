// @flow

import React from 'react';
import cx from 'classnames';

import { RadioButton } from 'components/Input';

import ConfigBlock from './ConfigBlock';

type Props = {
  locale: {},
  screenSize: string,
};

type State = {
  selectedCreation: string,
};

export default class CreationBlock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCreation: '',
    };

    this.renderBlock = this.renderBlock.bind(this);
  }

  static props: Props;

  static state: State;

  handleChange = (ev) => {
    this.setState({
      selectedCreation: ev.target.value,
    });
  };

  renderBlock(blockName, icon, locale) {
    const { selectedCreation } = this.state;

    return (
      <div className={`app__config__creation-${blockName}`}>
        <label
          className={cx(
            'app__config__creation-label',
            selectedCreation === blockName && 'app__config__creation-label--selected'
          )}
          htmlFor={`config-${blockName}`}
        >
          <div className="app__config__creation-image">
            <img src={icon} alt="Conf-Icon" />
          </div>
          <div className="app__config__creation-input">
            <RadioButton
              name="config-creation"
              id={`config-${blockName}`}
              value={blockName}
              onChange={this.handleChange}
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

  render() {
    const { locale, screenSize } = this.props;

    return (
      <ConfigBlock locale={locale} screenSize={screenSize}>
        <div className="app__config__creation">
          {this.renderBlock('tweak', require('assets/media/svg-wannabe/Conf-Icon1.png'), locale.online)}
          {this.renderBlock('upload', require('assets/media/svg-wannabe/Conf-Icon3.png'), locale.art)}
          {this.renderBlock('art_creation', require('assets/media/svg-wannabe/Conf-Icon2.png'), locale.hire)}
        </div>
      </ConfigBlock>
    );
  }
}
