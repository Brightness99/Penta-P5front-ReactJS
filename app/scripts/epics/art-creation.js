/**
 * @module Epics/ArtCreation
 * @desc User
 */
import { getUnixtime, rxAjax } from 'utils';
import { AppConstants, ArtCreationConstants } from 'constants/index';
import { push } from 'modules/ReduxRouter';

export function proposalsFetch(action$) {
  return action$.ofType(ArtCreationConstants.PROPOSALS_FETCH_REQUEST)
    .switchMap((action) => {
      const endpoint = `/v2/order_items/${action.payload.id}/art_creation/proposals`;
      return rxAjax({
        endpoint,
        method: 'GET',
      })
        .map(data => {
          if (data.status === 200 && data.response) {
            return {
              type: ArtCreationConstants.PROPOSALS_FETCH_SUCCESS,
              payload: data.response,
              meta: { updatedAt: getUnixtime() },
            };
          }

          return {
            type: ArtCreationConstants.PROPOSALS_FETCH_FAILURE,
            payload: { message: 'Algo de errado não está correto' },
            meta: { updatedAt: getUnixtime() },
          };
        })
        .takeUntil(action$.ofType(AppConstants.CANCEL_FETCH))
        .defaultIfEmpty({ type: ArtCreationConstants.PROPOSALS_FETCH_CANCEL })
        .catch(error => {
          if (error.status === 404) {
            push('/404');
          }

          return ([{
            type: ArtCreationConstants.PROPOSALS_FETCH_FAILURE,
            payload: { message: error.message, status: error.status },
            meta: { updatedAt: getUnixtime() },
          }]);
        });
    });
}

export function newProposalRequest(action$) {
  return action$.ofType(ArtCreationConstants.NEW_PROPOSAL_REQUEST_REQUEST)
    .switchMap((action) => {
      const endpoint = `/v2/order_items/${action.payload.order_item_id}/art_creation/proposals/${action.payload.proposal_id}/request_change`;
      return rxAjax({
        endpoint,
        payload: action.payload.customer_message,
        method: 'PUT',
      })
        .map(data => {
          if (data.status === 200) {
            return {
              type: ArtCreationConstants.NEW_PROPOSAL_REQUEST_SUCCESS,
              payload: {},
              meta: { updatedAt: getUnixtime() },
            };
          }
  
          return {
            type: ArtCreationConstants.NEW_PROPOSAL_REQUEST_FAILURE,
            payload: { message: 'Algo de errado não está correto' },
            meta: { updatedAt: getUnixtime() },
          };
        })
        .takeUntil(action$.ofType(AppConstants.CANCEL_FETCH))
        .defaultIfEmpty({ type: ArtCreationConstants.NEW_PROPOSAL_REQUEST_CANCEL })
        .catch(error => {
          if (error.status === 404) {
            push('/404');
          }

          return ([{
            type: ArtCreationConstants.NEW_PROPOSAL_REQUEST_FAILURE,
            payload: { message: error.message, status: error.status },
            meta: { updatedAt: getUnixtime() },
          }]);
        });
    });
}