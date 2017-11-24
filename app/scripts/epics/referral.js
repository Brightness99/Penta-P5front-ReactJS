// @flow
/**
 * @module Epics/Referral
 * @desc Referral
 */
import { getUnixtime, rxAjax } from 'utils';
import { AppConstants, ReferralConstants } from 'constants/index';

export function referralSendRequest(action$) {
  return action$.ofType(ReferralConstants.SEND_REFERRAL_REQUEST)
  .switchMap((action) => {
    const { customerId, emails } = action.payload;
    const endpoint = `/v2/customer/${customerId}/share/voucher`;

    return rxAjax({
      endpoint,
      payload: emails,
      method: 'POST',
    })
    .map(data => {
      if (data.status === 200 && data.response) {
        return {
          type: ReferralConstants.SEND_REFERRAL_REQUEST_SUCCESS,
          payload: data.response,
          meta: { updatedAt: getUnixtime() },
        };
      }

      return {
        type: ReferralConstants.SEND_REFERRAL_REQUEST_FAILURE,
        payload: { message: 'Algo de errado não está correto' },
        meta: { updatedAt: getUnixtime() },
      };
    })
    .takeUntil(action$.ofType(AppConstants.CANCEL_FETCH))
    .defaultIfEmpty({ type: ReferralConstants.SEND_REFERRAL_REQUEST_CANCEL })
    .catch(error => ([
      {
        type: ReferralConstants.SEND_REFERRAL_REQUEST_FAILURE,
        payload: { message: error.message, status: error.status },
        meta: { updatedAt: getUnixtime() },
      },
    ]));
  });
}

export function getReferralVoucherSum(action$) {
  return action$.ofType(ReferralConstants.GET_REFERRAL_SUM)
  .switchMap(() => {
    const endpoint = '/v2/customer/referral/voucher/sum';

    return rxAjax({
      endpoint,
      method: 'GET',
    })
    .map(data => {
      if (data.status === 200 && data.response) {
        return {
          type: ReferralConstants.GET_REFERRAL_SUM_SUCCESS,
          payload: data.response,
          meta: { updatedAt: getUnixtime() },
        };
      }

      return {
        type: ReferralConstants.GET_REFERRAL_SUM_FAILURE,
        payload: { message: 'Algo de errado não está correto' },
        meta: { updatedAt: getUnixtime() },
      };
    })
    .takeUntil(action$.ofType(AppConstants.CANCEL_FETCH))
    .defaultIfEmpty({ type: ReferralConstants.GET_REFERRAL_SUM_CANCEL })
    .catch(error => ([
      {
        type: ReferralConstants.GET_REFERRAL_SUM_FAILURE,
        payload: { message: error.message, status: error.status },
        meta: { updatedAt: getUnixtime() },
      },
    ]));
  });
}

export function getReferralHistory(action$) {
  return action$.ofType(ReferralConstants.GET_REFERRAL_HISTORY)
  .switchMap((action) => {
    const { order, per_page, page, sort } = action.payload;
    const endpoint = `/v2/customer/referral/voucher/history?order=${order}&page=${page}&per_page=${per_page}&sort=${sort}`;

    return rxAjax({
      endpoint,
      method: 'GET',
    })
    .map(data => {
      if (data.status === 200 && data.response) {
        return {
          type: ReferralConstants.GET_REFERRAL_HISTORY_SUCCESS,
          payload: { data: data.response, page },
          meta: { updatedAt: getUnixtime() },
        };
      }

      return {
        type: ReferralConstants.GET_REFERRAL_HISTORY_FAILURE,
        payload: { message: 'Algo de errado não está correto' },
        meta: { updatedAt: getUnixtime() },
      };
    })
    .takeUntil(action$.ofType(AppConstants.CANCEL_FETCH))
    .defaultIfEmpty({ type: ReferralConstants.GET_REFERRAL_HISTORY_CANCEL })
    .catch(error => ([
      {
        type: ReferralConstants.GET_REFERRAL_HISTORY_FAILURE,
        payload: { message: error.message, status: error.status },
        meta: { updatedAt: getUnixtime() },
      },
    ]));
  });
}
