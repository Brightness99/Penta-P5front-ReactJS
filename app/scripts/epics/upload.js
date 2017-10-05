/**
 * @module Epics/Upload
 * @desc Upload
 */
import { getUnixtime, rxAjax } from 'utils';
import { AppConstants, UploadConstants } from 'constants/index';
import { push } from 'modules/ReduxRouter';

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
