/**
 * @module Epics/User
 * @desc User
 */
import { getUnixtime, rxAjax } from 'utils';
import { AppConstants, CartConstants } from 'constants/index';
import cartAddPayloadMock from 'assets/json/mockCartAddPayload.json';
import { push } from 'modules/ReduxRouter';
import { cartFetch as cartFetchAction, cartPickupFetch as cartPickupAction } from 'actions';

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

export function cartFetch(action$, store) {
  return action$.ofType(CartConstants.CART_FETCH_REQUEST || CartConstants.CART_VOUCHER_ADD_FETCH_SUCCESS)
    .switchMap(() => {
      const endpoint = '/v2/cart';

      return rxAjax({
        endpoint,
        method: 'GET',
      })
        .map(data => {
          if (data.status === 200 && data.response) {
            if (data.response.use_pickup_places) {
              store.dispatch(cartPickupAction(data.response.zipcode));
            }
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

export function cartVoucherAddFetch(action$, store) {
  return action$.ofType(CartConstants.CART_VOUCHER_ADD_FETCH_REQUEST)
    .switchMap(action => {
      const voucher = action.payload.voucher;

      const endpoint = `/v2/cart/voucher/${voucher}`;

      return rxAjax({
        endpoint,
        payload: {},
        method: 'POST',
      })
        .map(data => {
          if (data.status === 204) {
            if (cartFetchAction) {
              store.dispatch(cartFetchAction());
            }

            return {
              type: CartConstants.CART_VOUCHER_ADD_FETCH_SUCCESS,
              payload: {
                voucher,
              },
              meta: { updatedAt: getUnixtime() },
            };
          }

          return {
            type: CartConstants.CART_VOUCHER_ADD_FETCH_FAILURE,
            payload: { message: data.response, status: data.status },
            meta: { updatedAt: getUnixtime() },
          };
        })
        .takeUntil(action$.ofType(AppConstants.CANCEL_FETCH))
        .defaultIfEmpty({ type: CartConstants.CART_VOUCHER_ADD_FETCH_CANCEL })
        .catch(error => ([{
          type: CartConstants.CART_VOUCHER_ADD_FETCH_FAILURE,
          payload: { message: error.message, status: error.status },
          meta: { updatedAt: getUnixtime() },
        }]));
    });
}

export function cartVoucherRemoveFetch(action$, store) {
  return action$.ofType(CartConstants.CART_VOUCHER_REMOVE_FETCH_REQUEST)
    .switchMap(action => {
      const voucher = action.payload.voucher;

      const endpoint = `/v2/cart/voucher/${voucher}`;

      return rxAjax({
        endpoint,
        payload: {},
        method: 'DELETE',
      })
        .map(data => {
          if (data.status === 204) {
            if (cartFetchAction) {
              store.dispatch(cartFetchAction());
            }

            return {
              type: CartConstants.CART_VOUCHER_REMOVE_FETCH_SUCCESS,
              payload: {
                voucher,
              },
              meta: { updatedAt: getUnixtime() },
            };
          }

          return {
            type: CartConstants.CART_VOUCHER_ADD_FETCH_FAILURE,
            payload: { message: data.response, status: data.status },
            meta: { updatedAt: getUnixtime() },
          };
        })
        .takeUntil(action$.ofType(AppConstants.CANCEL_FETCH))
        .defaultIfEmpty({ type: CartConstants.CART_VOUCHER_ADD_FETCH_CANCEL })
        .catch(error => ([{
          type: CartConstants.CART_VOUCHER_ADD_FETCH_FAILURE,
          payload: { message: error.message, status: error.status },
          meta: { updatedAt: getUnixtime() },
        }]));
    });
}

export function cartPickupFetch(action$) {
  return action$.ofType(CartConstants.CART_PICKUP_FETCH_REQUEST)
    .switchMap((action) => {
      const endpoint = `/v1/pickup_places/addresses/${action.payload.zipcode}/zipcode`;

      return rxAjax({
        endpoint,
        method: 'GET',
      })
        .map(data => {
          if (data.status === 200 && data.response) {
            return {
              type: CartConstants.CART_PICKUP_FETCH_SUCCESS,
              payload: {
                ...data.response,
                unmaskedZipcode: action.payload.unmaskedZipcode,
              },
              meta: { updatedAt: getUnixtime() },
            };
          }

          return {
            type: CartConstants.CART_PICKUP_FETCH_FAILURE,
            payload: { message: 'Algo de errado não está correto' },
            meta: { updatedAt: getUnixtime() },
          };
        })
        .takeUntil(action$.ofType(AppConstants.CANCEL_FETCH))
        .defaultIfEmpty({ type: CartConstants.CART_PICKUP_FETCH_CANCEL })
        .catch(error => ([{
          type: CartConstants.CART_PICKUP_FETCH_FAILURE,
          payload: { message: error.message, status: error.status },
          meta: { updatedAt: getUnixtime() },
        }]));
    });
}
