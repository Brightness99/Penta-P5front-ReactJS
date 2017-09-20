// @flow
import React from 'react';
import { connect } from 'react-redux';
import { isMobile } from 'utils/helpers';
import Breadcrumbs from 'components/Breadcrumbs';

import Sidebar from './Sidebar';
import ContentText from './ContentText';

type Props = {
  app: AppStore,
  router: RouterStore,
  locale: {},
  dispatch: () => {},
};

export class FileMount extends React.Component {

  static props: Props;

  render() {
    const { app: { screenSize } } = this.props;

    const breadcrumb = [
      {
        title: 'Home',
        url: '/',
      },
      {
        title: 'Montagem do arquivo',
        url: '/montagem-do-arquivo',
      },
      {
        title: 'Como criar seu arquivo para impressão no illustrator',
      },
    ];

    return (
      <section>
        <div className="container">
          <div className="template-file-mount">
            {!isMobile(screenSize) && <Breadcrumbs links={breadcrumb} />}
            <h2 className="title-file-mount">Montagem do arquivo</h2>
            {!isMobile(screenSize) && <p className="subtitle-file-mount">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis consectetur purus sit amet fermentum</p>}

            <div className="org-content-file-mount">
              <Sidebar screenSize={screenSize} />
              {!isMobile(screenSize) && <ContentText />}
            </div>

          </div>
        </div>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return { app: state.app };
}

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(FileMount);

