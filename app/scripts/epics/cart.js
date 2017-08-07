/**
 * @module Epics/User
 * @desc User
 */
import { getUnixtime, rxAjax } from 'utils';
import { AppConstants, CartConstants } from 'constants/index';
import cartAddPayloadMock from 'assets/json/mockCartAddPayload.json';
import { push } from 'modules/ReduxRouter';


export function cartBasicFetch(action$) {
  return action$.ofType(CartConstants.CART_BASIC_FETCH_REQUEST)
    .switchMap(() => {
      const endpoint = '/v2/cart/basic';

      return rxAjax({
        endpoint,
        method: 'GET',
      })
        .map(data => {
          if (data.status === 200 && data.response) {
            return {
              type: CartConstants.CART_BASIC_FETCH_SUCCESS,
              payload: data.response,
              meta: { updatedAt: getUnixtime() },
            };
          }

          return {
            type: CartConstants.CART_BASIC_FETCH_FAILURE,
            payload: { message: 'Algo de errado não está correto' },
            meta: { updatedAt: getUnixtime() },
          };
        })
        .takeUntil(action$.ofType(AppConstants.CANCEL_FETCH))
        .defaultIfEmpty({ type: CartConstants.CART_BASIC_FETCH_CANCEL })
        .catch(error => ([{
          type: CartConstants.CART_BASIC_FETCH_FAILURE,
          payload: { message: error.message, status: error.status },
          meta: { updatedAt: getUnixtime() },
        }]));
    });
}

export function cartFetch(action$) {
  return action$.ofType(CartConstants.CART_FETCH_REQUEST)
    .switchMap(() => {
      const endpoint = '/v2/cart';

      return rxAjax({
        endpoint,
        method: 'GET',
      })
        .map(data => {
          if (data.status === 200 && data.response) {
            return {
              type: CartConstants.CART_FETCH_SUCCESS,
              payload: data.response,
              meta: { updatedAt: getUnixtime() },
            };
          }

          return {
            type: CartConstants.CART_FETCH_FAILURE,
            payload: { message: 'Algo de errado não está correto' },
            meta: { updatedAt: getUnixtime() },
          };
        })
        .takeUntil(action$.ofType(AppConstants.CANCEL_FETCH))
        .defaultIfEmpty({ type: CartConstants.CART_FETCH_CANCEL })
        .catch(error => ([{
          type: CartConstants.CART_FETCH_FAILURE,
          payload: { message: error.message, status: error.status },
          meta: { updatedAt: getUnixtime() },
        }]));
    });
}

export function cartAddFetch(action$) {
  return action$.ofType(CartConstants.CART_ADD_FETCH_REQUEST)
    .switchMap(() => {
      const endpoint = '/v2/cart';

      return rxAjax({
        endpoint,
        payload: cartAddPayloadMock,
        method: 'POST',
      })
        .map(data => {
          if (data.status === 201) {
            push('/meu-carrinho');

            return {
              type: CartConstants.CART_ADD_FETCH_SUCCESS,
              payload: {},
              meta: { updatedAt: getUnixtime() },
            };
          }

          return {
            type: CartConstants.CART_ADD_FETCH_FAILURE,
            payload: { message: 'Algo de errado não está correto' },
            meta: { updatedAt: getUnixtime() },
          };
        })
        .takeUntil(action$.ofType(AppConstants.CANCEL_FETCH))
        .defaultIfEmpty({ type: CartConstants.CART_ADD_FETCH_CANCEL })
        .catch(error => ([{
          type: CartConstants.CART_ADD_FETCH_FAILURE,
          payload: { message: error.message, status: error.status },
          meta: { updatedAt: getUnixtime() },
        }]));
    });
}

export function cartDuplicateFetch(action$) {
  return action$.ofType(CartConstants.CART_DUPLICATE_FETCH_REQUEST)
    .switchMap(action => {
      const itemId = action.payload.itemId;

      const endpoint = `/v2/cart/${itemId}/duplicate`;

      return rxAjax({
        endpoint,
        payload: {},
        method: 'PUT',
      })
        .map(data => {
          if (data.status === 201) {
            return {
              type: CartConstants.CART_DUPLICATE_FETCH_SUCCESS,
              payload: {
                originalItemId: itemId,
                itemId: data.response.id,
              },
              meta: { updatedAt: getUnixtime() },
            };
          }

          return {
            type: CartConstants.CART_DUPLICATE_FETCH_FAILURE,
            payload: { message: 'Algo de errado não está correto' },
            meta: { updatedAt: getUnixtime() },
          };
        })
        .takeUntil(action$.ofType(AppConstants.CANCEL_FETCH))
        .defaultIfEmpty({ type: CartConstants.CART_DUPLICATE_FETCH_CANCEL })
        .catch(error => ([{
          type: CartConstants.CART_DUPLICATE_FETCH_FAILURE,
          payload: { message: error.message, status: error.status },
          meta: { updatedAt: getUnixtime() },
        }]));
    });
}

export function cartDeleteFetch(action$) {
  return action$.ofType(CartConstants.CART_DELETE_FETCH_REQUEST)
    .switchMap(action => {
      const itemId = action.payload.itemId;

      const endpoint = `/v2/cart/${itemId}`;

      return rxAjax({
        endpoint,
        payload: {},
        method: 'DELETE',
      })
        .map(data => {
          if (data.status === 204) {
            return {
              type: CartConstants.CART_DELETE_FETCH_SUCCESS,
              payload: {
                itemId,
              },
              meta: { updatedAt: getUnixtime() },
            };
          }

          return {
            type: CartConstants.CART_DELETE_FETCH_FAILURE,
            payload: { message: 'Algo de errado não está correto' },
            meta: { updatedAt: getUnixtime() },
          };
        })
        .takeUntil(action$.ofType(AppConstants.CANCEL_FETCH))
        .defaultIfEmpty({ type: CartConstants.CART_DELETE_FETCH_CANCEL })
        .catch(error => ([{
          type: CartConstants.CART_DELETE_FETCH_FAILURE,
          payload: { message: error.message, status: error.status },
          meta: { updatedAt: getUnixtime() },
        }]));
    });
}
