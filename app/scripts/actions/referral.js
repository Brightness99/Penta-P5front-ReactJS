// @flow
import { ReferralConstants } from 'constants/referral';

export const sendReferralRequest = (customerId: string, emails: Array<string>) => ({
  type: ReferralConstants.SEND_REFERRAL_REQUEST,
  payload: {
    customerId,
    emails,
  },
});
