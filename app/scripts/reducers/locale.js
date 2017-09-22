// @flow
/**
 * @module Reducers/App
 * @desc App Reducer
 */

import { REHYDRATE } from 'redux-persist/constants';
import { createReducer, mergeDeep } from 'utils/helpers';
import { LocaleConstants } from 'constants/index';
import locale from 'assets/json/localeMock.json';

console.log('tomar no cy', LocaleConstants);

const missingLocale = {
  translate: {
    common: {
      STARTING_FROM: 'A partir de',
    },
    newsletter: {
      TITLE: 'Inscreva-se em nossa newsletter',
      SUB_TITLE: 'para receber nossas últimas notícias e descontos exclusivos',
      PLACEHOLDER: 'Digite seu email...',
      BUTTON: 'inscrever',
      SUCCESS: 'E-mail cadastrado com sucesso',
      FAILURE: 'Houve um problema ao cadastrar seu e-mail'
    },
    footer: {
      links: [
        {
          TEXT: 'Contato',
          URL: '/contato',
          TITLE: '',
        },
        {
          TEXT: 'Blog',
          URL: 'http://www.printi.com.br/blog/',
          TITLE: '',
        },
        {
          TEXT: 'Gabaritos',
          URL: '/download-de-gabaritos',
          TITLE: '',
        },
        {
          TEXT: 'Tutoriais',
          URL: '/tutoriais',
          TITLE: '',
        },
        {
          TEXT: 'Montagem de arquivos',
          URL: '/montagem-do-arquivo',
          TITLE: '',
        },
        {
          TEXT: 'Guia de impressão',
          URL: '/guia-de-impressao',
          TITLE: '',
        },
        {
          TEXT: 'Glossário',
          URL: '/glossario',
          TITLE: '',
        },
        {
          TEXT: 'Printi na Imprensa',
          URL: '/printi-na-imprensa',
          TITLE: '',
        },
        {
          TEXT: 'Política de privacidade',
          URL: '/politica-de-privacidade',
          TITLE: '',
        },
        {
          TEXT: 'Termos de uso',
          URL: '/termos-de-servico-e-uso-do-site',
          TITLE: '',
        },
        {
          TEXT: 'Trabalhe conosco',
          URL: '/trabalhe-conosco',
          TITLE: '',
        },
        {
          TEXT: 'Mapa do site',
          URL: '/sitemap',
          TITLE: '',
        }
      ],
    },
  },
};

export const appState = {
  rehydrated: false,
};

export default {
  locale: createReducer(appState, {
    [REHYDRATE](state) {
      return {
        ...state,
        rehydrated: true,
      };
    },
    [LocaleConstants.LOCALE_FETCH_REQUEST]() {
      return appState;
    },
    [LocaleConstants.LOCALE_FETCH_SUCCESS](state, action) {
      return mergeDeep(
        {
          ...state,
          ...action.payload,
        },
        missingLocale
      );
    },
  }),
};
