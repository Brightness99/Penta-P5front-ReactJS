/* eslint-disable no-undef */
declare type ForgotPasswordType = {
  isRunning: boolean,
  isLoaded: boolean,
  data: { exists: boolean, passwordSet: boolean, type: 'email' | 'password' },
  rehydrated: boolean,
  updatedAt: number,
  error: ErrorType,
};
