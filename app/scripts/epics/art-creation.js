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

export function approveProposalRequest(action$) {
  return action$.ofType(ArtCreationConstants.APPROVE_PROPOSAL_REQUEST)
    .switchMap((action) => {
      const endpoint = `/v2/order_items/${action.payload.order_item_id}/art_creation/proposals/${action.payload.proposal_id}/accept`;
      return rxAjax({
        endpoint,
        payload: {},
        method: 'PUT',
      })
        .map(data => {
          if (data.status === 200 || data.status === 204) {
            return {
              type: ArtCreationConstants.APPROVE_PROPOSAL_SUCCESS,
              payload: {},
              meta: { updatedAt: getUnixtime() },
            };
          }
  
          return {
            type: ArtCreationConstants.APPROVE_PROPOSAL_FAILURE,
            payload: { message: 'Algo de errado não está correto' },
            meta: { updatedAt: getUnixtime() },
          };
        })
        .takeUntil(action$.ofType(AppConstants.CANCEL_FETCH))
        .defaultIfEmpty({ type: ArtCreationConstants.APPROVE_PROPOSAL_CANCEL })
        .catch(error => {
          if (error.status === 404) {
            push('/404');
          }

          return ([{
            type: ArtCreationConstants.APPROVE_PROPOSAL_FAILURE,
            payload: { message: error.message, status: error.status },
            meta: { updatedAt: getUnixtime() },
          }]);
        });
    });
}

export function fetchFileListRequest(action$) {
  return action$.ofType(ArtCreationConstants.FILE_LIST_FETCH_REQUEST)
    .switchMap((action) => {
      const endpoint = `/v2/order_items/${action.payload.order_item_id}/art_creation/proposals/${action.payload.proposal_id}/files`;
      return rxAjax({
        endpoint,
        method: 'GET',
      })
        .map(data => {
          if (data.status === 200 && data.response) {
            return {
              type: ArtCreationConstants.FILE_LIST_FETCH_SUCCESS,
              payload: {
                ...data.response,
                ...{
                  proposal_id: action.action.proposal_id,
                  file_id: action.payload.file_id,
                },
              },
              meta: { updatedAt: getUnixtime() },
            };
          }

          return {
            type: ArtCreationConstants.FILE_LIST_FETCH_FAILURE,
            payload: { message: 'Algo de errado não está correto' },
            meta: { updatedAt: getUnixtime() },
          };
        })
        .takeUntil(action$.ofType(AppConstants.CANCEL_FETCH))
        .defaultIfEmpty({ type: ArtCreationConstants.FILE_LIST_FETCH_CANCEL })
        .catch(error => {
          if (error.status === 404) {
            push('/404');
          }

          return ([{
            type: ArtCreationConstants.FILE_LIST_FETCH_FAILURE,
            payload: { message: error.message, status: error.status },
            meta: { updatedAt: getUnixtime() },
          }]);
        });
    });
}


export function fetchSingleFileRequest(action$) {
  return action$.ofType(ArtCreationConstants.SINGLE_FILE_FETCH_REQUEST)
    .switchMap((action) => {
      const endpoint = `/v2/order_items/${action.payload.order_item_id}/art_creation/proposals/${action.payload.proposal_id}/files/${action.payload.file_id}`;
      return rxAjax({
        endpoint,
        method: 'GET',
      })
        .map(data => {
          
          if (data.status === 200 && data.response) {
            return {
              type: ArtCreationConstants.SINGLE_FILE_FETCH_SUCCESS,
              payload: {
                url: data.response.url,
              },
              meta: { updatedAt: getUnixtime() },
            };
          }

          return {
            type: ArtCreationConstants.SINGLE_FILE_FETCH_FAILURE,
            payload: { message: 'Algo de errado não está correto' },
            meta: { updatedAt: getUnixtime() },
          };
        })
        .takeUntil(action$.ofType(AppConstants.CANCEL_FETCH))
        .defaultIfEmpty({ type: ArtCreationConstants.SINGLE_FILE_FETCH_CANCEL })
        .catch(error => {
          if (error.status === 404) {
            push('/404');
          }

          return ([{
            type: ArtCreationConstants.SINGLE_FILE_FETCH_FAILURE,
            payload: { message: error.message, status: error.status },
            meta: { updatedAt: getUnixtime() },
          }]);
        });
    });
}
/////

