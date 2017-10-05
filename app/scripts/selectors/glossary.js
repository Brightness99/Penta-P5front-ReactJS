// @flow

import { createSelector } from 'reselect';

const availableIndexesSelector = state => state.glossary.glossary.availableIndexes;
const glossarySelector = state => state.glossary.glossary.items;
const glossaryFilterQuerySelector = state => state.glossary.glossaryFiler.query;

const filteredGlossarySelector = createSelector(
  availableIndexesSelector,
  glossarySelector,
  glossaryFilterQuerySelector,
  (indexes, glossary, query) => {
    const availableIndexes = indexes.filter(x => x === query || query === '');
    const result = [];

    availableIndexes.forEach(x => {
      result.push({
        key: x,
        value: glossary.filter(y => y.index === x),
      });
    });

    return result;
  }
);

export default filteredGlossarySelector;
