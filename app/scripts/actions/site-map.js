// @flow
/**
 * @module Actions/Users
 * @desc Actions for Users
 */

import { SiteMapConstants } from 'constants/index';

/**
 * SiteMap Fetch
 *
 * @returns {Object}
 */
export function siteMapFetch(): Object {
  return {
    type: SiteMapConstants.SITE_MAP_FETCH_REQUEST,
    payload: { },
  };
}
