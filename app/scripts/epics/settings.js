/**
 * @module Epics/User
 * @desc User
 */
import { getUnixtime, rxAjax } from 'utils';
import { AppConstants, SettingsConstants } from 'constants/index';
import { push } from 'modules/ReduxRouter';

export function settingsFetch(action$) {
  return action$.ofType(SettingsConstants.SETTINGS_FETCH_REQUEST)
    .switchMap(action => {
      const endpoint = `/v1/product-settings/${action.payload.slug}`;

      return rxAjax({
        endpoint,
        method: 'GET',
      })
        .map(data => {
          if (data.status === 200 && data.response) {
            return {
              type: SettingsConstants.SETTINGS_FETCH_SUCCESS,
              payload: data.response,
              meta: { updatedAt: getUnixtime() },
            };
          }

          return {
            type: SettingsConstants.SETTINGS_FETCH_FAILURE,
            payload: { message: 'Algo de errado não está correto' },
            meta: { updatedAt: getUnixtime() },
          };
        })
        .takeUntil(action$.ofType(AppConstants.CANCEL_FETCH))
        .defaultIfEmpty({ type: SettingsConstants.SETTINGS_FETCH_CANCEL })
        .catch(error => {
          if (error.status === 404) {
            push('/404');
          }

          return ([{
            type: SettingsConstants.SETTINGS_FETCH_FAILURE,
            payload: { message: error.message, status: error.status },
            meta: { updatedAt: getUnixtime() },
          }]);
        });
    });
}

export function settingsSourceFetch(action$) {
  return action$.ofType(SettingsConstants.SETTINGS_SOURCE_FETCH_REQUEST)
    .switchMap(action => {
      const endpoint = `/v1/calculator/finalproducts/${action.payload.id}/source/${action.payload.source}`;

      return rxAjax({
        endpoint,
        method: 'GET',
      })
        .map(data => {
          if (data.status === 200 && data.response) {
            return {
              type: SettingsConstants.SETTINGS_SOURCE_FETCH_SUCCESS,
              payload: {
                ...data.response,
                selectedSource: action.payload.source,
              },
              meta: { updatedAt: getUnixtime() },
            };
          }

          return {
            type: SettingsConstants.SETTINGS_SOURCE_FETCH_FAILURE,
            payload: { message: 'Algo de errado não está correto' },
            meta: { updatedAt: getUnixtime() },
          };
        })
        .takeUntil(action$.ofType(AppConstants.CANCEL_FETCH))
        .defaultIfEmpty({ type: SettingsConstants.SETTINGS_SOURCE_FETCH_CANCEL })
        .catch(error => {
          if (error.status === 404) {
            push('/404');
          }

          return ([{
            type: SettingsConstants.SETTINGS_SOURCE_FETCH_FAILURE,
            payload: { message: error.message, status: error.status },
            meta: { updatedAt: getUnixtime() },
          }]);
        });
    });
}


// /v1/calculator/finalproducts/fstbro/deny_rules/source/upload

