/**
 * @module Epics/User
 * @desc User
 */
import { getUnixtime, rxAjax } from 'utils';
import { AppConstants, LocaleConstants } from 'constants/index';

export function localeFetch(action$, store) {
  return action$.ofType(LocaleConstants.LOCALE_FETCH_REQUEST)
    .switchMap(() => {
      const endpoint = '/v2/locale';

      return rxAjax({
        endpoint,
        method: 'GET',
      })
        .map(data => {
          if (data.status === 200 && data.response) {
            return {
              type: LocaleConstants.LOCALE_FETCH_SUCCESS,
              payload: data.response,
              meta: { updatedAt: getUnixtime() },
            };
          }

          return {
            type: LocaleConstants.LOCALE_FETCH_FAILURE,
            payload: { message: 'Algo de errado não está correto' },
            meta: { updatedAt: getUnixtime() },
          };
        })
        .takeUntil(action$.ofType(AppConstants.CANCEL_FETCH))
        .defaultIfEmpty({ type: LocaleConstants.LOCALE_FETCH_CANCEL })
        .catch(error => ([{
          type: LocaleConstants.LOCALE_FETCH_FAILURE,
          payload: { message: error.message, status: error.status },
          meta: { updatedAt: getUnixtime() },
        }]));
    });
}
