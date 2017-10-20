/**
 * @module Epics/Guide
 * @desc Guide
 */
import { getUnixtime, rxAjax } from 'utils';
import { AppConstants, GuideConstants } from 'constants/index';
import { push } from 'modules/ReduxRouter';

export function guideFetch(action$) {
  return action$.ofType(GuideConstants.GUIDE_FETCH_REQUEST)
    .switchMap(action => {
      const endpoint = (action.payload.slug === 'guia-de-impressao' || action.payload.slug === '') ? '/v2/guia-de-impressao' : `/v2/guia-de-impressao/${action.payload.slug}`;

      return rxAjax({
        endpoint,
        method: 'GET',
      })
        .map(data => {
          if (data.status === 200 && data.response) {
            return {
              type: GuideConstants.GUIDE_FETCH_SUCCESS,
              payload: data.response,
              meta: { updatedAt: getUnixtime() },
            };
          }

          return {
            type: GuideConstants.GUIDE_FETCH_FAILURE,
            payload: { message: 'Algo de errado não está correto' },
            meta: { updatedAt: getUnixtime() },
          };
        })
        .takeUntil(action$.ofType(AppConstants.CANCEL_FETCH))
        .defaultIfEmpty({ type: GuideConstants.GUIDE_FETCH_CANCEL })
        .catch(error => {
          if (error.status === 404) {
            push('/404');
          }

          return ([{
            type: GuideConstants.GUIDE_FETCH_FAILURE,
            payload: { message: error.message, status: error.status },
            meta: { updatedAt: getUnixtime() },
          }]);
        });
    });
}
