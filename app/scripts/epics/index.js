/**
 * @module Epics/Root
 * @desc Root Epics
 */

import { combineEpics } from 'redux-observable';
import { userNewsletter, userSignIn } from './user';
import { productsFetch } from './products';
import { blogFetch } from './blog';
import {
  settingsFetch,
  settingsOptionsFetch,
  settingsSourceFetch,
  settingsZipcodeFetch,
  settingsMatrixFetch,
  prepressDownloadFetch
} from './settings';
import { localeFetch } from './locale';
import {
  cartBasicFetch,
  cartFetch,
  cartAddFetch,
  cartDeleteFetch,
  cartDuplicateFetch,
  cartVoucherAddFetch,
  cartVoucherRemoveFetch,
  cartPickupFetch,
  cartUpdateFetch,
  cartUpsellingDateFetch,
  cartUpsellingAddFetch
} from './cart';

import { contactFormSend } from './contact-form';

import {
  accountFetch,
  accountUpdate,
  accountAddressFetch,
  accountAddressCreate,
  accountAddressDelete,
  accountNotificationFetch,
  accountNotificationUpdate,
  accountSavedCreditCardFetch,
  accountSavedCreditCardDelete
} from './account';

import { termsFetch } from './terms';

export default combineEpics(
  userNewsletter,
  productsFetch,
  blogFetch,
  settingsFetch,
  settingsOptionsFetch,
  settingsSourceFetch,
  settingsZipcodeFetch,
  settingsMatrixFetch,
  prepressDownloadFetch,
  userSignIn,
  cartBasicFetch,
  cartFetch,
  cartAddFetch,
  cartDeleteFetch,
  cartDuplicateFetch,
  cartVoucherAddFetch,
  cartVoucherRemoveFetch,
  cartPickupFetch,
  cartUpdateFetch,
  cartUpsellingDateFetch,
  cartUpsellingAddFetch,
  localeFetch,
  contactFormSend,
  accountFetch,
  accountAddressFetch,
  accountUpdate,
  accountAddressCreate,
  accountAddressDelete,
  accountSavedCreditCardFetch,
  accountSavedCreditCardDelete,
  accountNotificationFetch,
  accountNotificationUpdate,
  termsFetch,
);
