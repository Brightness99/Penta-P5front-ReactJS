// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import ListCategory from './ListCategory';
import ListModels from './ListModels';

type Props = {
  app: AppStore,
  router: RouterStore,
  dispatch: () => {},
  children: any,
};

export class Templateslp extends React.Component {
  static props: Props;

  renderMobile() {
    return (
      <div className="">
        <p>mobile</p>
      </div>
    );
  }

  renderDesktop() {
    const { app: { screenSize } } = this.props;
    return (
      <div className="container">
        <h3>Modelos de cartão de visita</h3>
        <div className="tpl-templateslp">
          <ListCategory />
          <ListModels />
        </div>
      </div>
    );
  }

  render() {
    const { app: { screenSize } } = this.props;

    return ['xs', 'is', 'sm', 'ix', 'md', 'im'].includes(screenSize)
      ? this.renderMobile()
      : this.renderDesktop();
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

export default connect(mapStoreToProps, mapDispatchToProps)(Templateslp);
