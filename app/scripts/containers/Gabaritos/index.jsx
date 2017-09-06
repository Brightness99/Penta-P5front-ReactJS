// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import Breadcrumbs from 'components/Breadcrumbs';

import Timeline from './Timeline';
import ProductsTemplates from './ProductsTemplates';
import ChooseSettings from './ChooseSettings';
import DownloadTemplate from './DownloadTemplate';

type Props = {
  app: AppStore,
}

export class Gabaritos extends React.Component {

  static props: Props;

  render() {
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
    return (
      <div>
        <div className="container">
          <Breadcrumbs links={breadcrumb} />
          <h3 className="title-timeline">Gabaritos</h3>
          <p className="subtitle-timeline">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis consectetur purus sit amet fermentum</p>
        </div>
        <Timeline screenSize={screenSize} />
        <DownloadTemplate />
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
