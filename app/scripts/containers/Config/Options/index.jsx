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
  options: {},
  selection: {},
  onSelect: () => {},
};

export default class OptionsBlock extends React.Component {
  static defaultProps = {
    viewType: 'gallery',
  };

  static props: Props;

  renderOptionList(optionsList) {
    const { viewType, options: { parts }, selection, onSelect } = this.props;
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
                <h4>
                  {option.name}
                </h4>
                <div className="app__config__options-header__youtube">
                  <SVG src={require('assets/media/svg/icon_video.svg')} /> Vídeo explicativo
                </div>
              </div>
              <ul className="app__config__options-body">
                {option.items.map((optionItem) => (
                  <ListItem
                    item={optionItem}
                    viewType={viewType}
                    key={optionItem.id}
                    optionKey={`${optionsList.id}-${option.key}`}
                    checked={optionItem.id === selection[optionsList.id][option.key]}
                    onSelect={onSelect}
                  />
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  render() {
    const { locale, options: { parts, list }, dispatch, order } = this.props;

    return (
      <ConfigBlock
        order={order}
        locale={locale}
        button={<button className="app__config__block-header__button">Me ajude a configurar</button>}
        className="app__config__options-block"
      >
        <div className="app__config__options">
          <PartsLabel total={parts.total} names={parts.names} />
          <SelectView dispatch={dispatch} />
          {list.map((item) => this.renderOptionList(item))}
        </div>
      </ConfigBlock>
    );
  }
}
