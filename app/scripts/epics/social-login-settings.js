/**
 * @module Epics/SocialLoginSettings
 * @desc SocialLoginSettings
 */
import { getUnixtime, rxAjax } from 'utils';
import { AppConstants, SocialLoginSettingsConstants } from 'constants/index';

import { Observable } from 'rxjs/Observable';

export function socialLoginSettingsFetch(action$) {
  return action$.ofType(SocialLoginSettingsConstants.SOCIAL_LOGIN_SETTINGS_REQUEST)
    .switchMap(() => {
      const endpoint = '/v2/config/social-login';

      return rxAjax({
        endpoint,
        method: 'GET',
      });
    })
      .map(data => ({
        type: SocialLoginSettingsConstants.SOCIAL_LOGIN_SETTINGS_SUCCESS,
        payload: data.response,
        meta: { updatedAt: getUnixtime() },
      }))
      .takeUntil(action$.ofType(AppConstants.CANCEL_FETCH))
      .defaultIfEmpty({ type: SocialLoginSettingsConstants.SOCIAL_LOGIN_SETTINGS_CANCEL })
      .catch(error => [
        {
          type: SocialLoginSettingsConstants.SOCIAL_LOGIN_SETTINGS_FAILURE,
          payload: { message: error.message, status: error.status },
          meta: { updatedAt: getUnixtime() },
        },
      ]);
}
