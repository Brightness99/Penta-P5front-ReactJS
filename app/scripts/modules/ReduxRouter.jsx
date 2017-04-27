// @flow

import React, { Element } from 'react';
import { Router } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import { LOCATION_CHANGE } from '../constants/index';


export const history = createBrowserHistory();

type Props = {
  children: typeof Element,
  dispatch: () => {},
}

class ReduxRouter extends React.Component {
  componentDidMount() {
    this.unsubscribe = history.listen(this.handleLocationChange);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  unsubscribe: () => {};

  static props: Props;

  handleLocationChange = (location: {}, action: typeof LOCATION_CHANGE) => {
    const { dispatch } = this.props;

    dispatch({
      type: LOCATION_CHANGE,
      location,
      action,
    });
  };

  render() {
    const { children } = this.props;

    return (
      <Router history={history}>
        {children}
      </Router>
    );
  }
}

export const { push, replace, go, goBack, goForward } = history;

export default ReduxRouter;
