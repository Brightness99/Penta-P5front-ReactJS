/**
 * @module Epics/User
 * @desc User
 */
import { getUnixtime, rxAjax } from 'utils';
import { AppConstants, SettingsConstants } from 'constants/index';
import { prePressTemplateFetch } from 'actions';
import { replace } from 'modules/ReduxRouter';

export function settingsFetch(action$) {
  return action$.ofType(SettingsConstants.SETTINGS_FETCH_REQUEST)
    .switchMap(action => {
      const endpoint = `/v2/product/${action.payload.slug}/settings`;

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
            replace('/404');
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
      const endpoint = `/v2/calculator/finalproducts/${action.payload.id}/source/${action.payload.source}`;

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
            replace('/404');
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
      const endpoint = `/v1/calculator/finalproducts/${action.payload.productId}/deny_rules/source/${action.payload.selectedSource}`;
      const selection = Object.keys(action.payload.selection)
        .filter((item) => action.payload.selection[item] !== '')
        .reduce((prevValue, currentValue) => ({
          ...prevValue,
          [currentValue]: action.payload.selection[currentValue],
        }), {});
      return rxAjax({
        endpoint,
        payload: {
          id: action.payload.partId,
          selection,
          type: 'product_part',
          option: action.payload.option,
        },
        method: 'POST',
      })
        .map(data => {
          if (data.status === 200 && data.response) {
            return {
              type: SettingsConstants.SETTINGS_OPTIONS_FETCH_SUCCESS,
              payload: {
                ...data.response,
                partId: action.payload.partId,
                selection,
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
        .catch(error => (
          [{
            type: SettingsConstants.SETTINGS_SOURCE_FETCH_FAILURE,
            payload: { message: error.message, status: error.status },
            meta: { updatedAt: getUnixtime() },
          }]
        ));
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
          if (data.status === 200 && data.response.status === "OK" && data.response.messages.length === 0) {
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
            payload: {
              zipcode: action.payload.zipcode,
              message: data.response.messages[0].text
            },
            meta: { updatedAt: getUnixtime() },
          };
        })
        .takeUntil(action$.ofType(AppConstants.CANCEL_FETCH))
        .defaultIfEmpty({ type: SettingsConstants.SETTINGS_ZIPCODE_FETCH_CANCEL })
        .catch(error => (
          [{
            type: SettingsConstants.SETTINGS_ZIPCODE_FETCH_FAILURE,
            payload: { message: error.message, status: error.status },
            meta: { updatedAt: getUnixtime() },
          }]
        ));
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
        .catch(error => (
          [{
            type: SettingsConstants.SETTINGS_MATRIX_FETCH_FAILURE,
            payload: { message: error.message, status: error.status },
            meta: { updatedAt: getUnixtime() },
          }]
        ));
    });
}

export function settingsPrePressFetch(action$, store) {
  return action$.ofType(SettingsConstants.PRE_PRESS_TEMPLATE_FETCH_REQUEST)
    .switchMap(action => {
      const productSettings = store.getState().productSettings;
      const endpoint = `/v1/prepress_template/download_options/${productSettings.finalProduct.id}`;

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
        .catch(error => (
          [{
            type: SettingsConstants.SETTINGS_MATRIX_FETCH_FAILURE,
            payload: { message: error.message, status: error.status },
            meta: { updatedAt: getUnixtime() },
          }]
        ));
    });
}

export function prepressDownloadFetch(action$, store) {
  return action$.ofType(SettingsConstants.PRE_PRESS_DOWNLOAD_FETCH_REQUEST)
    .switchMap(action => {
      const endpoint = `/v1/prepress_template/filepackage_download/${action.payload.extension}/${action.payload.orientation}`;
      const parts = store.getState().productSettings.templates.parts;

      return rxAjax({
        endpoint,
        payload: {
          packageName: action.payload.fileName,
          parts,
        },
        method: 'POST',
      })
        .map(data => {
          if (data.status === 200 && data.response) {
            return {
              type: SettingsConstants.PRE_PRESS_DOWNLOAD_FETCH_SUCCESS,
              payload: {
                extension: action.payload.extension,
                orientation: action.payload.orientation,
                ...data.response,
              },
              meta: { updatedAt: getUnixtime() },
            };
          }

          return {
            type: SettingsConstants.PRE_PRESS_DOWNLOAD_FETCH_FAILURE,
            payload: { message: 'Algo de errado não está correto' },
            meta: { updatedAt: getUnixtime() },
          };
        })
        .takeUntil(action$.ofType(AppConstants.CANCEL_FETCH))
        .defaultIfEmpty({ type: SettingsConstants.PRE_PRESS_DOWNLOAD_FETCH_CANCEL })
        .catch(error => (
          [{
            type: SettingsConstants.PRE_PRESS_DOWNLOAD_FETCH_FAILURE,
            payload: { message: error.message, status: error.status },
            meta: { updatedAt: getUnixtime() },
          }]
        ));
    });
}
