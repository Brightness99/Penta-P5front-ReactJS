// @flow

import { REHYDRATE } from 'redux-persist/constants';
import { createReducer } from 'utils';

import { SocialLoginSettingsConstants } from 'constants/index';

export type SocialLoginSettingsState = {
  rehydrated: boolean,
  isRunning: boolean,
  isLoaded: boolean,
  error: boolean,
  message: string,
  socials: {
    facebook: {
      enabled: boolean,
      credentials: {
        app_id: string,
        secret_key: string,
      }
    },
    google: {
      enabled: boolean,
      credentials: {
        client_id: string,
        secret_key: string,
      }
    }
  },
  updatedAt: number,
};

export const socialLoginSettingsState: SocialLoginSettingsState = {
  rehydrated: false,
  isRunning: false,
  isLoaded: false,
  error: false,
  message: '',
  socials: {
    facebook: {
      enabled: false,
      credentials: {
        app_id: '',
        secret_key: '',
      },
    },
    google: {
      enabled: false,
      credentials: {
        client_id: '',
        secret_key: '',
      },
    },
  },
  updatedAt: 0,
};


export default {
  socialLoginSettings: createReducer(socialLoginSettingsState, {
    [REHYDRATE](state) {
      return {
        ...state,
        rehydrated: true,
      };
    },
    [SocialLoginSettingsConstants.SOCIAL_LOGIN_SETTINGS_REQUEST](state) {
      return {
        ...state,
        isRunning: true,
      };
    },
    [SocialLoginSettingsConstants.SOCIAL_LOGIN_SETTINGS_SUCCESS](state, action) {
      return {
        ...state,
        isRunning: false,
        isLoaded: true,
        socials: action.payload,
        updatedAt: action.meta.updatedAt,
      };
    },
    [SocialLoginSettingsConstants.SOCIAL_LOGIN_SETTINGS_FAILURE](state, action) {
      return {
        ...state,
        isRunning: false,
        error: true,
        message: action.payload.message,
        updatedAt: action.meta.updatedAt,
      };
    },
  }),
};
