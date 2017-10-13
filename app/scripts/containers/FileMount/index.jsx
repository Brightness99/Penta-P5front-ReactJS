// @flow
import React from 'react';
import { connect } from 'react-redux';
import { isMobile } from 'utils/helpers';
import Breadcrumbs from 'components/Breadcrumbs';
import { fileMountFetch, fileMountItemFetch } from 'actions';

import Sidebar from './Sidebar';
import ContentText from './ContentText';

type Props = {
  app: AppStore,
  router: RouterStore,
  fileMount: {},
  dispatch: () => {},
};

export class FileMount extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fileMountFetch());
  }
  static props: Props;
  state = {
    breadcrumbTitle: '',
  }

  selectItem = (slug) => {
    const { dispatch } = this.props;
    dispatch(fileMountItemFetch(slug));
    this.setState({ breadcrumbTitle: slug });
  };

  render() {
    const { app: { screenSize } } = this.props;
    const { breadcrumbTitle } = this.state;
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
        title: breadcrumbTitle,
      },
    ];
    const { fileMount } = this.props;
    return (
      <section>
        <div className="container">
          <div className="template-file-mount">
            {!isMobile(screenSize) && <Breadcrumbs links={breadcrumb} />}
            <h2 className="title-file-mount">Montagem do arquivo</h2>
            {!isMobile(screenSize) && <p className="subtitle-file-mount">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis consectetur purus sit amet fermentum</p>}

            <div className="org-content-file-mount">
              <Sidebar screenSize={screenSize} selectItem={this.selectItem} />
              <ContentText fileMount={fileMount} />
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
    fileMount: state.fileMount,
  };
}

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(FileMount);

