// @flow

import React from 'react';
import { AddFileIcon, AddTextIcon } from 'components/Icons';

type Props = {
  handleSelectTab: (value: number) => void
}

type State = {
  activeTab: number,
}

export default class TopMenuBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 1,
    };
  }

  props: Props;
  state: State;

  handleSelectTab(value: number) {
    this.setState({
      activeTab: value,
    });
    this.props.handleSelectTab(value);
  }

  render() {
    const { activeTab } = this.state;

    return (
      <div className="upload__canvas-schema__top-menu-bar">
        <button
          className={`top-menu-bar_btn ${activeTab === 1 ? 'active' : ''}`}
          onClick={() => this.handleSelectTab(1)}
        >
          <AddFileIcon />
          <span>Arquivos</span>
        </button>
        <button
          className={`top-menu-bar_btn ${activeTab === 2 ? 'active' : ''}`}
          onClick={() => this.handleSelectTab(2)}
        >
          <AddTextIcon />
          <span>Textos</span>
        </button>
      </div>
    );
  }
}
