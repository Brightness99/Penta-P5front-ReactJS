// @flow

import { createSelector } from 'reselect';

const appSelector = state => state.app;
const localeSelector = state => state.locale;
const routerSelector = state => state.router;
const productSelector = state => state.product;
const productSettingsSelector = state => state.productSettings;

const optionsSelector = createSelector(
  productSettingsSelector,
  (productSettings) => ({
    parts: {
      total: productSettings.settings.options.list.length,
      names: productSettings.settings.options.list.reduce((prevPart, currentPart) => {
        if (prevPart !== '') {
          return `${prevPart} e ${currentPart.name}`;
        }
        return currentPart.name;
      }, ''),
    },
    defaultCombinationCount: productSettings.settings.options.defaultCombinationCount,
  })
);

const settingsSelector = createSelector(
  appSelector,
  localeSelector,
  routerSelector,
  productSelector,
  productSettingsSelector,
  optionsSelector,
  (
    app,
    locale,
    route,
    product,
    productSettings,
    options,
  ) => ({
    app,
    locale,
    route,
    product,
    productSettings,
    options,
  })
);

export default settingsSelector;
