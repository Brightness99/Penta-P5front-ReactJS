// @flow
/**
 * @module Actions/Users
 * @desc Actions for Users
 */

import { SettingsConstants } from 'constants/index';

/**
 * Settings Fetch
 * @param {string} slug
 *
 * @returns {Object}
 */
export function settingsFetch(slug: string): Object {
  return {
    type: SettingsConstants.SETTINGS_FETCH_REQUEST,
    payload: {
      slug,
    },
  };
}

/**
 * Sources Fetch
 * @param {string} id
 * @param {string} source
 *
 * @returns {Object}
 */
export function settingsSourceFetch(id: string, source: string): Object {
  return {
    type: SettingsConstants.SETTINGS_SOURCE_FETCH_REQUEST,
    payload: {
      id,
      source,
    },
  };
}

/**
 * Options Fetch
 * @param {Object} selection
 *
 * @returns {Object}
 */
export function settingsOptionsFetch(selection: {}): Object {
  return {
    type: SettingsConstants.SETTINGS_OPTIONS_FETCH_REQUEST,
    payload: selection,
  };
}

/**
 * Matrix Fetch
 * @param {number} zipcode
 *
 * @returns {Object}
 */
export function settingsMatrixFetch(zipcode: number): Object {
  return {
    type: SettingsConstants.SETTINGS_ZIPCODE_FETCH_REQUEST,
    payload: {
      zipcode,
    },
  };
}
