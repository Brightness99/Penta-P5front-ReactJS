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

export function userSignIn(action$) {
  return action$.ofType(UserConstants.USER_AUTH_SIGN_IN_REQUEST)
    .switchMap(action => {
      const endpoint = '/v1/customers/login';

      console.log('endpoint');
      console.log(endpoint);
      console.log('action');
      console.log(action);

      return rxAjax({
        endpoint,
        payload: {
          email: action.payload.email,
          password: action.payload.password,
        },
        method: 'POST',
      })
      .map(data => {
        return {
          type: UserConstants.USER_AUTH_SIGN_IN_SUCCESS,
          payload: data.response,
          meta: { updatedAt: getUnixtime() },
        };
      })
      .takeUntil(action$.ofType(AppConstants.CANCEL_FETCH))
      .defaultIfEmpty({ type: UserConstants.USER_AUTH_SIGN_IN_CANCEL })
      .catch(error => [
        {
          type: UserConstants.USER_AUTH_SIGN_IN_FAILURE,
          payload: { message: error.message, status: error.status },
          meta: { updatedAt: getUnixtime() },
        },
      ]);
    });
}
