/**
 * @module Epics/User
 * @desc User
 */
import { getUnixtime, rxAjax } from 'utils';
import { AppConstants, PrintiPressConstants } from 'constants/index';

export function printiPressFetch(action$) {
  return action$.ofType(PrintiPressConstants.PRINTI_PRESS_FETCH_REQUEST)
    .switchMap(action => {
      const endpoint = '/v2/printi-na-imprensa';

      return rxAjax({
        endpoint,
        payload: action.payload,
        method: 'GET',
      })
        .map(data => ({
          type: PrintiPressConstants.PRINTI_PRESS_FETCH_SUCCESS,
          payload: data.response,
          meta: { updatedAt: getUnixtime() },
        }))
        .takeUntil(action$.ofType(AppConstants.CANCEL_FETCH))
        .defaultIfEmpty({ type: PrintiPressConstants.PRINTI_PRESS_FETCH_CANCEL })
        .catch(error => [
          {
            type: PrintiPressConstants.PRINTI_PRESS_FETCH_FAILURE,
            payload: { message: error.message, status: error.status },
            meta: { updatedAt: getUnixtime() },
          },
        ]);
    });
}
