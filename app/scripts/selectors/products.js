// @flow

import { createSelector } from 'reselect';

const appSelector = state => state.app;
const localeSelector = state => state.locale;
const routerSelector = state => state.router;
const productSelector = state => state.products;

export const productsSelector = createSelector(
  appSelector,
  localeSelector,
  routerSelector,
  productSelector,
  (
    app,
    locale,
    router,
    products
  ) => ({
    app,
    locale,
    router,
    products,
  })
);

export default productsSelector;
