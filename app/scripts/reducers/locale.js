// @flow
/**
 * @module Reducers/App
 * @desc App Reducer
 */

import { REHYDRATE } from 'redux-persist/constants';
import { createReducer, mergeDeep } from 'utils/helpers';
import { LocaleConstants } from 'constants/index';

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
      FAILURE: 'Houve um problema ao cadastrar seu e-mail',
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
        },
      ],
    },
    page: {
      home: {
        blog: {
          TITLE: 'Últimas do Blog',
          TO_READ: 'para ler',
          TIME_MEASURE: 'min',
          DATE_FORMAT: 'D MMM',
        },
      },
      product_settings: {
        source: {
          TITLE: 'Escolha a forma de criar seu produto',
          order_source_options: [
            {
              source: 'upload',
              title: 'Enviar minha arte final',
              description: 'Faça upload de um arquivo finalizado para a impressão nos formatos suportados',
            },
            {
              source: 'template',
              title: 'Criar modelo online',
              description: 'Escolha um design e inclua suas informações e imagens na nossa ferramenta de edição',
            },
            {
              source: 'art_creation',
              title: 'Contratar criação',
              description: 'Contrate um profissional de design da Printi e tenha uma arte totalmente personalizada',
            },
          ],
        },
      },
      product_landing_page: {
        warranty: {
          image: {
            SRC: '',
            ALT: '100% Garantido',
          },
          TITLE: 'Qualidade garantida. Não corra risco com seus produtos!',
          DESCRIPTION: 'A nossa satisfação é a sua satisfação. Não ficou satisfeito com a qualidade do material que recebeu? Nós vamos reimprimi-lo! Sem custos e sem burocracia.',
          BUTTON: 'Configure este produto',
        },
        reviews: {
          TITLE: 'mais opiniões',
          CLIENTS_REVIEWS: '% dos clientes recomendam este produto',
          REVIEWS: 'avaliações',
          YOUR_OPINION: 'E você, o que achou?',
          GENERAL_REVIEW: 'Avaliação geral',
          EMAIL_SUBJECT: 'Avaliação do produto',
          LOAD_MORE: 'carregar mais avaliações',
          TOTAL_REVIEWS: 'de %s avaliações',
        },
      },
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
