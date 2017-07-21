// @flow

import { createSelector } from 'reselect';

const appSelector = state => state.app;
const localeSelector = state => state.locale;
const routerSelector = state => state.router;
const productSelector = state => state.product;
const productSettingsSelector = state => state.productSettings;
const defaultCombinationCountSelector = state => state.productSettings.defaultCombinationCount;
const selectionSelector = state => state.productSettings.selection;
const userSelector = state => state.user;

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

const optionsFilledSelector = createSelector(
  selectionSelector,
  (selection) => {
    if (Object.keys(selection) <= 0) {
      return false;
    }

    let optionsReady = true;

    Object.keys(selection)
      .forEach((partKey) => {
        Object.keys(selection[partKey])
          .forEach((selectionItem) => {
            optionsReady = selection[partKey][selectionItem] ? optionsReady : false;
          });
      });
    return optionsReady;
  }
);

const configSelector = createSelector(
  productSettingsSelector,
  optionsFilledSelector,
  (
    productSettings,
    optionsFilled
  ) => ({
    ...productSettings.config,
    isFulfilled: {
      source: !!productSettings.source.selectedSource,
      options: optionsFilled,
    },
  })
);

const settingsPageSelector = createSelector(
  appSelector,
  localeSelector,
  routerSelector,
  productSelector,
  userSelector,
  productSettingsSelector,
  optionsSelector,
  selectionSelector,
  optionsFilledSelector,
  configSelector,
  (
    app,
    locale,
    route,
    product,
    user,
    productSettings,
    options,
    selection,
    optionsFilled,
    config
  ) => ({
    app,
    locale,
    route,
    product,
    user,
    productSettings: {
      ...productSettings,
      options,
      selection,
      config,
    },
  })
);

export default settingsPageSelector;
