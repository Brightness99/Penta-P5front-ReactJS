// @flow

/**
 * Helper functions
 * @module Helpers
 */

import shallowEqual from 'fbjs/lib/shallowEqual';

/**
 * shouldComponentUpdate with context
 *
 * @param {Object} instance
 * @param {Object} nextProps
 * @param {Object} nextState
 * @param {Object} nextContext
 *
 * @returns {boolean}
 */
export function shouldComponentUpdate(instance: Object, nextProps: Object, nextState: Object, nextContext: Object) {
  return !shallowEqual(instance.props, nextProps)
    || !shallowEqual(instance.state, nextState)
    || !shallowEqual(instance.context, nextContext);
}

/**
 * Get Unix timestamp in seconds.
 *
 * @returns {number}
 */
export function getUnixtime(): number {
  return Math.floor(Date.now() / 1000);
}

/**
 * Generate reducer.
 *
 * @param {Object} initialState
 * @param {Object} handlers
 * @returns {function}
 */
export function createReducer(initialState: Object, handlers: Object) {
  return function reducer(state: Object = initialState, action: Object) {
    if ({}.hasOwnProperty.call(handlers, action.type)) {
      return handlers[action.type](state, action);
    }

    return state;
  };
}

/**
 * Create request types for contants
 * @param {string} base
 * @returns {Object}
 */
export function createRequestTypes(base: string) {
  return ['REQUEST', 'SUCCESS', 'FAILURE'].reduce((acc, type) => {
    acc[type] = `${base}_${type}`;
    return acc;
  }, {});
}

/**
 * Convert data attributes to Object
 * @param {Element} elem
 * @returns {{}}
 */
export function datasetToObject(elem: Element) {
  const data = {};
  [].forEach.call(elem.attributes, attr => {
    /* istanbul ignore else */
    if (/^data-/.test(attr.name)) {
      const camelCaseName = attr.name.substr(5).replace(/-(.)/g, ($0, $1) => $1.toUpperCase());
      data[camelCaseName] = attr.value;
    }
  });
  return data;
}

/**
 * Get screen size breakpoint
 * @returns {string}
 */
export function getScreenSize() {
  const windowWidth = window.innerWidth;
  let screenSize = 'xs';

  /* istanbul ignore next */
  if (windowWidth >= 1920) {
    screenSize = 'xxxl';
  } else if (windowWidth >= 1440) {
    screenSize = 'xxl';
  } else if (windowWidth >= 1280) {
    screenSize = 'xl';
  } else if (windowWidth >= 1024) {
    screenSize = 'lg';
  } else if (windowWidth >= 880) {
    screenSize = 'im';
  } else if (windowWidth >= 768) {
    screenSize = 'md';
  } else if (windowWidth >= 600) {
    screenSize = 'is';
  } else if (windowWidth >= 480) {
    screenSize = 'sm';
  } else if (windowWidth >= 400) {
    screenSize = 'ix';
  }

  return screenSize;
}
