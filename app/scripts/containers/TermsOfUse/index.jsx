// @flow

import React from 'react';
import { connect } from 'react-redux';
import { termsFetch } from 'actions';
import { Link } from 'react-router-dom';
import { isMobile } from 'utils/helpers';
import Breadcrumbs from 'components/Breadcrumbs';

type Props = {
  app: AppStore,
  router: RouterStore,
  locale: {},
  terms: {},
  dispatch: () => {},
};

export class TermsOfUse extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(termsFetch());
  }

  static props: Props;

  createMarkup = (str) => {
    return { __html: str };
  }

  render() {
    const { app: { screenSize } } = this.props;
    const { terms } = this.props;
    console.log('Terms of Use =========>', terms);
    const breadcrumb = [
      {
        title: 'Home',
        url: '/',
      },
      {
        title: 'Termos de Uso',
      },
    ];
    
    return (
      <section>
        <div className="container">
          {!isMobile(screenSize) && <Breadcrumbs links={breadcrumb} />}
          <div className="org-terms-use-privacy">
            <h2 className="title-terms-use-privacy">{terms.terms.title}</h2>
            <div className="mol-bg-terms-use-privacy">
              <div dangerouslySetInnerHTML={this.createMarkup(terms.terms.content)} />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    app: state.app,
    terms: state.terms,
  };
}

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(TermsOfUse);
