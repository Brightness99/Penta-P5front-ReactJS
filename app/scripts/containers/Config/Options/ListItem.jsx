// @flow

import React from 'react';
import { RadioButton } from 'components/Input';

type Props = {
  item: {
    id: string,
    image_small: string,
    name: string,
  },
  viewType: string,
  optionKey: string,
};

const ListItem = (props: Props) => (
  <li>
    <label>
      {props.viewType === 'gallery' && <img src={`https://www.printi.com.br${props.item.image_small}`} alt="not-found" />}
      <div className="app__config__options-input">
        <RadioButton name={props.optionKey} value={props.item.id} />
        {props.item.name}
      </div>
    </label>
  </li>
);

export default ListItem;
