// @flow

import React from 'react';
import { connect } from 'react-redux';
import { shouldComponentUpdate } from 'utils/helpers';
import { SearchIcon } from 'components/Icons';
import { push } from 'modules/ReduxRouter';

type Props = {
  search: string,
  locale: {
    SEARCH_PLACEHOLDER: string,
  }
};

class SearchBar extends React.Component {
  shouldComponentUpdate = shouldComponentUpdate;

  static props: Props;

  handleSubmit = (ev) => {
    ev.preventDefault();

    push(`/buscar?q=${ev.currentTarget[0].value}`);
  };

  render() {
    const { search, locale } = this.props;

    return (
      <form
        className="mol-header-search"
        onSubmit={this.handleSubmit}
      >
        <input
          type="text"
          name="q"
          defaultValue={decodeURI(/q=([^&]+)/.exec(search) ? decodeURI(/q=([^&]+)/.exec(search)[1]) : '')}
          placeholder={`${locale.SEARCH_PLACEHOLDER}...`}
        />
        <button>
          <SearchIcon />
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  search: state.router.location.search,
  locale: state.locale.translate.header,
});

export default connect(mapStateToProps)(SearchBar);
