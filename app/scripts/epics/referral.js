// @flow
/**
 * @module Epics/Referral
 * @desc Referral
 */
import { getUnixtime, rxAjax } from 'utils';
import { AppConstants, ReferralConstants } from 'constants/index';

export function referralSendRequest(action$) {
  return action$.ofType(ReferralConstants.SEND_REFERRAL_REQUEST)
  .switchMap(action => {
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
