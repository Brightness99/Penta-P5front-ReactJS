/**
 * @module Epics/Upload
 * @desc Upload
 */
import { getUnixtime, rxAjax, RxPlupload, PluploadConstants } from 'utils';
import { AppConstants, UploadConstants } from 'constants/index';
import { push } from 'modules/ReduxRouter';
import { Observable } from 'rxjs/Observable';
import 'rxjs/operator/do';

const uploader = new RxPlupload({
  uploadUrl: '/v2/upload',
  chunkSize: 1024 * 1024,
});

export function uploadFetch(action$) {
  return action$.ofType(UploadConstants.UPLOAD_FETCH_REQUEST)
    .switchMap(action => {
      let endpoint;
      if (action.payload.isAccount) {
        endpoint = `/v2/upload-de-arquivos?p1=${action.payload.itemId}`;
      } else {
        endpoint = `/v2/${action.payload.slug}/upload/${action.payload.itemId}?isVertical=${action.payload.isVertical}`;
      }
      return rxAjax({
        endpoint,
        method: 'GET',
      })
        .map(data => ({
          type: UploadConstants.UPLOAD_FETCH_SUCCESS,
          payload: data.response,
          meta: { updatedAt: getUnixtime() },
        }));
    })
    .takeUntil(action$.ofType(AppConstants.CANCEL_FETCH))
    .defaultIfEmpty({ type: UploadConstants.UPLOAD_FETCH_CANCEL })
    .catch(error => {
      if (error.status === 404) {
        push('/404');
      }

      return ([{
        type: UploadConstants.UPLOAD_FETCH_FAILURE,
        payload: { message: error.message, status: error.status },
        meta: { updatedAt: getUnixtime() },
      }]);
    });
}

export function uploadFinishRequest(action$) {
  return action$.ofType(UploadConstants.UPLOAD_FINISH_REQUEST)
    .switchMap(action => {
      let endpoint;
      if (action.payload.isAccount) {
        endpoint = `/v2/upload/order/${action.payload.itemId}`;
      } else {
        endpoint = `/v2/upload/cart/${action.payload.itemId}`;
      }

      return rxAjax({
        endpoint,
        payload: action.payload.request,
        method: 'POST',
      })
        .map(data => ({
          type: UploadConstants.UPLOAD_FINISH_SUCCESS,
          payload: data.response,
          meta: { updatedAt: getUnixtime() },
        }));
    })
    .takeUntil(action$.ofType(AppConstants.CANCEL_FETCH))
    .defaultIfEmpty({ type: UploadConstants.UPLOAD_FINISH_CANCEL })
    .catch(error => ([{
      type: UploadConstants.UPLOAD_FINISH_FAILURE,
      payload: { message: error.message, status: error.status },
      meta: { updatedAt: getUnixtime() },
    }]));
}

export function uploadSetOrientationRequest(action$) {
  return action$.ofType(UploadConstants.UPLOAD_SET_ORIENTATION_REQUEST)
    .switchMap(action => {
      let endpoint;
      if (action.payload.isAccount) {
        endpoint = `/v2/cimpress_upload/my_account/${action.payload.itemId}/is_vertical/${action.payload.isVertical}`;
      } else {
        endpoint = `/v2/cimpress_upload/funnel/${action.payload.itemId}/is_vertical/${action.payload.isVertical}`;
      }
      return rxAjax({
        endpoint,
        method: 'GET',
      })
        .map(data => ({
          type: UploadConstants.UPLOAD_SET_ORIENTATION_SUCCESS,
          payload: data.response,
          meta: { updatedAt: getUnixtime() },
        }));
    })
    .takeUntil(action$.ofType(AppConstants.CANCEL_FETCH))
    .defaultIfEmpty({ type: UploadConstants.UPLOAD_SET_ORIENTATION_CANCEL })
    .catch(error => ([{
      type: UploadConstants.UPLOAD_SET_ORIENTATION_FAILURE,
      payload: { message: error.message, status: error.status },
      meta: { updatedAt: getUnixtime() },
    }]));
}

export function uploadFileRequest(action$) {
  return action$.ofType(UploadConstants.UPLOAD_FILE_REQUEST)
    .switchMap(action => uploader.uploadFile(action.payload)
      .map(data => {
        switch (data.type) {
          case PluploadConstants.UPLOAD_PROGRESS:
            return {
              type: UploadConstants.UPLOAD_FILE_PROGRESS,
              payload: data.progress,
              meta: { updatedAt: getUnixtime() },
            };
          case PluploadConstants.UPLOAD_SUCCESS:
            return {
              type: UploadConstants.UPLOAD_FILE_SUCCESS,
              payload: JSON.parse(data.response),
              meta: { updatedAt: getUnixtime() },
            };
          case PluploadConstants.UPLOAD_FAILURE:
            return {
              type: UploadConstants.UPLOAD_FILE_FAILURE,
              payload: data.error,
              meta: { updatedAt: getUnixtime() },
            };
          default:
            return {
              type: UploadConstants.UPLOAD_FILE_FAILURE,
              payload: { message: 'Upload was abort' },
              meta: { updatedAt: getUnixtime() },
            };
        }
      })
    )
    .takeUntil(action$.ofType(AppConstants.CANCEL_FETCH));
}

export function uploadFileCancel(action$) {
  return action$.ofType(UploadConstants.UPLOAD_FILE_CANCEL)
    .switchMap(() => {
      uploader.cancelUpload();
      return Observable.of({
        type: UploadConstants.UPLOAD_FILE_CANCEL_SUCCESS,
      });
    }).takeUntil(action$.ofType(AppConstants.CANCEL_FETCH));
}
