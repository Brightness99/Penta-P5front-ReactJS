// @flow

import React from 'react';
import cx from 'classnames';

import { RadioButton } from 'components/Input';
import { SearchPlusIcon } from 'components/Icons';

type Props = {
  item: {
    id: string,
    image_small: string,
    name: string,
  },
  viewType: string,
  optionKey: string,
  checked: boolean,
  onSelect: () => {},
};

const ListItem = (props: Props) => {
  const handleClick = (ev) => {
    console.log(1123);
  };

  return (
    <li>
      {props.viewType === 'photos' && <button onClick={handleClick} className="app__zoom__open">
        <SearchPlusIcon />
      </button>}
      <label className={cx(props.checked && 'app__config__option--selected')}>
        {props.viewType === 'photos' &&
        <img src={`https://www.printi.com.br${props.item.image_small}`} alt="not-found" />}
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
