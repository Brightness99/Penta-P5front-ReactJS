/**
 * @module Epics/FileMount
 * @desc FileMount
 */
import { getUnixtime, rxAjax } from 'utils';
import { AppConstants, FileMountConstants } from 'constants/index';
import { push } from 'modules/ReduxRouter';

export function fileMountFetch(action$) {
  return action$.ofType(FileMountConstants.FILE_MOUNT_FETCH_REQUEST)
    .switchMap(action => {
      const endpoint = (action.payload.slug === undefined || action.payload.slug === '') ? '/v2/montagem-do-arquivo' : `/v2/montagem-do-arquivo/${action.payload.slug}`;

      return rxAjax({
        endpoint,
        method: 'GET',
      })
        .map(data => {
          if (data.status === 200 && data.response) {
            return {
              type: FileMountConstants.FILE_MOUNT_FETCH_SUCCESS,
              payload: data.response,
              meta: { updatedAt: getUnixtime() },
            };
          }

          return {
            type: FileMountConstants.FILE_MOUNT_FETCH_FAILURE,
            payload: { message: 'Algo de errado não está correto' },
            meta: { updatedAt: getUnixtime() },
          };
        })
        .takeUntil(action$.ofType(AppConstants.CANCEL_FETCH))
        .defaultIfEmpty({ type: FileMountConstants.FILE_MOUNT_FETCH_CANCEL })
        .catch(error => {
          if (error.status === 404) {
            push('/404');
          }

          return ([{
            type: FileMountConstants.FILE_MOUNT_FETCH_FAILURE,
            payload: { message: error.message, status: error.status },
            meta: { updatedAt: getUnixtime() },
          }]);
        });
    });
}

