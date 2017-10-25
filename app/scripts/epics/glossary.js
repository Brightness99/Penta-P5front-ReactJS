/**
 * @module Epics/Glossary
 * @desc Glossary
 */
import { getUnixtime, rxAjax } from 'utils';
import { AppConstants, GlossaryConstants } from 'constants/index';
import { push } from 'modules/ReduxRouter';


export function glossaryFetch(action$) {
  return action$.ofType(GlossaryConstants.GLOSSARY_FETCH_REQUEST)
    .switchMap(action => {
      const endpoint = '/v2/glossario';

      return rxAjax({
        endpoint,
        payload: action.payload,
        method: 'GET',
      })
        .map(data => ({
          type: GlossaryConstants.GLOSSARY_FETCH_SUCCESS,
          payload: data.response,
          meta: { updatedAt: getUnixtime() },
        }))
        .takeUntil(action$.ofType(AppConstants.CANCEL_FETCH))
        .defaultIfEmpty({ type: GlossaryConstants.GLOSSARY_FETCH_CANCEL })
        .catch(error => [
          {
            type: GlossaryConstants.GLOSSARY_FETCH_FAILURE,
            payload: { message: error.message, status: error.status },
            meta: { updatedAt: getUnixtime() },
          },
        ]);
    });
}

export function glossarySlugFetch(action$) {
  return action$.ofType(GlossaryConstants.GLOSSARY_SLUG_FETCH_REQUEST)
    .switchMap(action => {
      const endpoint = `/v2/glossario/${action.payload.slug}`;

      return rxAjax({
        endpoint,
        payload: action.payload,
        method: 'GET',
      })
        .map(data => ({
          type: GlossaryConstants.GLOSSARY_SLUG_FETCH_SUCCESS,
          payload: data.response,
          meta: { updatedAt: getUnixtime() },
        }))
        .takeUntil(action$.ofType(AppConstants.CANCEL_FETCH))
        .defaultIfEmpty({ type: GlossaryConstants.GLOSSARY_SLUG_FETCH_CANCEL })
        .catch(error => {
          if (error.status === 404) {
            push('/404');
          }

          return ([{
            type: GlossaryConstants.GLOSSARY_SLUG_FETCH_FAILURE,
            payload: { message: error.message, status: error.status },
            meta: { updatedAt: getUnixtime() },
          }]);
        });
    });
}
