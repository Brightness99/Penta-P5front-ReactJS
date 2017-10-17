// @flow

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import GlossaryList from './GlossaryList';
import GlossaryDetails from './GlossaryDetails';

export default class Glossary extends React.Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/glossario"
          component={GlossaryList}
        />
        <Route
          path="/glossario/:slug"
          component={GlossaryDetails}
        />
      </Switch>
    );
  }
}
