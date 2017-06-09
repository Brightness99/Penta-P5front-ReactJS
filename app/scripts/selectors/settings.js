// @flow

import { createSelector } from 'reselect';

const appSelector = state => state.app;
const localeSelector = state => state.locale;
const routerSelector = state => state.router;
const productSelector = state => state.product;
const productSettingsSelector = state => state.productSettings;
const defaultCombinationCountSelector = state => state.productSettings.defaultCombinationCount;
const selectionSelector = state => state.productSettings.selection;

const optionsPartsSelector = createSelector(
  productSettingsSelector,
  (productSettings) => ({
    total: Object.keys(productSettings.calculator).length,
    names: Object.keys(productSettings.calculator).reduce((prevPart, currentPart) => {
      if (prevPart !== '') {
        return `${prevPart} e ${productSettings.calculator[currentPart].name}`;
      }
      return productSettings.calculator[currentPart].name;
    }, ''),
  })
);

const optionsListSelector = createSelector(
  productSettingsSelector,
  (productSettings) => (
    Object.keys(productSettings.optionSectionInfo)
      .map((item) => {
        let visibilityOverride = false;

        return ({
          ...productSettings.calculator[item],
          options: productSettings.optionSectionInfo[item]
            .filter((optionItem) => optionItem.visible)
            .map((optionItem, i) => {
              let visibility = visibilityOverride ? false : optionItem.visible;
              const key = i - 1;

              if (visibility && key > 0) {
                visibility =
                  optionItem.visible &&
                  productSettings.selection[item][productSettings.optionSectionInfo[item][key].key] !== '';
              }

              if (!visibility && !visibilityOverride) {
                visibilityOverride = true;
              }

              return {
                ...optionItem,
                visible: visibility,
                items: [
                  ...productSettings.calculator[item].options[optionItem.key].sort((a, b) => a.position - b.position),
                ],
              };
            }),
        });
      })
  )
);

const optionsSelector = createSelector(
  optionsPartsSelector,
  optionsListSelector,
  defaultCombinationCountSelector,
  (
    parts,
    list,
    defaultCombinationCount
  ) => ({
    parts,
    list,
    defaultCombinationCount,
  })
);

const settingsSelector = createSelector(
  appSelector,
  localeSelector,
  routerSelector,
  productSelector,
  productSettingsSelector,
  optionsSelector,
  selectionSelector,
  (
    app,
    locale,
    route,
    product,
    productSettings,
    options,
    selection
  ) => ({
    app,
    locale,
    route,
    product,
    productSettings: {
      ...productSettings,
      options,
      selection,
    },
  })
);

export default settingsSelector;
