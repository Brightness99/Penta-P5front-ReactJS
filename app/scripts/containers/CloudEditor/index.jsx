// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Arrow } from 'components/Icons';
import { isMobile } from 'utils/helpers';
import Breadcrumbs from 'components/Breadcrumbs';

type Props = {
  app: AppStore,
  router: RouterStore,
  dispatch: () => {},
};

export class CloudEditor extends React.Component {
  static props: Props;

  render() {
    const { app: { screenSize } } = this.props;
    const breadcrumb = [
      {
        title: 'Home',
        url: '/',
      },
      {
        title: 'Configure',
        url: '/configure',
      },
      {
        title: 'Escolha seu modelo',
        url: '/escolha-modelo',
      },
      {
        title: 'Editor',
      },
    ];

    return (
      <section>
        <div className="container">
          {!isMobile(screenSize) && <Breadcrumbs links={breadcrumb} />}
          <div className="org-editor-cloud">
            <div className="mol-title-link-editor-cloud">
              <h2 className="title-editor-cloud">Editor</h2>
              <Link to="#" className="backLink-editor-cloud"><Arrow />voltar</Link>
            </div>
            <div className="mol-content-editor-cloud" />
          </div>
        </div>
      </section>
    );
  }
}

/* istanbul ignore next */
function mapStoreToProps(state) {
  return ({
    app: state.app,
  });
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStoreToProps, mapDispatchToProps)(CloudEditor);
