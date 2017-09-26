/**
 * @module Epics/User
 * @desc User
 */
import { getUnixtime, rxAjax } from 'utils';
import { AppConstants, AccountConstants } from 'constants/index';
import { push } from 'modules/ReduxRouter';

export function accountFetch(action$) {
  return action$.ofType(AccountConstants.ACCOUNT_FETCH_REQUEST)
    .switchMap(() => {
      const endpoint = '/v2/customers';

      return rxAjax({
        endpoint,
        method: 'GET',
      })
        .map(data => {
          if (data.status === 200 && data.response) {
            return {
              type: AccountConstants.ACCOUNT_FETCH_SUCCESS,
              payload: data.response,
              meta: { updatedAt: getUnixtime() },
            };
          }

          return {
            type: AccountConstants.ACCOUNT_FETCH_FAILURE,
            payload: { message: 'Algo de errado não está correto' },
            meta: { updatedAt: getUnixtime() },
          };
        })
        .takeUntil(action$.ofType(AppConstants.CANCEL_FETCH))
        .defaultIfEmpty({ type: AccountConstants.ACCOUNT_FETCH_CANCEL })
        .catch(error => {
          if (error.status === 404) {
            push('/404');
          }

          return ([{
            type: AccountConstants.ACCOUNT_FETCH_FAILURE,
            payload: { message: error.message, status: error.status },
            meta: { updatedAt: getUnixtime() },
          }]);
        });
    });
}

export function accountAddressFetch(action$) {
  return action$.ofType(AccountConstants.ACCOUNT_ADDRESS_FETCH_REQUEST)
    .switchMap(() => {
      const endpoint = '/v2/customers/addresses';

      return rxAjax({
        endpoint,
        method: 'GET',
      })
        .map(data => {
          if (data.status === 200 && data.response) {
            return {
              type: AccountConstants.ACCOUNT_ADDRESS_FETCH_SUCCESS,
              payload: data.response,
              meta: { updatedAt: getUnixtime() },
            };
          }

          return {
            type: AccountConstants.ACCOUNT_ADDRESS_FETCH_FAILURE,
            payload: { message: 'Algo de errado não está correto' },
            meta: { updatedAt: getUnixtime() },
          };
        })
        .takeUntil(action$.ofType(AppConstants.CANCEL_FETCH))
        .defaultIfEmpty({ type: AccountConstants.ACCOUNT_ADDRESS_FETCH_CANCEL })
        .catch(error => {
          if (error.status === 404) {
            push('/404');
          }

          return ([{
            type: AccountConstants.ACCOUNT_ADDRESS_FETCH_FAILURE,
            payload: { message: error.message, status: error.status },
            meta: { updatedAt: getUnixtime() },
          }]);
        });
    });
}

export function accountUpdate(action$) {
  return action$.ofType(AccountConstants.ACCOUNT_UPDATE_SUBMIT)
  .switchMap(action => {
    const endpoint = `/v2/customers`;
    return rxAjax({
      endpoint,
      payload: action.payload,
      method: 'PUT',
    })
    .map(data => {
      if (data.status === 200) {
        return {
          type: AccountConstants.ACCOUNT_UPDATE_SUBMIT_SUCCESS,
          payload: data.response,
          meta: { updatedAt: getUnixtime() },
        };
      }

      return {
        type: AccountConstants.ACCOUNT_UPDATE_SUBMIT_FAILURE,
        payload: { message: 'Algo de errado não está correto' },
        meta: { updatedAt: getUnixtime() },
      };
    })
    .takeUntil(action$.ofType(AppConstants.CANCEL_FETCH))
    .defaultIfEmpty({ type: AccountConstants.ACCOUNT_UPDATE_SUBMIT_CANCEL })
    .catch(error => ([
      {
        type: AccountConstants.ACCOUNT_UPDATE_SUBMIT_FAILURE,
        payload: { message: error.message, status: error.status },
        meta: { updatedAt: getUnixtime() },
      },
    ]));
  });
}

