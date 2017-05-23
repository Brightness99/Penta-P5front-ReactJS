/**
 * @module Constants/User
 * @desc User Constants
 */

import keyMirror from 'fbjs/lib/keyMirror';

/**
 * @constant {Object} SettingsConstants
 * @memberof Constants
 */
export const SettingsConstants = keyMirror({
  SETTINGS_FETCH_REQUEST: undefined,
  SETTINGS_FETCH_SUCCESS: undefined,
  SETTINGS_FETCH_FAILURE: undefined,
  SETTINGS_FETCH_CANCEL: undefined,
  SETTINGS_SOURCE_FETCH_REQUEST: undefined,
  SETTINGS_SOURCE_FETCH_SUCCESS: undefined,
  SETTINGS_SOURCE_FETCH_FAILURE: undefined,
  SETTINGS_SOURCE_FETCH_CANCEL: undefined,
});
