// @flow

import React from 'react';
import { connect } from 'react-redux';
import Breadcrumbs from 'components/Breadcrumbs';
import { isMobile, shouldComponentUpdate } from 'utils/helpers';

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

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    
    if (nextProps.router.location.search !== this.props.router.location.search) {
      document.querySelector('#gcse_printi').parentElement.removeChild(document.querySelector('#gcse_printi'));
      this.handleCSE();
    }
  }

  static props: Props;

  handleCSE = () => {
    const cx = '016989531617499423574:cwcw4nxwj10';
    const gcse = document.createElement('script');
    gcse.id = 'gcse_printi';
    gcse.type = 'text/javascript';
    gcse.async = true;
    gcse.src = `${document.location.protocol === 'https:' ? 'https:' : 'http:'}//www.google.com/cse/cse.js?cx=${cx}`;
    const s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(gcse, s);
  };

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
            {React.createElement('gcse:searchbox-only', {
              resultsUrl: '/buscar',
              queryParameterName: 'q',
              autoCompleteMatchType: 'any',
              enableAutoComplete: 'true',
            })}
            {React.createElement('gcse:searchresults-only', {
              linkTarget: '_self',
              queryParameterName: 'q',
            })}
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
