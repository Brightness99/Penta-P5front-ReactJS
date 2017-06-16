// @flow
/**
 * @module Settings Page
 * @desc Settings Page helpers
 */

/**
 * Update selection by diff between selections
 *
 * @param {Object} prevSelection
 * @param {Object} currentSelection
 *
 * @returns {Object}
 */
export function updateSelection(prevSelection: {}, currentSelection: {}): {} {
  let hasChanged = false;

  return Object.keys(prevSelection)
    .map((part) => {
      hasChanged = false;

      return {
        key: part,
        value: Object.keys(prevSelection[part])
          .map((selection) => {
            const value = prevSelection[part][selection];

            if (prevSelection[part][selection] !== currentSelection[part][selection] && currentSelection[part][selection]) {
              hasChanged = true;
              return {
                key: selection,
                value: currentSelection[part][selection],
              };
            }

            if (hasChanged) {
              return {
                key: selection,
                value: currentSelection[part][selection] || '',
              };
            }

            return {
              key: selection,
              value,
            };
          })
          .reduce((prevValue, currentValue) => ({
            ...prevValue,
            [currentValue.key]: currentValue.value,
          }), {}),
      };
    })
    .reduce((prevValue, currentValue) => ({
      ...prevValue,
      [currentValue.key]: currentValue.value,
    }), {});
}
