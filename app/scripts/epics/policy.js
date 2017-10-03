/**
 * @module Epics/User
 * @desc User
 */
import { getUnixtime, rxAjax } from 'utils';
import { AppConstants, PolicyConstants } from 'constants/index';
import { push } from 'modules/ReduxRouter';

export function policyFetch(action$) {
  return action$.ofType(PolicyConstants.POLICY_FETCH_REQUEST)
    .switchMap(() => {
      const endpoint = '/v2/legal-content/privacy-policy';

      return rxAjax({
        endpoint,
        method: 'GET',
      })
        .map(data => {
          console.log('data ===>', data);
          if (data.status === 200 && data.response) {
            return {
              type: PolicyConstants.POLICY_FETCH_SUCCESS,
              payload: data.response,
              meta: { updatedAt: getUnixtime() },
            };
          }

          return {
            type: PolicyConstants.POLICY_FETCH_FAILURE,
            payload: { message: 'Algo de errado não está correto' },
            meta: { updatedAt: getUnixtime() },
          };
        })
        .takeUntil(action$.ofType(AppConstants.CANCEL_FETCH))
        .defaultIfEmpty({ type: PolicyConstants.POLICY_FETCH_CANCEL })
        .catch(error => {
          if (error.status === 404) {
            push('/404');
          }

          return ([{
            type: PolicyConstants.POLICY_FETCH_FAILURE,
            payload: { message: error.message, status: error.status },
            meta: { updatedAt: getUnixtime() },
          }]);
        });
    });
}
