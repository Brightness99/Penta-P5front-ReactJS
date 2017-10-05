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
 * @param {Object} newProposal
 *
 * @returns {Object}
 */
export function newProposalRequest(newProposal: Object): Object {
  return {
    type: ArtCreationConstants.NEW_PROPOSAL_REQUEST_REQUEST,
    payload: {
      order_item_id: newProposal.order_item_id,
      proposal_id: newProposal.proposal_id,
      customer_message: newProposal.customer_message,
    },
  };
}
