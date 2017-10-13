/**
 * @module Epics/Root
 * @desc Root Epics
 */

import { combineEpics } from 'redux-observable';
import {
  userNewsletter,
  userSignIn,
  userSignUp,
  userLogOut,
  userAuthValidate,
  userSocialSignIn,
  userSocialSignUp } from './user';
import { productsFetch } from './products';
import { productCategoriesFetch } from './header';
import { blogFetch } from './blog';
import { printiPressFetch } from './printi-press';
import { glossarySlugFetch, glossaryFetch } from './glossary';
import { siteMapFetch } from './site-map';
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
import { socialLoginSettingsFetch } from './social-login-settings';

import {
  accountFetch,
  accountUpdate,
  accountAddressFetch,
  accountAddressCreate,
  accountAddressDelete,
  accountNotificationFetch,
  accountNotificationUpdate,
  accountSavedCreditCardFetch,
  accountSavedCreditCardDelete,
  accountOrderDetailFetch,
  accountOrderFetch,
} from './account';

import {
  successfulPurchaseFetch,
} from './successful-purchase';

import { policyFetch } from './policy';
import { termsFetch } from './terms';
import { aboutFetch } from './about';
import {
  fileMountFetch,
  fileMountItemFetch
} from './file-mount';
import { guideFetch } from './guide';

export default combineEpics(
  userNewsletter,
  productsFetch,
  blogFetch,
  glossarySlugFetch,
  glossaryFetch,
  settingsFetch,
  settingsOptionsFetch,
  settingsSourceFetch,
  settingsZipcodeFetch,
  settingsMatrixFetch,
  prepressDownloadFetch,
  userSignIn,
  userSignUp,
  userSocialSignIn,
  userSocialSignUp,
  userLogOut,
  userAuthValidate,
  printiPressFetch,
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
  socialLoginSettingsFetch,
  accountAddressCreate,
  accountAddressDelete,
  accountSavedCreditCardFetch,
  accountSavedCreditCardDelete,
  accountNotificationFetch,
  accountNotificationUpdate,
  accountOrderDetailFetch,
  accountOrderFetch,
  policyFetch,
  termsFetch,
  aboutFetch,
  productCategoriesFetch,
  successfulPurchaseFetch,
  siteMapFetch,
  fileMountFetch,
  fileMountItemFetch,
  guideFetch
);
