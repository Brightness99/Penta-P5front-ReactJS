declare type CommonLocaleType = {
  WARNING: string,
  OOPS: string,
  PROMPT_YES: string,
  PROMPT_NO: string,
  MORE_INFO: string,
  EDIT: string,
  OR: string,
  VIEW_MORE: string,
  VIEW_MORE_DRY: string,
};

declare type HeaderLocaleType = {
  MENU: string,
  PRODUCTS: string,
  SEARCH_PLACEHOLDER: string,
  GREETING: string,
  HELP_CENTER: string,
  MY_ACCOUNT: string,
  LOGOUT: string,
  SIGN_IN: string,
  SIGN_UP: string,
};

declare type TranslateLocaleType = {
  common: CommonLocaleType,
  header: HeaderLocaleType,
};

declare type LocaleType = {
  COUNTRY_CODE: string,
  COUNTRY: string,
  LANGUAGE: string,
  CURRENCY: string,
  CURRENCY_FORMAT: string,
  FE_DATE_FORMAT: string,
  TIME_FORMAT: string,
  DATE_FORMAT: string,
  DEFAULT_PSP: string,
  WEIGHT: string,
  WEIGHT_SYM: string,
  LENGTH: string,
  LENGTH_SYM: string,
  DOMAIN: string,
  UPDATED_AT: string,
  translate: TranslateLocaleType,
};
