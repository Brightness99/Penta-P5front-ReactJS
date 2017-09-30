// @flow
/**
 * @module Actions/SocialLoginSettings
 * @desc Actions for Social login settings
 */

import { SocialLoginSettingsConstants } from 'constants/index';

/**
 * Fetching social login settings
 *
 * @returns {Object}
 */
export function socialLoginSettingsFetch(): Object {
  return {
    type: SocialLoginSettingsConstants.SOCIAL_LOGIN_SETTINGS_REQUEST,
    payload: {},
  };
}
