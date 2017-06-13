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


export function settingsOptionsFetch(action$) {
  return action$.ofType(SettingsConstants.SETTINGS_OPTIONS_FETCH_REQUEST)
    .switchMap(action => {
      const url = 'http://www.printi.com.br';
      const endpoint = `/v1/calculator/finalproducts/${action.payload.productId}/deny_rules/source/${action.payload.selectedSource}`;

      return rxAjax({
        url,
        endpoint,
        payload: {
          id: action.payload.partId,
          selection: Object.keys(action.payload.selection)
            .filter((item) => action.payload.selection[item] !== '')
            .reduce((prevValue, currentValue) => ({
              ...prevValue,
              [currentValue]: action.payload.selection[currentValue],
            }), {}),
          type: 'product_part',
          option: action.payload.option,
        },
        method: 'POST',
      })
        .map(data => {
          console.log(data);
          if (data.status === 200 && data.response) {
            return {
              type: SettingsConstants.SETTINGS_OPTIONS_FETCH_SUCCESS,
              payload: {
                ...data.response,
                partId: action.payload.partId,
              },
              meta: { updatedAt: getUnixtime() },
            };
          }

          return {
            type: SettingsConstants.SETTINGS_OPTIONS_FETCH_FAILURE,
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

export function settingsZipcodeFetch(action$) {
  return action$.ofType(SettingsConstants.SETTINGS_ZIPCODE_FETCH_REQUEST)
    .switchMap(action => {
      const url = 'https://api.intelipost.com.br/api';
      const endpoint = `/v1/cep_location/address_complete/${action.payload.zipcode}`;

      return rxAjax({
        url,
        endpoint,
        headers: {
          'api-key': '3d26e268e228a9555a13f90da2afc8392203bf0d668fafd1f04e0185531826f8',
        },
        method: 'GET',
      })
        .map(data => {
          if (data.status === 200 && data.response) {
            return {
              type: SettingsConstants.SETTINGS_ZIPCODE_FETCH_SUCCESS,
              payload: {
                ...data.response,
                zipcode: action.payload.zipcode,
              },
              meta: { updatedAt: getUnixtime() },
            };
          }

          return {
            type: SettingsConstants.SETTINGS_ZIPCODE_FETCH_FAILURE,
            payload: { message: 'Algo de errado não está correto' },
            meta: { updatedAt: getUnixtime() },
          };
        })
        .takeUntil(action$.ofType(AppConstants.CANCEL_FETCH))
        .defaultIfEmpty({ type: SettingsConstants.SETTINGS_ZIPCODE_FETCH_CANCEL })
        .catch(error => {
          if (error.status === 404) {
            push('/404');
          }

          return ([{
            type: SettingsConstants.SETTINGS_ZIPCODE_FETCH_FAILURE,
            payload: { message: error.message, status: error.status },
            meta: { updatedAt: getUnixtime() },
          }]);
        });
    });
}

export function settingsMatrixFetch(action$, store) {
  return action$.ofType(SettingsConstants.SETTINGS_ZIPCODE_FETCH_SUCCESS)
    .switchMap(action => {
      const productSettings = store.getState().productSettings;
      const endpoint = `/v1/calculator/finalproducts/${productSettings.finalProduct.id}/matrix`;

      return rxAjax({
        endpoint,
        payload: {
          combination: productSettings.selection,
          source: productSettings.source.selectedSource,
          zipcode: action.payload.zipcode,
        },
        method: 'POST',
      })
        .map(data => {
          if (data.status === 200 && data.response) {
            return {
              type: SettingsConstants.SETTINGS_MATRIX_FETCH_SUCCESS,
              payload: {
                ...data.response,
              },
              meta: { updatedAt: getUnixtime() },
            };
          }

          return {
            type: SettingsConstants.SETTINGS_MATRIX_FETCH_FAILURE,
            payload: { message: 'Algo de errado não está correto' },
            meta: { updatedAt: getUnixtime() },
          };
        })
        .takeUntil(action$.ofType(AppConstants.CANCEL_FETCH))
        .defaultIfEmpty({ type: SettingsConstants.SETTINGS_MATRIX_FETCH_CANCEL })
        .catch(error => {
          if (error.status === 404) {
            push('/404');
          }

          return ([{
            type: SettingsConstants.SETTINGS_MATRIX_FETCH_FAILURE,
            payload: { message: error.message, status: error.status },
            meta: { updatedAt: getUnixtime() },
          }]);
        });
    });
}
