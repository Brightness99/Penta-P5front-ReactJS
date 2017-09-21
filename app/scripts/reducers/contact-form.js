// @flow
/**
 * @module Reducers/Cart
 * @desc Cart Reducer
 */

import { REHYDRATE } from 'redux-persist/constants';
import { createReducer } from 'utils/helpers';
import { ContactFormConstants } from 'constants/contact-form';

export type ContactFormState = {
  leaduri: string,
  email: string,
  first_name: string,
  last_name: string,
  phone: string,
  empresa: string,
  website: string,
  spending: string,
  position: string,
  isLoaded: boolean,
  isRunning: boolean,
};

const contactFormState: ContactFormState = {
  leaduri: '/venda-corporativa',
  email: '',
  first_name: '',
  last_name: '',
  phone: '',
  empresa: '',
  website: '',
  spending: '',
  position: '',
  isLoaded: false,
  isRunning: false,
  error: {},
};

export default {
  contactForm: createReducer(contactFormState, {
    [REHYDRATE](state, action) {
      return Object.assign({}, state, action.payload, {
        rehydrated: true,
      });
    },
    [ContactFormConstants.CONTACT_FORM_SUBMIT](state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    [ContactFormConstants.CONTACT_FORM_SUBMIT_SUCCESS](state, action) {
      return {
        ...state,
        ...action.payload,
        isRunning: false,
        isLoaded: true,
      };
    },
    [ContactFormConstants.CONTACT_FORM_SUBMIT_FAILURE](state, action) {
      return {
        ...state,
        isRunning: false,
        isLoaded: true,
        error: action.payload,
      };
    },
  }),
};
