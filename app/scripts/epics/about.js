/**
 * @module Epics/About
 * @desc About
 */
import { getUnixtime, rxAjax } from 'utils';
import { AppConstants, AboutConstants } from 'constants/index';
import { push } from 'modules/ReduxRouter';

export function aboutFetch(action$) {
  return action$.ofType(AboutConstants.ABOUT_FETCH_REQUEST)
    .switchMap(() => {
      const endpoint = '/v2/sobre-printi';

      return rxAjax({
        endpoint,
        method: 'GET',
      })
        .map(data => {
          if (data.status === 200 && data.response) {
            return {
              type: AboutConstants.ABOUT_FETCH_SUCCESS,
              payload: data.response,
              meta: { updatedAt: getUnixtime() },
            };
          }

          return {
            type: AboutConstants.ABOUT_FETCH_FAILURE,
            payload: { message: 'Algo de errado não está correto' },
            meta: { updatedAt: getUnixtime() },
          };
        })
        .takeUntil(action$.ofType(AppConstants.CANCEL_FETCH))
        .defaultIfEmpty({ type: AboutConstants.ABOUT_FETCH_CANCEL })
        .catch(error => {
          if (error.status === 404) {
            push('/404');
          }

          return ([{
            type: AboutConstants.ABOUT_FETCH_FAILURE,
            payload: { message: error.message, status: error.status },
            meta: { updatedAt: getUnixtime() },
          }]);
        });
    });
}
