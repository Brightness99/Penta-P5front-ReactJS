// @flow

import React from 'react';
import { connect } from 'react-redux';
import { isMobile } from 'utils/helpers';
import { policyFetch } from 'actions';
import Breadcrumbs from 'components/Breadcrumbs';
import Loading from 'components/Loading';

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
    const { app: { screenSize }, policy: { policy, isRunning, isLoaded } } = this.props;
    const breadcrumb = [
      {
        title: 'Home',
        url: '/',
      },
      {
        title: 'Política de Privacidade',
      },
    ];

    if (isRunning || !isLoaded) {
      return <Loading />;
    }

    return (
      <section>
        <div className="container">
          {!isMobile(screenSize) && <Breadcrumbs links={breadcrumb} />}
          <div className="org-terms-use-privacy">
            <h2 className="title-terms-use-privacy">{policy.title}</h2>
            <div className="mol-bg-terms-use-privacy" dangerouslySetInnerHTML={{ __html: policy.content }} />
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
