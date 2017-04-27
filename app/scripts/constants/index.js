// @flow
/**
 * @namespace Constants
 * @desc App constants
 */

import keyMirror from 'fbjs/lib/keyMirror';

/**
 * @constant {Object} ActionTypes
 * @memberof Constants
 */
export const ActionTypes: Object = keyMirror({
  SHOW_ALERT: undefined,
  HIDE_ALERT: undefined,
});

/**
 * @constant {Object} XHR
 * @memberof Constants
 */
export const XHR: Object = keyMirror({
  SUCCESS: undefined,
  FAIL: undefined,
});

/**
 * @constant {string} LOCATION_CHANGE
 */
export const LOCATION_CHANGE: string = '@@router/LOCATION_CHANGE';
