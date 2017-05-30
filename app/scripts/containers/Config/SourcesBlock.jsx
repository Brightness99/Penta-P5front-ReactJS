// @flow

import React from 'react';
import cx from 'classnames';

import { RadioButton } from 'components/Input';

import ConfigBlock from './ConfigBlock';

type Props = {
  locale: {},
  screenSize: string,
  order: number,
  finalProduct: {
    id: string,
  },
  dispatch: () => {},
  handleSourceSelection: () => {},
  selectedSource: ?string,
};

export default class SourcesBlock extends React.Component {
  static props: Props;

  renderBlock(blockName, icon, locale) {
    const { handleSourceSelection, selectedSource } = this.props;

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
            <img src={icon} alt="Conf-Icon" />
          </div>
          <div className="app__config__creation-input">
            <RadioButton
              name="config-creation"
              id={`config-${blockName}`}
              value={blockName}
              onChange={handleSourceSelection}
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

  render() {
    const { locale, screenSize, order } = this.props;

    return (
      <ConfigBlock locale={locale} screenSize={screenSize} order={order} className="app__config__sources-block">
        <div className="app__config__creation">
          {this.renderBlock('tweak', require('assets/media/svg-wannabe/Conf-Icon1.png'), locale.online)}
          {this.renderBlock('upload', require('assets/media/svg-wannabe/Conf-Icon3.png'), locale.art)}
          {this.renderBlock('art_creation', require('assets/media/svg-wannabe/Conf-Icon2.png'), locale.hire)}
        </div>
      </ConfigBlock>
    );
  }
}
