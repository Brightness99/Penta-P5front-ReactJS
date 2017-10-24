// @flow

import React from 'react';
import { connect } from 'react-redux';
import { shouldComponentUpdate } from 'utils/helpers';
import { SearchIcon } from 'components/Icons';
import { push } from 'modules/ReduxRouter';

type Props = {
  router: {
    location: {
      search: string,
    },
  }
};

type State = {
  isFocused: boolean,
  isValid: boolean,
  dirty: boolean,
  value: string,
};

class SearchBar extends React.Component {
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

  componentDidMount() {
    const search = this.props.router.location.search;
    this.setSearchQuery(search.replace('?q=', ''));
  }

  componentWillReceiveProps(newProps) {
    const newSearch = newProps.router.location.search;
    const search = this.props.router.location.search;
    if (newSearch !== search) {
      this.setSearchQuery(newSearch.replace('?q=', ''));
    }
  }

  static props: Props;

  static state: State;

  setSearchQuery(query: string) {
    this.setState({
      value: query,
    });
  }

  handleChange = (ev) => {
    this.setSearchQuery(ev.currentTarget.value);
  };

  handleSubmit = (ev) => {
    const { value } = this.state;
    ev.preventDefault();

    push(`./buscar?q=${value}`);
  };

  render() {
    const { value } = this.state;

    return (
      <form
        className="mol-header-search"
        onSubmit={this.handleSubmit}
      >
        <input
          type="text"
          name="q"
          value={value}
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

const mapStateToProps = (state) => ({
  router: state.router,
});

export default connect(mapStateToProps)(SearchBar);
