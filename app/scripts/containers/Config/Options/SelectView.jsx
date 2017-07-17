// @flow

import React from 'react';
import cx from 'classnames';
import { setViewType } from 'actions';

import { BulletListIcon, GalleryIcon } from 'components/Icons';

type Props = {
  locale: LocaleSettingsViewMode,
  dispatch: () => {},
  viewType: string,
}

const SelectView = (props: Props) => {
  const handleChangeView = (ev) => {
    ev.preventDefault();

    props.dispatch(setViewType(ev.currentTarget.value));
  };

  return (
    <div className="app__config__options-view-type">
      <p>{props.locale.VIEW_MODE}:</p>
      <div className="mol-btn-group">
        <button className={cx(props.viewType === 'list' && 'active')} value="list" onClick={handleChangeView}><BulletListIcon /> {props.locale.LIST}</button>
        <button className={cx(props.viewType === 'photos' && 'active')} value="photos" onClick={handleChangeView}><GalleryIcon /> {props.locale.PHOTOS}</button>
      </div>
    </div>
  );
};

export default SelectView;
