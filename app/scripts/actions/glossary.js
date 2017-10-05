// @flow

/**
 * @module Actions/Glossary
 * @desc Actions for Glossary
 */

import { GlossaryConstants } from 'constants/index';

/**
 * Fetch Glossary
 *
 * @returns {Object}
 */
export function glossaryFetch(): Object {
  return {
    type: GlossaryConstants.GLOSSARY_FETCH_REQUEST,
    payload: {},
  };
}

/**
 * Fetch Glossary slug
 *
 * @returns {Object}
 */
export function glossarySlugFetch(slug: string): Object {
  return {
    type: GlossaryConstants.GLOSSARY_SLUG_FETCH_REQUEST,
    payload: { slug },
  };
}

/**
 * Fetch Glossary slug
 *
 * @returns {Object}
 */
export function glossaryFilter(query: string): Object {
  return {
    type: GlossaryConstants.GLOSSARY_FILTER,
    payload: query,
  };
}
