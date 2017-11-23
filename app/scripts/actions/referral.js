// @flow
import { ReferralConstants } from 'constants/referral';

export const sendReferralRequest = (customerId: string, emails: Array<string>) => ({
  type: ReferralConstants.SEND_REFERRAL_REQUEST,
  payload: {
    customerId,
    emails,
  },
});

export const getReferralSum = () => ({
  type: ReferralConstants.GET_REFERRAL_SUM,
  payload: {},
});

type ReferralHistoryRequestType = {
  order: string,
  page: number,
  per_page: number,
  sort: string,
};

export const getReferralHistory = ({ order, page, per_page, sort }: ReferralHistoryRequestType) => ({
  type: ReferralConstants.GET_REFERRAL_HISTORY,
  payload: {
    order,
    page,
    per_page,
    sort,
  },
});
