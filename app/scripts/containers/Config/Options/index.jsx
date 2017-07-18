// @flow

import React from 'react';
import cx from 'classnames';
import SVG from 'react-inlinesvg';
import { Accordion, AccordionItem } from 'components/Accordion';

import { removePartSelection } from 'actions';

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

  handlePartRemove = (part: string) => {
    console.log('handlePartRemove');
    const { selection, dispatch } = this.props;

    dispatch(removePartSelection(part, selection));
  };

  renderOption(optionsList) {
    const { viewType, selection, onSelect } = this.props;

    return (
      <div>
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

  renderOptionList() {
    const { options: { parts, list } } = this.props;
    console.log(list);
    if (parts.total === 1) {
      return (
        <div className="app__config__options-listing">
          {this.renderOption(list[0])}
        </div>
      );
    }
    return (
      <Accordion className="app__config__options-listing">
        {list.map((item, index) => (
          <AccordionItem key={item.id}>
            <h3>
              {item.name}
              {index > 0 &&
                <span
                  role="link"
                  onClick={(ev) => {
                    ev.stopPropagation();
                    return this.handlePartRemove(item.id);
                  }}
                >
                  Remover
                </span>
              }
            </h3>
            {this.renderOption(item)}
          </AccordionItem>
        ))}
      </Accordion>
    );
  }

  render() {
    const { viewType, locale, options: { parts }, dispatch, order, screenSize } = this.props;

    return (
      <ConfigBlock
        order={order}
        locale={locale}
        screenSize={screenSize}
        button={<button className="app__config__block-header__button">Me ajude a configurar</button>}
        className="app__config__options-block"
      >
        <div className="app__config__options">
          <PartsLabel locale={locale} total={parts.total} names={parts.names} />
          <SelectView locale={locale} dispatch={dispatch} viewType={viewType} />
          {this.renderOptionList()}
        </div>
      </ConfigBlock>
    );
  }
}
