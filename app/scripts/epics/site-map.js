/**
 * @module Epics/SiteMap
 * @desc User
 */
import { getUnixtime, rxAjax } from 'utils';
import { AppConstants, SiteMapConstants } from 'constants/index';

export function siteMapFetch(action$) {
  return action$.ofType(SiteMapConstants.SITE_MAP_FETCH_REQUEST)
    .switchMap(() => {
      const endpoint = '/v2/pages/sitemap-items';

      return rxAjax({
        endpoint,
        payload: {},
        method: 'GET',
      })
        .map(data => ({
          type: SiteMapConstants.SITE_MAP_FETCH_SUCCESS,
          payload: data.response,
          meta: { updatedAt: getUnixtime() },
        }))
        .takeUntil(action$.ofType(AppConstants.CANCEL_FETCH))
        .defaultIfEmpty({ type: SiteMapConstants.SITE_MAP_FETCH_CANCEL })
        .catch(error => [
          {
            type: SiteMapConstants.SITE_MAP_FETCH_FAILURE,
            payload: { message: error.message, status: error.status },
            meta: { updatedAt: getUnixtime() },
          },
        ]);
    });
}