export function saveBriefing(action$) {
  return action$.ofType(ArtCreationConstants.SAVE_BRIEFING_REQUEST)
    .switchMap((action) => {
      const endpoint = '/v2/items/briefing/save';
      return rxAjax({
        endpoint,
        payload: action.payload.briefingData,
        method: 'POST',
      })
        .map(data => {
          
          if (data.status === 201) {
            return {
              type: ArtCreationConstants.SAVE_BRIEFING_SUCCESS,
              payload: {
                data,
              },
              meta: { updatedAt: getUnixtime() },
            };
          }

          return {
            type: ArtCreationConstants.SAVE_BRIEFING_FAILURE,
            payload: { message: 'Algo de errado não está correto' },
            meta: { updatedAt: getUnixtime() },
          };
        })
        .takeUntil(action$.ofType(AppConstants.CANCEL_FETCH))
        .defaultIfEmpty({ type: ArtCreationConstants.SAVE_BRIEFING_CANCEL })
        .catch(error => {
          if (error.status === 404) {
            push('/404');
          }

          return ([{
            type: ArtCreationConstants.SAVE_BRIEFING_FAILURE,
            payload: { message: error.message, status: error.status },
            meta: { updatedAt: getUnixtime() },
          }]);
        });
    });
}

export function updateBriefing(action$) {
  return action$.ofType(ArtCreationConstants.UPDATE_BRIEFING_REQUEST)
    .switchMap((action) => {
      const endpoint = '/v2/items/briefing/save';
      return rxAjax({
        endpoint,
        payload: action.payload.briefingData,
        method: 'POST',
      })
        .map(data => {
          
          if (data.status === 200) {
            return {
              type: ArtCreationConstants.UPDATE_BRIEFING_SUCCESS,
              payload: {
                data,
              },
              meta: { updatedAt: getUnixtime() },
            };
          }

          return {
            type: ArtCreationConstants.UPDATE_BRIEFING_FAILURE,
            payload: { message: 'Algo de errado não está correto' },
            meta: { updatedAt: getUnixtime() },
          };
        })
        .takeUntil(action$.ofType(AppConstants.CANCEL_FETCH))
        .defaultIfEmpty({ type: ArtCreationConstants.UPDATE_BRIEFING_CANCEL })
        .catch(error => {
          if (error.status === 404) {
            push('/404');
          }

          return ([{
            type: ArtCreationConstants.UPDATE_BRIEFING_FAILURE,
            payload: { message: error.message, status: error.status },
            meta: { updatedAt: getUnixtime() },
          }]);
        });
    });
}

export function briefingDetailsFetch(action$) {
  return action$.ofType(ArtCreationConstants.BRIEFING_DETAILS_FETCH_REQUEST)
    .switchMap((action) => {
      const endpoint = `/v2/orders/${action.payload.order_id}/items/${action.payload.order_item_id}/briefing/details`;
      return rxAjax({
        endpoint,
        method: 'GET',
      })
        .map(data => {
          
          if (data.status === 200) {
            return {
              type: ArtCreationConstants.BRIEFING_DETAILS_FETCH_SUCCESS,
              payload: {
                data,
              },
              meta: { updatedAt: getUnixtime() },
            };
          }

          return {
            type: ArtCreationConstants.BRIEFING_DETAILS_FETCH_FAILURE,
            payload: { message: 'Algo de errado não está correto' },
            meta: { updatedAt: getUnixtime() },
          };
        })
        .takeUntil(action$.ofType(AppConstants.CANCEL_FETCH))
        .defaultIfEmpty({ type: ArtCreationConstants.BRIEFING_DETAILS_FETCH_CANCEL })
        .catch(error => {
          if (error.status === 404) {
            push('/404');
          }

          return ([{
            type: ArtCreationConstants.BRIEFING_DETAILS_FETCH_FAILURE,
            payload: { message: error.message, status: error.status },
            meta: { updatedAt: getUnixtime() },
          }]);
        });
    });
}

