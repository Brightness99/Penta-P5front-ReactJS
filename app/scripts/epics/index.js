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
  userSocialSignUp
} from './user';
import { productsFetch } from './products';
import { productCategoriesFetch } from './header';
import { blogFetch } from './blog';
import { printiPressFetch } from './printi-press';
import { glossarySlugFetch, glossaryFetch } from './glossary';
import {
  uploadFetch,
  uploadFileRequest,
  uploadFileCancel,
  uploadFinishRequest,
  uploadSetOrientationRequest
} from './upload';
import { siteMapFetch } from './site-map';
import {
  settingsFetch,
  settingsOptionsFetch,
  settingsSourceFetch,
  settingsZipcodeFetch,
  settingsMatrixFetch,
  prepressDownloadFetch,
  pickupPlacesFetch,
  settingsAdditionalOptionsFetch,
  settingsPrePressFetch,
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
  accountAddressUpdate,
  accountAddressDelete,
  accountNotificationFetch,
  accountNotificationUpdate,
  accountSavedCreditCardFetch,
  accountSavedCreditCardDelete,
  accountOrderDetailFetch,
  accountOrderFetch,
  zipcodeValidate,
  accountLoyaltyFetch,
  accountSenderAddressRequest
} from './account';

import {
  successfulPurchaseFetch
} from './successful-purchase';

import { policyFetch } from './policy';
import { termsFetch } from './terms';
import {
  proposalsFetch,
  newProposalRequest,
  approveProposalRequest,
  fetchSingleFileRequest,
  saveBriefing,
  updateBriefing,
  briefingDetailsFetch,
  removeFile,
  deleteBriefing,
  finishUploadFiles
} from './art-creation';

import {
  templatesFetch,
  fetchTemplateById,
  sendDownloadTemplatesRequest,
  fetchTemplate
} from './templates';

import { aboutFetch } from './about';
import {
  fileMountFetch
} from './file-mount';
import { guideFetch } from './guide';

import {
  referralSendRequest,
  getReferralVoucherSum,
  getReferralHistory
} from './referral';

import { resetPassword, setNewPassword, getExpiredInfo } from './forgot-password';

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
  settingsAdditionalOptionsFetch,
  prepressDownloadFetch,
  settingsPrePressFetch,
  pickupPlacesFetch,
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
  accountAddressUpdate,
  accountAddressDelete,
  accountSavedCreditCardFetch,
  accountSavedCreditCardDelete,
  accountNotificationFetch,
  accountNotificationUpdate,
  accountOrderDetailFetch,
  accountOrderFetch,
  zipcodeValidate,
  accountLoyaltyFetch,
  accountSenderAddressRequest,
  policyFetch,
  termsFetch,
  productCategoriesFetch,
  uploadFetch,
  uploadFileRequest,
  uploadFileCancel,
  uploadFinishRequest,
  uploadSetOrientationRequest,
  aboutFetch,
  productCategoriesFetch,
  proposalsFetch,
  newProposalRequest,
  approveProposalRequest,
  fetchSingleFileRequest,
  successfulPurchaseFetch,
  siteMapFetch,
  fileMountFetch,
  guideFetch,
  templatesFetch,
  fetchTemplateById,
  sendDownloadTemplatesRequest,
  fetchTemplate,
  referralSendRequest,
  resetPassword,
  setNewPassword,
  getExpiredInfo,
  saveBriefing,
  updateBriefing,
  briefingDetailsFetch,
  removeFile,
  deleteBriefing,
  finishUploadFiles,
  getReferralVoucherSum,
  getReferralHistory,
);
