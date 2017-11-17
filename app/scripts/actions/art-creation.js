// @flow
/**
 * @module Actions/Users
 * @desc Actions for Users
 */

import { ArtCreationConstants } from 'constants/index';

/**
 * Proposal Fetch
 * @param {string} id
 *
 * @returns {Object}
 */
export function proposalsFetch(id: string): Object {
  return {
    type: ArtCreationConstants.PROPOSALS_FETCH_REQUEST,
    payload: {
      id,
    },
  };
}

/**
 * new Proposal Request
 * @param {Object} data
 *
 * @returns {Object}
 */
export function newProposalRequest(data: Object): Object {
  return {
    type: ArtCreationConstants.NEW_PROPOSAL_REQUEST_REQUEST,
    payload: {
      order_item_id: data.order_item_id,
      proposal_id: data.proposal_id,
      customer_message: data.customer_message,
    },
  };
}

/**
 * Approve Proposal Request
 * @param {Object} data
 *
 * @returns {Object}
 */
export function approveProposalRequest(data: Object): Object {
  return {
    type: ArtCreationConstants.APPROVE_PROPOSAL_REQUEST,
    payload: {
      order_item_id: data.order_item_id,
      proposal_id: data.proposal_id,
    },
  };
}

/**
 * Fetch Proposal File List Request
 * @param {Object} data
 *
 * @returns {Object}
 */
export function fetchFileListRequest(data: Object): Object {
  return {
    type: ArtCreationConstants.FILE_LIST_FETCH_REQUEST,
    payload: {
      order_item_id: data.order_item_id,
      proposal_id: data.proposal_id,
    },
  };
}


/**
 * Fetch Single File Request
 * @param {Object} data
 *
 * @returns {Object}
 */
export function fetchSingleFileRequest(data: Object): Object {
  return {
    type: ArtCreationConstants.SINGLE_FILE_FETCH_REQUEST,
    payload: {
      order_item_id: data.order_item_id,
      proposal_id: data.proposal_id,
      file_id: data.file_id,
    },
  };
}
