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
};

class TemplatesSEO extends React.PureComponent<Props> {
  shouldComponentUpdate = shouldComponentUpdate;

  static props: Props;

  renderMobile() {
    const { screenSize } = this.props;

    return (
      <article className="container">
        <h3>{'Modelos de cartão de visita'}</h3>
        <section className="tpl-templateslp">
          <p className="btn-default btn-secondary fnt-sbold btn-sm" onClick={this.handleShowMenu}>
            {'Escolher categoria'}
          </p>
          <ListModels screenSize={screenSize} />
          <ListCategory screenSize={screenSize} />
        </section>
      </article>
    );
  }

  renderDesktop() {
    const { screenSize } = this.props;
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
      <article className="container">
        <Breadcrumbs links={breadcrumb} />
        <h3>{'Modelos de cartão de visita'}</h3>
        <section className="tpl-templateslp">
          <ListCategory screenSize={screenSize} />
          <ListModels screenSize={screenSize} />
        </section>
      </article>
    );
  }

  render() {
    const { screenSize } = this.props;

    return isMobile(screenSize) ? this.renderMobile() : this.renderDesktop();
  }
}

const mapStoreToProps = (state) => ({
  app: state.app,
});

export default connect(mapStoreToProps)(TemplatesSEO);
