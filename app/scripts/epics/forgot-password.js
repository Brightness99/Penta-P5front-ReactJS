// @flow
/**
 * @module Epics/ForgotPassword
 * @desc ForgotPassword
 */
import { getUnixtime, rxAjax } from 'utils';
import { AppConstants, ForgotPasswordConstants } from 'constants/index';
import { push } from 'modules/ReduxRouter';

export function resetPassword(action$) {
  return action$.ofType(ForgotPasswordConstants.RESET_PASSWORD_REQUEST)
  .switchMap(action => {
    const endpoint = '/v2/resetPassword';

    return rxAjax({
      endpoint,
      payload: action.payload,
      method: 'POST',
    })
    .map(data => {
      if (data.status === 200 && data.response) {
        return {
          type: ForgotPasswordConstants.RESET_PASSWORD_SUCCESS,
          payload: data.response,
          meta: { updatedAt: getUnixtime() },
        };
      }

      return {
        type: ForgotPasswordConstants.RESET_PASSWORD_FAILURE,
        payload: { message: 'Algo de errado não está correto' },
        meta: { updatedAt: getUnixtime() },
      };
    })
    .takeUntil(action$.ofType(AppConstants.CANCEL_FETCH))
    .defaultIfEmpty({ type: ForgotPasswordConstants.RESET_PASSWORD_CANCEL })
    .catch(error => {
      if (error.status === 404) {
        push('/404');
      }

      return ([
        {
          type: ForgotPasswordConstants.RESET_PASSWORD_FAILURE,
          payload: { message: error.message, status: error.status },
          meta: { updatedAt: getUnixtime() },
        },
      ]);
    });
  });
}

export function setNewPassword(action$) {
  return action$.ofType(ForgotPasswordConstants.SET_NEW_PASSWORD_REQUEST)
  .switchMap(action => {
    const { hash, new_password } = action.payload;
    const endpoint = `/v2/resetPassword/${hash}`;

    return rxAjax({
      endpoint,
      payload: { new_password },
      method: 'POST',
    })
    .map(data => {
      if (data.status === 200 && data.response) {
        return {
          type: ForgotPasswordConstants.SET_NEW_PASSWORD_SUCCESS,
          payload: data.response,
          meta: { updatedAt: getUnixtime() },
        };
      }

      return {
        type: ForgotPasswordConstants.SET_NEW_PASSWORD_FAILURE,
        payload: { message: 'Algo de errado não está correto' },
        meta: { updatedAt: getUnixtime() },
      };
    })
    .takeUntil(action$.ofType(AppConstants.CANCEL_FETCH))
    .defaultIfEmpty({ type: ForgotPasswordConstants.SET_NEW_PASSWORD_CANCEL })
    .catch(error => {
      if (error.status === 404) {
        push('/404');
      }

      return ([
        {
          type: ForgotPasswordConstants.SET_NEW_PASSWORD_FAILURE,
          payload: { message: error.message, status: error.status },
          meta: { updatedAt: getUnixtime() },
        },
      ]);
    });
  });
}
