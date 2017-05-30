// @flow

import React from 'react';
import { setViewType } from 'actions';

type Props = {
  dispatch: () => {},
}

const SelectView = (props: Props) => {
  const handleChangeView = (ev) => {
    ev.preventDefault();

    props.dispatch(setViewType({ viewType: ev.target.value }));
  };

  return (
    <div className="app__config__view-type">
      <button value="list" onClick={handleChangeView}>List</button>
      <button value="gallery" onClick={handleChangeView}>Gallery</button>
    </div>
  );
};

export default SelectView;
