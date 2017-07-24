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
 * Zipcode Reset
 *
 * @returns {Object}
 */
export function settingsSourceReset(): Object {
  return {
    type: SettingsConstants.SETTINGS_SOURCE_RESET,
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

/**
 * Zipcode Reset
 *
 * @returns {Object}
 */
export function settingsZipcodeReset(): Object {
  return {
    type: SettingsConstants.SETTINGS_ZIPCODE_RESET,
  };
}

/**
 * Matrix Selection
 * @param {number} date
 * @param {number} quantity
 *
 * @returns {Object}
 */
export function settingsMatrixSelect(date: number, quantity: number = 0): Object {
  return {
    type: SettingsConstants.SETTINGS_MATRIX_SELECT_QUANTITY,
    payload: {
      date,
      quantity,
    },
  };
}

/**
 * PrePress Template Fetch
 *
 * @returns {Object}
 */
export function prePressTemplateFetch(): Object {
  return {
    type: SettingsConstants.PRE_PRESS_TEMPLATE_FETCH_REQUEST,
    payload: {},
  };
}

/**
 * Remove Part
 * @param {string} part
 *
 * @returns {Object}
 */
export function removePartSelection(part: string): Object {
  return {
    type: SettingsConstants.REMOVE_SELECTION_PART,
    payload: {
      part,
    },
  };
}

/**
 * Select Prepress Template Orientation
 * @param {string} orientation
 *
 * @returns {Object}
 */
export function selectPrepressOrientation(orientation: string): Object {
  return {
    type: SettingsConstants.SELECT_PREPRESS_ORIENTATION,
    payload: {
      orientation,
    },
  };
}

/**
 * Prepress Template Download
 * @param {string} orientation
 * @param {string} extension
 * @param {string} fileName
 *
 * @returns {Object}
 */
export function prepressDownloadFetch(orientation: string, extension: string, fileName: string): Object {
  return {
    type: SettingsConstants.PRE_PRESS_DOWNLOAD_FETCH_REQUEST,
    payload: {
      orientation,
      extension,
      fileName,
    },
  };
}
