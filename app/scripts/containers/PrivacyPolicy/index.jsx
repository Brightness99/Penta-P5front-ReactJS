// @flow

import React from 'react';
import { connect } from 'react-redux';
import { isMobile } from 'utils/helpers';
import { policyFetch } from 'actions';
import Breadcrumbs from 'components/Breadcrumbs';

type Props = {
  app: AppStore,
  router: RouterStore,
  locale: {},
  policy: {},
  dispatch: () => {},
};

export class PrivacyPolicy extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(policyFetch());
  }

  static props: Props;

  render() {
    const { app: { screenSize }, policy } = this.props;
    const breadcrumb = [
      {
        title: 'Home',
        url: '/',
      },
      {
        title: 'Política de Privacidade',
      },
    ];
    console.log('policy ===> ', policy);
    return (
      <section>
        <div className="container">
          {!isMobile(screenSize) && <Breadcrumbs links={breadcrumb} />}
          <div className="org-terms-use-privacy">
            <h2 className="title-terms-use-privacy">{policy.policy.title}</h2>
            <div className="mol-bg-terms-use-privacy">
              <div dangerouslySetInnerHTML={{ __html: policy.policy.content }} />
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
    policy: state.policy,
 };
}

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(PrivacyPolicy);
