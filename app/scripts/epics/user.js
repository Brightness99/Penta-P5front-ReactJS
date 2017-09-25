/**
 * @module Epics/User
 * @desc User
 */
import { getUnixtime, rxAjax } from 'utils';
import { AppConstants, UserConstants } from 'constants/index';
import { push } from 'modules/ReduxRouter';

import 'rxjs/add/operator/do';

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

      return rxAjax({
        endpoint,
        payload: {
          email: action.payload.email,
          password: action.payload.password,
        },
        method: 'POST',
      })
        .do((data) => {
          if (data.status === 200) { push('/'); }
        })
        .map(data => ({
          type: UserConstants.USER_AUTH_SIGN_IN_SUCCESS,
          payload: data.response,
          meta: { updatedAt: getUnixtime() },
        }))
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

export function userSignUp(action$) {
  return action$.ofType(UserConstants.USER_AUTH_SIGN_UP_REQUEST)
    .switchMap(action => {
      const endpoint = '/v1/customers/register';

      return rxAjax({
        endpoint,
        payload: action.payload,
        method: 'POST',
      })
        .do((data) => {
          if (data.status === 200) { push('/minha-conta'); }
        })
        .map(data => ({
          type: UserConstants.USER_AUTH_SIGN_UP_SUCCESS,
          payload: data.response,
          meta: { updatedAt: getUnixtime() },
        }))
        .takeUntil(action$.ofType(AppConstants.CANCEL_FETCH))
        .defaultIfEmpty({ type: UserConstants.USER_AUTH_SIGN_UP_CANCEL })
        .catch(error => [
          {
            type: UserConstants.USER_AUTH_SIGN_UP_FAILURE,
            payload: { message: error.message, status: error.status },
            meta: { updatedAt: getUnixtime() },
          },
        ]);
    });
}

export function userLogOut(action$) {
  return action$.ofType(UserConstants.USER_AUTH_LOG_OUT_REQUEST)
    .switchMap(() => {
      const endpoint = '/v2/customers/logout';

      return rxAjax({
        endpoint,
        payload: {},
        method: 'POST',
      })
        .map(data => ({
          type: UserConstants.USER_AUTH_LOG_OUT_SUCCESS,
          payload: data.response,
          meta: { updatedAt: getUnixtime() },
        }))
        .takeUntil(action$.ofType(AppConstants.CANCEL_FETCH))
        .defaultIfEmpty({ type: UserConstants.USER_AUTH_LOG_OUT_CANCEL })
        .catch(error => [
          {
            type: UserConstants.USER_AUTH_LOG_OUT_FAILURE,
            payload: { message: error.message, status: error.status },
            meta: { updatedAt: getUnixtime() },
          },
        ]);
    });
}

export function userAuthValidate(action$) {
  return action$.ofType(UserConstants.USER_AUTH_VALIDATE_REQUEST)
    .switchMap(() => {
      const endpoint = '/v2/customer/validate-auth';

      return rxAjax({
        endpoint,
        payload: {},
        method: 'POST',
      })
        .map(data => ({
          type: UserConstants.USER_AUTH_VALIDATE_SUCCESS,
          payload: data.response,
          meta: { updatedAt: getUnixtime() },
        }))
        .takeUntil(action$.ofType(AppConstants.CANCEL_FETCH))
        .defaultIfEmpty({ type: UserConstants.USER_AUTH_VALIDATE_CANCEL })
        .catch(error => [
          {
            type: UserConstants.USER_AUTH_VALIDATE_FAILURE,
            payload: { message: error.message, status: error.status },
            meta: { updatedAt: getUnixtime() },
          },
        ]);
    });
}
