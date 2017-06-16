// @flow

/**
 * @module Constants/App
 * @desc App Constants
 */

import keyMirror from 'fbjs/lib/keyMirror';

/**
 * @constant {Object} AppConstants
 * @memberof Constants
 */
export const AppConstants = keyMirror({
  HIDE_ALERT: undefined,
  SHOW_ALERT: undefined,
  UPDATE_BROWSER_OPTIONS: undefined,
  UPDATE_CONFIG_VIEW_TYPE: undefined,
  CANCEL_FETCH: undefined,
});

/**
 * @constant {Object} XHR
 */
export const XHR = keyMirror({
  SUCCESS: undefined,
  FAIL: undefined,
});

/**
 * @constant {string} LOCATION_CHANGE
 */
export const LOCATION_CHANGE = '@@router/LOCATION_CHANGE';
