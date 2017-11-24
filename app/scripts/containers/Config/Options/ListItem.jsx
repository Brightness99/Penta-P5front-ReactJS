// @flow

import React from 'react';
import cx from 'classnames';

import { RadioButton } from 'components/Input';
import { SearchPlusIcon } from 'components/Icons';

type Props = {
  item: {
    id: string,
    imageSmall: string,
    name: string,
  },
  viewType: string,
  optionKey: string,
  checked: boolean,
  partId: string,
  onSelect: () => {},
  onZoomClick: () => {},
  enableZoom: boolean,
};

const ListItem = (props: Props) => {
  const handleClick = (ev) => {
    const { onZoomClick } = props;

    if (typeof onZoomClick === 'function') {
      onZoomClick(ev);
    }
  };

  return (
    <li>
      {props.viewType === 'photos' && props.enableZoom && <button
        onClick={handleClick}
        name={props.optionKey}
        value={props.item.id}
        className="app__zoom__open"
      >
        <SearchPlusIcon />
      </button>}
      <label className={cx(props.checked && 'app__config__option--selected')}>
        {props.viewType === 'photos' &&
        <img src={`https://www.printi.com.br${props.item.imageSmall}`} alt="not-found" />}
        <div className="app__config__options-input">
          <RadioButton
            name={props.optionKey}
            value={props.item.id}
            checked={props.checked}
            onChange={props.onSelect}
          />
          {props.item.name}
        </div>
      </label>
    </li>
  );
};

export default ListItem;
