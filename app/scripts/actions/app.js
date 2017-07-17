// @flow

/**
 * @module Actions/App
 * @desc App Actions
 */
import { AppConstants, LOCATION_CHANGE } from 'constants/index';

/**
 * Change route path.
 *
 * @param {string} pathname
 * @param {Object} [options]
 * @param {string} [options.param]
 * @param {string} [options.query]
 * @param {Object} [options.state]
 *
 * @returns {function}
 */
export function goTo(pathname: string, options: Object = {}) {
  return {
    type: LOCATION_CHANGE,
    action: 'PUSH',
    location: {
      pathname,
      search: options.search,
      state: options.state,
    },
  };
}

/**
 * Show a message.
 *
 * @param {string} status - Message type: success, warning, error, info.
 * @param {string} message
 * @param {boolean} withTimeout - Should close after a while.
 *
 * @returns {Object}
 */
export function showAlert(status: string, message: string, withTimeout: boolean = true) {
  return {
    type: AppConstants.SHOW_ALERT,
    status,
    message,
    withTimeout,
  };
}

/**
 * Hide message.
 *
 * @returns {Object}
 */
export function hideAlert() {
  return {
    type: AppConstants.HIDE_ALERT,
  };
}

/**
 * Update browser options.
 *
 * @param {Object} payload
 * @param {boolean} initial
 * @returns {Object}
 */
export function updateBrowserOptions(payload: Object, initial: boolean = false): Object {
  return {
    type: AppConstants.UPDATE_BROWSER_OPTIONS,
    payload,
    meta: { initial },
  };
}

/**
 * Update Config View.
 *
 * @param {Object} viewType
 * @returns {Object}
 */
export function setViewType(viewType: string): Object { // TODO: migrate this to settings actions
  return {
    type: AppConstants.UPDATE_CONFIG_VIEW_TYPE,
    payload: {
      viewType,
    },
  };
}
