/* eslint-disable no-undef */
declare type UserType = {
  rehydrated: boolean,
  address: UserAddressType,
  authentication: UserAuthType,
  customerInfo: UserCustomerInfoType,
  isAuthorized: boolean,
  logout: UserLogoutType,
  newsletter: UserNewsLetterType,
  registration: UserRegistrationType,
  socialAuthentication: UserSocialAuthenticationType,
  socialRegistration: UserSocialRegistrationType,
  updatedAt: number,
};

declare type UserAddressType = {
  isZipcodeValid: boolean,
  zipcode: string,
  zipcodeErrorMessage: string,
};

declare type UserAuthType = {
  isRunning: boolean,
  error: ErrorType,
  message: string,
};

declare type UserCustomerInfoType = {
  admin_user_id: number | string,
  cloud_manager: number | string,
  email: string,
  first_name: string,
  id: number | string,
  last_name: string,
  orders_count: number,
  isRunning: boolean,
  isLoaded: boolean,
  error: ErrorType,
};

declare type UserLogoutType = {
  error: ErrorType,
  isRunning: boolean,
  message: string,
};

declare type UserNewsLetterType = {
  component: string,
  error: ErrorType,
  isRunning: boolean,
  message: string,
  subscribed: boolean,
};

declare type UserRegistrationType = {
  isRunning: boolean,
  error: ErrorType,
  message: string,
};

declare type UserSocialAuthenticationType = {
  isRunning: boolean,
  error: ErrorType,
  message: string,
  userNotFound: boolean,
};

declare type UserSocialRegistrationType = {
  isRunning: boolean,
  error: ErrorType,
  message: string,
};
