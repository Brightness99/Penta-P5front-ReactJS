// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Link } from 'react-router-dom';
import { isMobile } from 'utils/helpers';
import Breadcrumbs from 'components/Breadcrumbs';

import { Arrow } from 'components/Icons';

import Timeline from './Timeline';
import ProductsTemplates from './ProductsTemplates';
import ChooseSettings from './ChooseSettings';
import DownloadTemplate from './DownloadTemplate';

type Props = {
  app: AppStore,
}

export class Gabaritos extends React.Component {

  static props: Props;


  renderBackLink() {
    return (
      <div className="org-links-chooseSettings">
        <Link to="#" className="atm-link"><Arrow />Voltar para escolher outro produto</Link>
      </div>
    );
  }

  renderMobile() {
    const { app: { screenSize } } = this.props;
    return (
      <div>
        <div className="container">
          { this.renderBackLink() }
          <h3 className="title-timeline">Gabaritos</h3>
          <p className="subtitle-timeline">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis consectetur purus sit amet fermentum</p>
        </div>
        <Timeline screenSize={screenSize} />
        <ProductsTemplates screenSize={screenSize} />
      </div>
    );
  }

  renderDesktop() {
    const { app: { screenSize } } = this.props;
    const breadcrumb = [
      {
        title: 'Home',
        url: '/',
      },
      {
        title: 'Gabaritos',
      },
    ];
    // <ProductsTemplates />
    // <ChooseSettings />
    // <DownloadTemplate />
    return (
      <div>
        <div className="container">
          {!isMobile(screenSize) && <Breadcrumbs links={breadcrumb} />}
          <h3 className="title-timeline">Gabaritos</h3>
          <p className="subtitle-timeline">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis consectetur purus sit amet fermentum</p>
        </div>
        <Timeline screenSize={screenSize} />
        <ProductsTemplates screenSize={screenSize} />
      </div>
    );
  }

  render() {
    const { app: { screenSize } } = this.props;
    return (
      <div>
        {
          ['xs', 'is', 'sm', 'ix', 'md', 'im'].includes(screenSize)
            ? this.renderMobile()
            : this.renderDesktop()
        }
      </div>
    );
  }
}

function mapStoreToProps(state) {
  return ({
    app: state.app,
  });
}

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStoreToProps, mapDispatchToProps)(Gabaritos);
