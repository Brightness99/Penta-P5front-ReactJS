// @flow

import React from 'react';
import { shouldComponentUpdate } from 'utils/helpers';
import { SearchIcon } from 'components/Icons';
import { push } from 'modules/ReduxRouter';

type Props = {
};

type State = {
  isFocused: boolean,
  isValid: boolean,
  dirty: boolean,
  value: string,
};

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocused: false,
      isValid: false,
      dirty: false,
      value: '',
    };
  }

  shouldComponentUpdate = shouldComponentUpdate;

  static props: Props;

  static state: State;

  handleChange = (ev) => {
    this.setState({
      value: ev.currentTarget.value,
    });
  };

  handleSubmit = (ev) => {
    const { value } = this.state;
    ev.preventDefault();

    push(`./buscar?q=${value}`);
  };

  render() {
    return (
      <form
        className="mol-header-search"
        onSubmit={this.handleSubmit}
      >
        <input
          type="text"
          name="q"
          placeholder="Procure por produtos ou informações..."
          onChange={this.handleChange}
        />
        <button onClick={this.handleSubmit}>
          <SearchIcon />
        </button>
      </form>
    );
  }
}
