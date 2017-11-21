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


/**
 * Save Briefing
 * @param {Object} briefingData
 *
 * @returns {Object}
 */
export function saveBriefing(briefingData: Object): Object {
  return {
    type: ArtCreationConstants.SAVE_BRIEFING_REQUEST,
    payload: {
      briefingData,
    },
  };
}

/**
 * Update Briefing
 * @param {Object} briefingData
 *
 * @returns {Object}
 */
export function updateBriefing(briefingData: Object): Object {
  return {
    type: ArtCreationConstants.UPDATE_BRIEFING_REQUEST,
    payload: {
      briefingData,
    },
  };
}

/**
 * Briefing Details Fetch
 * @param {Object} data
 *
 * @returns {Object}
 */
export function briefingDetailsFetch(data: Object): Object {
  return {
    type: ArtCreationConstants.BRIEFING_DETAILS_FETCH_REQUEST,
    payload: {
      order_id: data.order_id,
      order_item_id: data.order_item_id,
    },
  };
}

/**
 * Remove File Request
 * @param {Object} data
 *
 * @returns {Object}
 */
export function removeFile(data: Object): Object {
  return {
    type: ArtCreationConstants.REMOVE_FILES_REQUEST,
    payload: {
      order_id: data.order_id,
      order_item_id: data.order_item_id,
    },
  };
}

/**
 * Delete Briefing
 * @param {Object} data
 *
 * @returns {Object}
 */
export function deleteBriefing(data: Object): Object {
  return {
    type: ArtCreationConstants.DELETE_BRIEFING_REQUEST,
    payload: {
      order_id: data.order_id,
      order_item_id: data.order_item_id,
    },
  };
}

/**
 * Finish Upload Files
 * @param {Object} briefingData
 *
 * @returns {Object}
 */
export function finishUploadFiles(briefingData: Object): Object {
  return {
    type: ArtCreationConstants.FINISH_UPLOAD_FILES_REQUEST,
    payload: {
      briefingData,
    },
  };
}
