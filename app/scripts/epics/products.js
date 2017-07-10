/**
 * @module Epics/User
 * @desc User
 */
import { getUnixtime, rxAjax } from 'utils';
import { AppConstants, ProductConstants } from 'constants/index';
import { push } from 'modules/ReduxRouter';

export function productsFetch(action$) {
  return action$.ofType(ProductConstants.PRODUCT_FETCH_REQUEST)
    .switchMap(action => {
      const endpoint = `/v1/product/${action.payload.slug}`;

      return rxAjax({
        endpoint,
        method: 'GET',
      })
        .map(data => {
          if (data.status === 200 && data.response) {
            return {
              type: ProductConstants.PRODUCT_FETCH_SUCCESS,
              payload: data.response,
              meta: { updatedAt: getUnixtime() },
            };
          }

          return {
            type: ProductConstants.PRODUCT_FETCH_FAILURE,
            payload: { message: 'Algo de errado não está correto' },
            meta: { updatedAt: getUnixtime() },
          };
        })
        .takeUntil(action$.ofType(AppConstants.CANCEL_FETCH))
        .defaultIfEmpty({ type: ProductConstants.PRODUCT_FETCH_CANCEL })
        .catch(error => {
          if (error.status === 404) {
            push('/404');
          }

          return ([{
            type: ProductConstants.PRODUCT_FETCH_FAILURE,
            payload: { message: error.message, status: error.status },
            meta: { updatedAt: getUnixtime() },
          }]);
        });
    });
}
