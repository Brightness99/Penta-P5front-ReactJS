// @flow

import React from 'react';
import { push } from 'modules/ReduxRouter';
import { connect } from 'react-redux';
import Breadcrumbs from 'components/Breadcrumbs';
import { isMobile, shouldComponentUpdate } from 'utils/helpers';

declare var google: {};

type Props = {
  app: {},
  router: {
    location: {
      search: string,
    },
  },
  locale: {},
  match: {},
};


export class Search extends React.Component {
  shouldComponentUpdate = shouldComponentUpdate;

  componentDidMount() {
    this.handleCSE();
  }

  componentWillReceiveProps(newProps) {
    const newSearch = newProps.router.location.search;
    const search = this.props.router.location.search;
    if (newSearch !== search) {
      this.setSearchQuery(newSearch.replace('?q=', ''));
    }
  }

  componentWillUnmount() {
    this.removeScript();
  }

  static props: Props;

  removeScript() {
    const script = document.getElementById('gcse_printi');
    script.remove();
    /* TODO: If someone have problem with google API, please told me. @Dmitriy Boikov
     * It's dirty hack for using without reload page. Without it would be error If you leave the page and come back*/
    delete window.google;
    delete window.__gcse;
  }

  handleCSE = () => {
    window.__gcse = {
      parsetags: 'explicit',
      callback: () => {
        if (document.readyState === 'complete') {
          this.renderSearchBox();
        } else {
          google.setOnLoadCallback(() => {
            this.renderSearchBox();
          }, true);
        }
      },
    };

    const cx = '016989531617499423574:cwcw4nxwj10';
    const gcse = document.createElement('script');
    gcse.id = 'gcse_printi';
    gcse.type = 'text/javascript';
    gcse.async = true;
    gcse.src = `${document.location.protocol === 'https:' ? 'https:' : 'http:'}//www.google.com/cse/cse.js?cx=${cx}`;
    document.body.insertBefore(gcse, document.body.firstChild);
  };

  renderSearchBox() {
    google.search.cse.element.render({
      div: 'search-box',
      tag: 'searchbox',
      gname: 'search-site',
    }, {
      div: 'search-result',
      tag: 'searchresults',
      gname: 'search-site',
    });
    setTimeout(this.subscribeToQueryChanging, 1000);
  }

  subscribeToQueryChanging = () => {
    document.getElementsByClassName('gsc-search-button-v2')[0].addEventListener('click', this.queryChanged);
    document.getElementById('gsc-i-id1').addEventListener('keyup', (e) => {
      if (e.keyCode === 13) {
        this.queryChanged();
      }
    });
  };

  queryChanged = () => {
    const value = document.getElementById('gsc-i-id1').value;
    push(`./buscar?q=${value}`);
  };

  setSearchQuery(query: string) {
    google.search.cse.element.getElement('search-site').execute(query);
  }

  render() {
    const { app: { screenSize } } = this.props;
    const breadcrumb = [
      {
        title: 'Home',
        url: '/',
      },
      {
        title: 'Buscar',
      },
    ];
    return (
      <section>
        <div className="container">
          {!isMobile(screenSize) && <Breadcrumbs links={breadcrumb} />}
          <div className="org-search-page">
            <div id="search-box" />
            <div id="search-result" />
          </div>
        </div>
      </section>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    app: state.app,
    router: state.router,
    locale: state.locale,
  };
}

export default connect(mapStateToProps)(Search);
