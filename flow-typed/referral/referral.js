/* eslint-disable no-undef */
declare type ReferralType = {
  rehydrated: boolean,
  updatedAt: number,
  error: { message: string, status: string },
  isRunning: boolean,
  isLoaded: boolean,
  total_voucher_amount: number,
  data: { [key: number]: Array<ReferralVoucher> },
  total_count: number,
};

declare type ReferralVoucher = {
  voucher_id: string,
  voucher_amount: number,
  voucher_used_on_date: string,
  voucher_used_by_email_id: string,
  voucher_name: string,
  voucher_issued_date: string,
  voucher_expiry_date: string,
};

declare type ReferralHistoryOrder = 'desc' | 'asc';

declare type ReferralHistorySort = 'created_at';

declare type ReferralHistoryFieldName = 'page' | 'per_page' | 'order' | 'sort';

declare type ReferralHistoryFieldValue = number | ReferralHistoryOrder | ReferralHistorySort | string;
