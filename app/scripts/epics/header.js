/**
 * @module Epics/User
 * @desc User
 */
import { getUnixtime, rxAjax } from 'utils';
import { AppConstants, HeaderConstants } from 'constants/index';

export function productCategoriesFetch(action$) {
  return action$.ofType(HeaderConstants.HEADER_PRODUCT_CATEGORIES_FETCH_REQUEST)
    .switchMap(() => {
      const endpoint = '/v2/categories/header';

      return rxAjax({
        endpoint,
        payload: { },
        method: 'GET',
      })
        .map(data => ({
          type: HeaderConstants.HEADER_PRODUCT_CATEGORIES_FETCH_SUCCESS,
          payload: data.response,
          meta: { updatedAt: getUnixtime() },
        }))
        .takeUntil(action$.ofType(AppConstants.CANCEL_FETCH))
        .defaultIfEmpty({ type: HeaderConstants.HEADER_PRODUCT_CATEGORIES_FETCH_CANCEL })
        .catch(error => [
          {
            type: HeaderConstants.HEADER_PRODUCT_CATEGORIES_FETCH_FAILURE,
            payload: { message: error.message, status: error.status },
            meta: { updatedAt: getUnixtime() },
          },
        ]);
    });
}
