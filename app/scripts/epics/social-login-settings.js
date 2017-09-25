/**
 * @module Epics/SocialLoginSettings
 * @desc SocialLoginSettings
 */
import { getUnixtime, rxAjax } from 'utils';
import { AppConstants, SocialLoginSettingsConstants } from 'constants/index';

import { Observable } from 'rxjs/Observable';

export function socialLoginSettingsFetch(action$) {
  return action$.ofType(SocialLoginSettingsConstants.SOCIAL_LOGIN_SETTINGS_REQUEST)
    .switchMap(action => Observable.of({
      response: {
        facebook: {
          enabled: true,
          credentials: {
            app_id: '1833429110272036',
            secret_key: 'd552eb518ba7b7c98a1dcdd5f181ac8e',
          },
        },
        google: {
          enabled: true,
          credentials: {
            client_id: '199766403050-gtunht4rh5ia1cvkak16d8e2ia8mgskk.apps.googleusercontent.com',
            secret_key: 'nix4ftXQa2yQN-pDabk0y6vR',
          },
        },
      },
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
      ]));
}
