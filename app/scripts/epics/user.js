/**
 * @module Epics/User
 * @desc User
 */
import { getUnixtime, rxAjax } from 'utils';
import { AppConstants, UserConstants } from 'constants/index';

export function userNewsletter(action$) {
  return action$.ofType(UserConstants.USER_NEWSLETTER_REQUEST)
    .switchMap(action => {
      const endpoint = '/newsletter';

      return rxAjax({
        endpoint,
        payload: {
          email: action.payload.email,
          subscribed: true,
          leadpage: 'Gráfica Online | Impressão Digital e Offset',
          leaduri: '/',
        },
        method: 'POST',
      })
        .map(data => {
          if (data.response === 1) {
            return {
              type: UserConstants.USER_NEWSLETTER_SUCCESS,
              payload: { message: action.payload.locale.SUCCESS },
              meta: { updatedAt: getUnixtime() },
            };
          }

          return {
            type: UserConstants.USER_NEWSLETTER_FAILURE,
            payload: { message: action.payload.locale.FAILURE },
            meta: { updatedAt: getUnixtime() },
          };
        })
        .takeUntil(action$.ofType(AppConstants.CANCEL_FETCH))
        .defaultIfEmpty({ type: UserConstants.USER_NEWSLETTER_CANCEL })
        .catch(error => [
          {
            type: UserConstants.USER_NEWSLETTER_FAILURE,
            payload: { message: error.message, status: error.status },
            meta: { updatedAt: getUnixtime() },
          },
        ]);
    });
}