export function removeFile(action$) {
  return action$.ofType(ArtCreationConstants.REMOVE_FILES_REQUEST)
    .switchMap((action) => {
      const endpoint = `/v2/orders/${action.payload.order_id}/items/${action.payload.order_item_id}/briefing/delete`;
      return rxAjax({
        endpoint,
        method: 'DELETE',
      })
        .map(data => {
          
          if (data.status === 200) {
            return {
              type: ArtCreationConstants.REMOVE_FILES_SUCCESS,
              payload: {
                data,
              },
              meta: { updatedAt: getUnixtime() },
            };
          }

          return {
            type: ArtCreationConstants.REMOVE_FILES_FAILURE,
            payload: { message: 'Algo de errado não está correto' },
            meta: { updatedAt: getUnixtime() },
          };
        })
        .takeUntil(action$.ofType(AppConstants.CANCEL_FETCH))
        .defaultIfEmpty({ type: ArtCreationConstants.REMOVE_FILES_CANCEL })
        .catch(error => {
          if (error.status === 404) {
            push('/404');
          }

          return ([{
            type: ArtCreationConstants.REMOVE_FILES_FAILURE,
            payload: { message: error.message, status: error.status },
            meta: { updatedAt: getUnixtime() },
          }]);
        });
    });
}

export function deleteBriefing(action$) {
  return action$.ofType(ArtCreationConstants.DELETE_BRIEFING_REQUEST)
    .switchMap((action) => {
      const endpoint = `/v2/orders/${action.payload.order_id}/items/${action.payload.order_item_id}/briefing`;
      return rxAjax({
        endpoint,
        method: 'DELETE',
      })
        .map(data => {
          
          if (data.status === 200) {
            return {
              type: ArtCreationConstants.DELETE_BRIEFING_SUCCESS,
              payload: {
                data,
              },
              meta: { updatedAt: getUnixtime() },
            };
          }

          return {
            type: ArtCreationConstants.DELETE_BRIEFING_FAILURE,
            payload: { message: 'Algo de errado não está correto' },
            meta: { updatedAt: getUnixtime() },
          };
        })
        .takeUntil(action$.ofType(AppConstants.CANCEL_FETCH))
        .defaultIfEmpty({ type: ArtCreationConstants.DELETE_BRIEFING_CANCEL })
        .catch(error => {
          if (error.status === 404) {
            push('/404');
          }

          return ([{
            type: ArtCreationConstants.DELETE_BRIEFING_FAILURE,
            payload: { message: error.message, status: error.status },
            meta: { updatedAt: getUnixtime() },
          }]);
        });
    });
}

export function finishUploadFiles(action$) {
  return action$.ofType(ArtCreationConstants.FINISH_UPLOAD_FILES_REQUEST)
    .switchMap((action) => {
      const endpoint = '/v2/briefing/finishUpload';
      return rxAjax({
        endpoint,
        payload: action.payload.briefingData,
        method: 'POST',
      })
        .map(data => {
          
          if (data.status === 200) {
            return {
              type: ArtCreationConstants.FINISH_UPLOAD_FILES_SUCCESS,
              payload: {
                data,
              },
              meta: { updatedAt: getUnixtime() },
            };
          }

          return {
            type: ArtCreationConstants.FINISH_UPLOAD_FILES_FAILURE,
            payload: { message: 'Algo de errado não está correto' },
            meta: { updatedAt: getUnixtime() },
          };
        })
        .takeUntil(action$.ofType(AppConstants.CANCEL_FETCH))
        .defaultIfEmpty({ type: ArtCreationConstants.FINISH_UPLOAD_FILES_CANCEL })
        .catch(error => {
          if (error.status === 404) {
            push('/404');
          }

          return ([{
            type: ArtCreationConstants.FINISH_UPLOAD_FILES_FAILURE,
            payload: { message: error.message, status: error.status },
            meta: { updatedAt: getUnixtime() },
          }]);
        });
    });
}
