// @flow

import React from 'react';
import { Router } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import type ReactElement from 'react';

import { LOCATION_CHANGE } from '../constants/index';


export const history = createBrowserHistory();

type Props = {
  children: ReactElement,
  dispatch: () => {},
}

class ReduxRouter extends React.Component {
  componentDidMount() {
    this.unsubscribe = history.listen(this.handleLocationChange);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  static props: Props;

  handleLocationChange = (location, action) => {
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
