// @flow

import React from 'react';
import cx from 'classnames';
import SVG from 'react-inlinesvg';

import ConfigBlock from 'containers/Config/ConfigBlock';

import PartsLabel from './PartsLabel';
import SelectView from './SelectView';
import ListItem from './ListItem';

type Props = {
  locale: {},
  viewType?: string,
  screenSize: string,
  order: number,
  dispatch: () => {},
  options: {}
};

type State = {
  format: string,
};

export default class OptionsBlock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      format: '',
    };
  }

  static defaultProps = {
    viewType: 'gallery',
  };

  static props: Props;

  static state: State;

  renderOptionList(optionsList) {
    const { viewType, options: { parts } } = this.props;
    let header = null;

    if (parts.total > 1) {
      header = <div>{optionsList.name}</div>;
    }
    return (
      <div key={optionsList.id}>
        <h3>{header}</h3>
        <ul className={cx(viewType === 'list' && 'app__config__options--show-list')}>
          {optionsList.options.filter((option) => option.visible).map((option) => (
            <li key={option.key}>
              <div className="app__config__options-header">
                <h3>
                  {option.name}
                </h3>
                <div className="app__config__options-header__youtube">
                  <SVG src={require('assets/media/svg/icon_video.svg')} /> Vídeo explicativo
                </div>
              </div>
              <ul className="app__config__options-body">
                {option.items.map((optionItem) => (
                  <ListItem item={optionItem} viewType={viewType} key={optionItem.id} optionKey={option.key} />
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  renderBlock() {
    const { options: { parts, list }, dispatch } = this.props;

    return (
      <div className="app__config__options">
        <PartsLabel total={parts.total} names={parts.names} />
        <SelectView dispatch={dispatch} />
        {list.map((item) => this.renderOptionList(item))}
      </div>
    );
  }

  render() {
    const { locale } = this.props;

    return (
      <ConfigBlock
        order="2"
        locale={locale}
        button={<button className="app__config__block-header__button">Me ajude a configurar</button>}
        className="app__config__options-block"
      >
        {this.renderBlock()}
      </ConfigBlock>
    );
  }
}
