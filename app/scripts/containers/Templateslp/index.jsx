// @flow

import React from 'react';
import { connect } from 'react-redux';
import { shouldComponentUpdate, isMobile } from 'utils/helpers';
import Breadcrumbs from 'components/Breadcrumbs';
import ListCategory from './ListCategory';
import ListModels from './ListModels';

type Props = {
  screenSize: AppStoreType.screenSize,
  router: RouterStore,
  dispatch: () => {},
  children: any,
};

export class Templateslp extends React.Component {
  shouldComponentUpdate = shouldComponentUpdate;

  static props: Props;

  renderMobile() {
    const { screenSize } = this.props;

    return (
      <div className="container">
        <h3>Modelos de cartão de visita</h3>
        <div className="tpl-templateslp">
          <div className="btn-default btn-secondary fnt-sbold btn-sm" onClick={this.handleShowMenu}>
            Escolher categoria
          </div>
          <ListModels screenSize={screenSize} />
          <ListCategory screenSize={screenSize} />
        </div>
      </div>
    );
  }

  renderDesktop() {
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
      },
    ];
    return (
      <div className="container">
        <Breadcrumbs links={breadcrumb} />
        <h3>Modelos de cartão de visita</h3>
        <div className="tpl-templateslp">
          <ListCategory />
          <ListModels />
        </div>
      </div>
    );
  }

  render() {
    const { screenSize } = this.props;

    return isMobile(screenSize) ? this.renderMobile() : this.renderDesktop();
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return ({
    screenSize: state.app.screenSize,
  });
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(Templateslp);
