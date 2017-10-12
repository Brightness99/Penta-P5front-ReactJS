/**
 * @module Epics/Upload
 * @desc Upload
 */
import { getUnixtime, rxAjax, RxPlupload, PluploadConstants } from 'utils';
import { AppConstants, UploadConstants } from 'constants/index';
import { push } from 'modules/ReduxRouter';
import 'rxjs/operator/do';

const uploader = new RxPlupload({
  uploadUrl: '/v2/upload',
  chunkSize: 1024 * 1024,
});

export function uploadFetch(action$) {
  return action$.ofType(UploadConstants.UPLOAD_FETCH_REQUEST)
    .switchMap(action => {
      const endpoint = `/v2/${action.payload.slug}/upload/${action.payload.itemId}`;

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
                payload: data.response,
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
                payload: data.error,
                meta: { updatedAt: getUnixtime() },
              };
          }
        }))
        .takeUntil(action$.ofType(AppConstants.CANCEL_FETCH))
        .defaultIfEmpty({ type: UploadConstants.UPLOAD_FETCH_CANCEL });
}

export function uploadFileCancel(action$) {
  return action$.ofType(UploadConstants.UPLOAD_FILE_CANCEL)
    .do(() => uploader.cancelUpload());
}
