// @flow
import React from 'react';

type Props = {
  activeTab: number,
}

const SideBarPanel = ({ activeTab }: Props) => (
  <section className="upload__canvas-schema_sidebar-container">
    <section className="side-bar__content">
      <section
        className={`side-bar__tabs__item-container ${activeTab === 1 ? 'active' : ''}`}
      >
        <div className="side-image-bar__button-container" />
        <div className="dcl-widget-upload-list" />
      </section>
      <section
        className={`side-bar__tabs__item-container ${activeTab === 2 ? 'active' : ''}`}
      >
        <div className="add-text-button" />
        <div className="side-bar__text-container" />
      </section>
    </section>
  </section>
);

export default SideBarPanel;
