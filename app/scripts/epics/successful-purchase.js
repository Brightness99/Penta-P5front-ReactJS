/**
 * @module Epics/SuccessfulPurchase
 * @desc Successful Purchase
 */
import { getUnixtime, rxAjax } from 'utils';
import { AppConstants, SuccessfulPurchaseConstants } from 'constants/index';
import { push } from 'modules/ReduxRouter';

export function successfulPurchaseFetch(action$) {
  return action$.ofType(SuccessfulPurchaseConstants.SUCCESSFUL_PURCHASE_FETCH_REQUEST)
    .switchMap((action) => {
      const endpoint = `/v2/successful-purchase/${action.payload.id}`;
      return rxAjax({
        endpoint,
        method: 'GET',
      })
      .map(data => {
        if (data.status === 200) {
          return {
            type: SuccessfulPurchaseConstants.SUCCESSFUL_PURCHASE_FETCH_SUCCESS,
            payload: data.response,
            meta: { updatedAt: getUnixtime() },
          };
        }

        return {
          type: SuccessfulPurchaseConstants.SUCCESSFUL_PURCHASE_FETCH_FAILURE,
          payload: { message: 'Algo de errado não está correto' },
          meta: { updatedAt: getUnixtime() },
        };
      })
      .takeUntil(action$.ofType(AppConstants.CANCEL_FETCH))
      .defaultIfEmpty({ type: SuccessfulPurchaseConstants.SUCCESSFUL_PURCHASE_FETCH_CANCEL })
      .catch(error => {
        if (error.status === 404) {
          push('/404');
        }

        return ([{
          type: SuccessfulPurchaseConstants.SUCCESSFUL_PURCHASE_FETCH_FAILURE,
          payload: { message: error.message, status: error.status },
          meta: { updatedAt: getUnixtime() },
        }]);
      });
    });
}
