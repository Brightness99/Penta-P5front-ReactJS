// @flow
/**
 * @module Actions/Users
 * @desc Actions for Users
 */

import { SettingsConstants } from 'constants/index';

/**
 * sETTINGS Fetch
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
 * Product Fetch
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