export function accountAddressCreate(action$) {
  return action$.ofType(AccountConstants.ACCOUNT_ADDRESS_CREATE_SUBMIT)
  .switchMap(action => {
    const endpoint = `/v2/customers/addresses`;
    return rxAjax({
      endpoint,
      payload: action.payload,
      method: 'POST',
    })
    .map(data => {
      if (data.status === 201) {
        return {
          type: AccountConstants.ACCOUNT_ADDRESS_CREATE_SUBMIT_SUCCESS,
          payload: data.response,
          meta: { updatedAt: getUnixtime() },
        };
      }

      return {
        type: AccountConstants.ACCOUNT_ADDRESS_CREATE_SUBMIT_FAILURE,
        payload: { message: 'Algo de errado não está correto' },
        meta: { updatedAt: getUnixtime() },
      };
    })
    .takeUntil(action$.ofType(AppConstants.CANCEL_FETCH))
    .defaultIfEmpty({ type: AccountConstants.ACCOUNT_ADDRESS_CREATE_SUBMIT_CANCEL })
    .catch(error => ([
      {
        type: AccountConstants.ACCOUNT_ADDRESS_CREATE_SUBMIT_FAILURE,
        payload: { message: error.message, status: error.status },
        meta: { updatedAt: getUnixtime() },
      },
    ]));
  });
}

export function accountAddressDelete(action$) {
  return action$.ofType(AccountConstants.ACCOUNT_ADDRESS_DELETE)
  .switchMap(action => {
    console.log(action.payload);
    const endpoint = `/v2/customers/addresses/` + action.payload.id;
    return rxAjax({
      endpoint,
      method: 'DELETE',
    })
    .map(data => {
      if (data.status === 200) {
        return {
          type: AccountConstants.ACCOUNT_ADDRESS_DELETE_SUCCESS,
          payload: {
            id: action.payload.id
          },
          meta: { updatedAt: getUnixtime() },
        };
      }

      return {
        type: AccountConstants.ACCOUNT_ADDRESS_DELETE_FAILURE,
        payload: { message: 'Algo de errado não está correto' },
        meta: { updatedAt: getUnixtime() },
      };
    })
    .takeUntil(action$.ofType(AppConstants.CANCEL_FETCH))
    .defaultIfEmpty({ type: AccountConstants.ACCOUNT_ADDRESS_DELETE_CANCEL })
    .catch(error => ([
      {
        type: AccountConstants.ACCOUNT_ADDRESS_DELETE_FAILURE,
        payload: { message: error.message, status: error.status },
        meta: { updatedAt: getUnixtime() },
      },
    ]));
  });
}

export function accountSavedCreditCardFetch(action$) {
  return action$.ofType(AccountConstants.ACCOUNT_SAVED_CREDIT_CARD_FETCH_REQUEST)
    .switchMap(() => {
      const endpoint = '/v2/customers/credit-cards';

      return rxAjax({
        endpoint,
        method: 'GET',
      })
        .map(data => {
          if (data.status === 200 && data.response) {
            return {
              type: AccountConstants.ACCOUNT_SAVED_CREDIT_CARD_FETCH_SUCCESS,
              payload: data.response,
              meta: { updatedAt: getUnixtime() },
            };
          }

          return {
            type: AccountConstants.ACCOUNT_SAVED_CREDIT_CARD_FETCH_FAILURE,
            payload: { message: 'Algo de errado não está correto' },
            meta: { updatedAt: getUnixtime() },
          };
        })
        .takeUntil(action$.ofType(AppConstants.CANCEL_FETCH))
        .defaultIfEmpty({ type: AccountConstants.ACCOUNT_SAVED_CREDIT_CARD_FETCH_CANCEL })
        .catch(error => {
          if (error.status === 404) {
            push('/404');
          }

          return ([{
            type: AccountConstants.ACCOUNT_SAVED_CREDIT_CARD_FETCH_FAILURE,
            payload: { message: error.message, status: error.status },
            meta: { updatedAt: getUnixtime() },
          }]);
        });
    });
}

