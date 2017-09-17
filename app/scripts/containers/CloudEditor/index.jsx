// @flow
import React from 'react';
import { connect } from 'react-redux';

type Props = {
  app: AppStore,
  router: RouterStore,
  dispatch: () => {},
  children: any,
};

class CloudEditor extends React.Component {
  static props: Props;

  render() {
    return (
      <p> editor</p>
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
