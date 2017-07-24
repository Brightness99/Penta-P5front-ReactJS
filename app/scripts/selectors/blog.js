// @flow

import { createSelector } from 'reselect';

const appSelector = state => state.app;
const localeSelector = state => state.locale;
const routerSelector = state => state.router;
const blogSelector = state => state.blog;

export const blogsSelector = createSelector(
  appSelector,
  localeSelector,
  routerSelector,
  blogSelector,
  (
    app,
    locale,
    router,
    blog
  ) => ({
    app,
    locale,
    router,
    blog,
  })
);

export default blogsSelector;