export function accountSavedCreditCardDelete(action$) {
  return action$.ofType(AccountConstants.ACCOUNT_SAVED_CREDIT_CARD_DELETE)
  .switchMap(action => {
    const endpoint = `/v2/customers/credit-cards/${action.payload.id}`;
    return rxAjax({
      endpoint,
      method: 'DELETE',
    })
    .map(data => {
      if (data.status === 204) {
        return {
          type: AccountConstants.ACCOUNT_SAVED_CREDIT_CARD_DELETE_SUCCESS,
          payload: {
            id: action.payload.id
          },
          meta: { updatedAt: getUnixtime() },
        };
      }

      return {
        type: AccountConstants.ACCOUNT_SAVED_CREDIT_CARD_DELETE_FAILURE,
        payload: { message: 'Algo de errado não está correto' },
        meta: { updatedAt: getUnixtime() },
      };
    })
    .takeUntil(action$.ofType(AppConstants.CANCEL_FETCH))
    .defaultIfEmpty({ type: AccountConstants.ACCOUNT_SAVED_CREDIT_CARD_DELETE_CANCEL })
    .catch(error => ([
      {
        type: AccountConstants.ACCOUNT_SAVED_CREDIT_CARD_DELETE_FAILURE,
        payload: { message: error.message, status: error.status },
        meta: { updatedAt: getUnixtime() },
      },
    ]));
  });
}

export function accountNotificationFetch(action$) {
  return action$.ofType(AccountConstants.ACCOUNT_NOTIFICATION_FETCH_REQUEST)
  .switchMap(() => {
      const endpoint = '/v2/customers/notifications';

      return rxAjax({
      endpoint,
      method: 'GET',
    })
    .map(data => {
      if (data.status === 200 && data.response) {
        return {
          type: AccountConstants.ACCOUNT_NOTIFICATION_FETCH_SUCCESS,
          payload: data.response,
          meta: { updatedAt: getUnixtime() },
        };
      }

      return {
        type: AccountConstants.ACCOUNT_NOTIFICATION_FETCH_FAILURE,
        payload: { message: 'Algo de errado não está correto' },
        meta: { updatedAt: getUnixtime() },
        };
      })
      .takeUntil(action$.ofType(AppConstants.CANCEL_FETCH))
      .defaultIfEmpty({ type: AccountConstants.ACCOUNT_NOTIFICATION_FETCH_CANCEL })
      .catch(error => {
        if (error.status === 404) {
          push('/404');
        }

        return ([{
          type: AccountConstants.ACCOUNT_NOTIFICATION_FETCH_FAILURE,
          payload: { message: error.message, status: error.status },
          meta: { updatedAt: getUnixtime() },
        }]);
      });
    });
}

export function accountNotificationUpdate(action$) {
  return action$.ofType(AccountConstants.ACCOUNT_NOTIFICATION_UPDATE_SUBMIT)
  .switchMap(action => {
    const endpoint = `/v2/customers/notifications`;

    return rxAjax({
      endpoint,
      payload: action.payload,
      method: 'PUT',
    })
      .map(data => {
        if (data.status === 200) {
          return {
            type: AccountConstants.ACCOUNT_NOTIFICATION_UPDATE_SUBMIT_SUCCESS,
            payload: {
            sms_enabled: action.payload.sms_enabled
            },
            meta: { updatedAt: getUnixtime() },
          };
        }

        return {
          type: AccountConstants.ACCOUNT_NOTIFICATION_UPDATE_SUBMIT_FAILURE,
          payload: { message: 'Algo de errado não está correto' },
          meta: { updatedAt: getUnixtime() },
        };
      })
      .takeUntil(action$.ofType(AppConstants.CANCEL_FETCH))
      .defaultIfEmpty({ type: AccountConstants.ACCOUNT_NOTIFICATION_UPDATE_SUBMIT_CANCEL })
      .catch(error => ([
        {
          type: AccountConstants.ACCOUNT_NOTIFICATION_UPDATE_SUBMIT_FAILURE,
          payload: { message: error.message, status: error.status },
          meta: { updatedAt: getUnixtime() },
        },
      ]));
    });
}
