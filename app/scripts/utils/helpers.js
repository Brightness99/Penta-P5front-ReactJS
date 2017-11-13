// @flow

/**
 * Helper functions
 * @module Helpers
 */

import shallowEqual from 'fbjs/lib/shallowEqual';

/**
 * shouldComponentUpdate with context
 *
 * @param {Object} instance
 * @param {Object} nextProps
 * @param {Object} nextState
 * @param {Object} nextContext
 *
 * @returns {boolean}
 */
export function shouldComponentUpdate(instance: Object, nextProps: Object, nextState: Object, nextContext: Object) {
  return !shallowEqual(instance.props, nextProps)
    || !shallowEqual(instance.state, nextState)
    || !shallowEqual(instance.context, nextContext);
}

/**
 * Get Unix timestamp in seconds.
 *
 * @returns {number}
 */
export function getUnixtime(): number {
  return Math.floor(Date.now() / 1000);
}

/**
 * Generate reducer.
 *
 * @param {Object} initialState
 * @param {Object} handlers
 * @returns {function}
 */
export function createReducer(initialState: Object, handlers: Object) {
  return function reducer(state: Object = initialState, action: Object) {
    if ({}.hasOwnProperty.call(handlers, action.type)) {
      return handlers[action.type](state, action);
    }

    return state;
  };
}

/**
 * Create request types for contants
 * @param {string} base
 * @returns {Object}
 */
export function createRequestTypes(base: string) {
  return ['REQUEST', 'SUCCESS', 'FAILURE'].reduce((acc, type) => {
    acc[type] = `${base}_${type}`;
    return acc;
  }, {});
}

/**
 * Convert data attributes to Object
 * @param {Element} elem
 * @returns {{}}
 */
export function datasetToObject(elem: Element) {
  const data = {};
  [].forEach.call(elem.attributes, attr => {
    /* istanbul ignore else */
    if (/^data-/.test(attr.name)) {
      const camelCaseName = attr.name.substr(5)
      .replace(/-(.)/g, ($0, $1) => $1.toUpperCase());
      data[camelCaseName] = attr.value;
    }
  });
  return data;
}

/**
 * Get screen size breakpoint
 * @returns {string}
 */
export function getScreenSize() {
  const windowWidth = window.innerWidth;
  let screenSize = 'xs';

  /* istanbul ignore next */
  if (windowWidth >= 1920) {
    screenSize = 'xxxl';
  } else if (windowWidth >= 1440) {
    screenSize = 'xxl';
  } else if (windowWidth >= 1280) {
    screenSize = 'xl';
  } else if (windowWidth >= 1024) {
    screenSize = 'lg';
  } else if (windowWidth >= 880) {
    screenSize = 'im';
  } else if (windowWidth >= 768) {
    screenSize = 'md';
  } else if (windowWidth >= 600) {
    screenSize = 'is';
  } else if (windowWidth >= 480) {
    screenSize = 'sm';
  } else if (windowWidth >= 400) {
    screenSize = 'ix';
  }

  return screenSize;
}

/**
 * Check if is mobile
 * @param {string} screenSize
 * @returns {boolean}
 */
export function isMobile(screenSize: string): boolean {
  if (!screenSize) {
    console.warn('isMobile: screenSize param is empty, returning true for mobile first reasons'); // eslint-disable-line no-console
  }

  return !['lg', 'xl', 'xxl', 'xxxl'].includes(screenSize);
}

/**
 * Simple object check.
 * @param {Object} item
 * @returns {boolean}
 */
export function isObject(item) {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

/**
 * Deep merge two objects.
 * @param {Object} target
 * @param {Object} sources
 * @returns {Object}
 */
export function mergeDeep(target, ...sources) {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return mergeDeep(target, ...sources);
}

/**
 * Simple object check.
 * @param {string} slug
 * @returns {string}
 */
export function getTitleFromSlug(slug) {
  const slugStr = slug.replace(/-/g, ' ');
  return slugStr.charAt(0).toUpperCase() + slugStr.slice(1);
}

/**
 * validate CPF.
 * @param {string} cpf
 * @returns {boolean}
 */
export function validateCpf(cpf) {
  let add;
  let i;
  let rev;
  const cleanValue  = cpf.replace(/[^\d]+/g, '');
  const invalidList = ['00000000000', '11111111111', '22222222222', '33333333333', '44444444444', '55555555555', '66666666666', '77777777777', '88888888888', '99999999999'];

  if (cleanValue === '' || cleanValue.length !== 11 || invalidList.indexOf(cleanValue) !== -1) {
    return false;
  }
  // Elimina CPFs invalidos conhecidos
  // Valida 1o digito
  add = 0;
  for (i = 0; i < 9; i++) {
    add += parseInt(cleanValue.charAt(i), 10) * (10 - i);
  }
  rev = 11 - (add % 11);
  if (rev === 10 || rev === 11) {
    rev = 0;
  }
  if (rev !== parseInt(cleanValue.charAt(9), 10)) {
    return false;
  }
  // Valida 2o digito
  add = 0;
  for (i = 0; i < 10; i++) {
    add += parseInt(cleanValue.charAt(i), 10) * (11 - i);
  }
  rev = 11 - (add % 11);
  if (rev === 10 || rev === 11) {
    rev = 0;
  }
  if (rev !== parseInt(cleanValue.charAt(10), 10)) {
    return false;
  }
  return true;
}

/**
 * validate CNPJ.
 * @param {string} cnpj
 * @returns {boolean}
 */
export function validateCnpj(cnpj: string) {
  const cleanValue = cnpj.replace(/[^\d]+/g, '');
  if (cleanValue.length < 14 && cleanValue.length < 15) {
    return false;
  }
  let i;
  let digitos_iguais = 1;

  for (i = 0; i < cleanValue.length - 1; i++) {
    if (cleanValue.charAt(i) !== cleanValue.charAt(i + 1)) {
      digitos_iguais = 0;
      break;
    }
  }
  if (digitos_iguais) {
    return false;
  }
  let tamanho = cleanValue.length - 2;
  let numeros = cleanValue.substring(0, tamanho);
  const digitos = cleanValue.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;
  for (i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }
  /**
   * @todo not sure if here we shouldn't have some ( )
   * @type {number}
   */
  let resultado = (soma % 11 < 2) ? 0 : 11 - (soma % 11);
  if (resultado !== parseInt(digitos.charAt(0), 10)) {
    return false;
  }
  tamanho++;
  numeros = cleanValue.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }
  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== parseInt(digitos.charAt(1), 10)) {
    return false;
  }
  return true;
}

export const isEmpty = o => o === undefined || o === null;

/**
 * validate Email.
 * @param {string} email
 * @returns {boolean}
 */
export function validateEmail(email: string): boolean {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return regex.test(email);
}
