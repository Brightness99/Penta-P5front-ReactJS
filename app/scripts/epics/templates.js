// @flow
import { getUnixtime, rxAjax } from 'utils';
import { AppConstants, TemplatesConstants } from 'constants/index';
import { push } from 'modules/ReduxRouter';

export function templatesFetch(action$) {
  return action$.ofType(TemplatesConstants.TEMPLATES_FETCH_REQUEST)
  .switchMap(() => {
    const endpoint = '/v2/prepress_template/get_product_list';
    return rxAjax({
      endpoint,
      method: 'GET',
    })
    .map(data => {
      if (data.status === 200 && data.response) {
        return {
          type: TemplatesConstants.TEMPLATES_FETCH_SUCCESS,
          payload: data.response,
          meta: { updatedAt: getUnixtime() },
        };
      }

      return {
        type: TemplatesConstants.TEMPLATES_FETCH_FAILURE,
        payload: { message: 'Algo de errado não está correto' },
        meta: { updatedAt: getUnixtime() },
      };
    })
    .takeUntil(action$.ofType(AppConstants.CANCEL_FETCH))
    .defaultIfEmpty({ type: TemplatesConstants.TEMPLATES_FETCH_CANCEL })
    .catch(error => {
      if (error.status === 404) {
        push('/404');
      }

      return ([
        {
          type: TemplatesConstants.TEMPLATES_FETCH_FAILURE,
          payload: { message: error.message, status: error.status },
          meta: { updatedAt: getUnixtime() },
        },
      ]);
    });
  });
}

export function fetchTemplateById(action$) {
  return action$.ofType(TemplatesConstants.FETCH_TEMPLATE_DETAILS_BY_ID_REQUEST)
  .switchMap((action) => {
    const finalId = action.payload;
    const endpoint = `/v2/prepress_template/get_variant_combination/${finalId}`;
    return rxAjax({
      endpoint,
      method: 'GET',
    })
    .map(data => {
      if (data.status === 200 && data.response) {
        return {
          type: TemplatesConstants.FETCH_TEMPLATE_DETAILS_BY_ID_SUCCESS,
          payload: {
            finalId,
            productParts: data.response,
          },
          meta: { updatedAt: getUnixtime() },
        };
      }

      return {
        type: TemplatesConstants.FETCH_TEMPLATE_DETAILS_BY_ID_FAILURE,
        payload: { message: 'Algo de errado não está correto' },
        meta: { updatedAt: getUnixtime() },
      };
    })
    .takeUntil(action$.ofType(AppConstants.CANCEL_FETCH))
    .defaultIfEmpty({ type: TemplatesConstants.FETCH_TEMPLATE_DETAILS_BY_ID_CANCEL })
    .catch(error => {
      if (error.status === 404) {
        push('/404');
      }

      return ([
        {
          type: TemplatesConstants.FETCH_TEMPLATE_DETAILS_BY_ID_FAILURE,
          payload: { message: error.message, status: error.status },
          meta: { updatedAt: getUnixtime() },
        },
      ]);
    });
  });
}

export function sendDownloadTemplatesRequest(action$) {
  return action$.ofType(TemplatesConstants.FETCH_DOWNLOAD_TEMPLATES)
  .switchMap((action) => {
    const { finalId, data } = action.payload;
    const endpoint = `/v2/prepress_template/download_options/${finalId}`;
    return rxAjax({
      endpoint,
      payload: data,
      method: 'POST',
    })
    .map(resData => {
      if (resData.status === 200 && resData.response) {
        return {
          type: TemplatesConstants.FETCH_DOWNLOAD_TEMPLATES_SUCCESS,
          payload: resData.response,
          meta: { updatedAt: getUnixtime() },
        };
      }

      return {
        type: TemplatesConstants.FETCH_DOWNLOAD_TEMPLATES_FAILURE,
        payload: { message: 'Algo de errado não está correto' },
        meta: { updatedAt: getUnixtime() },
      };
    })
    .takeUntil(action$.ofType(AppConstants.CANCEL_FETCH))
    .defaultIfEmpty({ type: TemplatesConstants.FETCH_DOWNLOAD_TEMPLATES_CANCEL })
    .catch(error => {
      if (error.status === 404) {
        push('/404');
      }

      return ([
        {
          type: TemplatesConstants.FETCH_DOWNLOAD_TEMPLATES_FAILURE,
          payload: { message: error.message, status: error.status },
          meta: { updatedAt: getUnixtime() },
        },
      ]);
    });
  });
}

export function fetchTemplate(action$) {
  return action$.ofType(TemplatesConstants.FETCH_TEMPLATE)
  .switchMap((action) => {
    const { file, orientation, data } = action.payload;
    const endpoint = `/v2/prepress_template/filepackage_download/${file}/${orientation}`;
    return rxAjax({
      endpoint,
      payload: data,
      method: 'POST',
    })
    .map(resData => {
      if (resData.status === 200 && resData.response) {
        return {
          type: TemplatesConstants.FETCH_TEMPLATE_SUCCESS,
          payload: {
            file,
            orientation,
            response: resData.response,
          },
          meta: { updatedAt: getUnixtime() },
        };
      }

      return {
        type: TemplatesConstants.FETCH_TEMPLATE_FAILURE,
        payload: { message: 'Algo de errado não está correto' },
        meta: { updatedAt: getUnixtime() },
      };
    })
    .takeUntil(action$.ofType(AppConstants.CANCEL_FETCH))
    .defaultIfEmpty({ type: TemplatesConstants.FETCH_TEMPLATE_CANCEL })
    .catch(error => {
      if (error.status === 404) {
        push('/404');
      }

      return ([
        {
          type: TemplatesConstants.FETCH_TEMPLATE_FAILURE,
          payload: { message: error.message, status: error.status },
          meta: { updatedAt: getUnixtime() },
        },
      ]);
    });
  });
}
