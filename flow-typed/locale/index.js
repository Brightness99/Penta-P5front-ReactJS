declare type SEOLocaleType = {
  PAGE_TITLE: string,
  META_DESCRIPTION: string,
};

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

declare type ProductLandingPageLocaleType = {
  common: {
    GET_STARTED: string,
    CONFIGURE_PRODUCT: string,
    UNAVAILABLE_PRODUCT: string,
    UNAVAILABLE_TITLE: string,
    EMAIl: string,
    SEND: string,
  },
  description: {
    STARTING_FROM: string,
    NEXT_PAGE: string,
  },
  informations: {
    TITLE: string,
    HINTS: string,
    HOW_TO_USE: string,
  },
  advantages: {
    TITLE: string,
    OTHER_ONLINE_PRINTING_COMPANIES: string,
    TRADITIONAL_PRINTING_COMPANIES: string,
    LIST: string[],
    CHECK_AVAILABLE_PRODUCTS: string,
  },
  graphic_plant: {
    OVER_TITLE: string,
    TITLE: string,
    PARAGRAPH: string,
    LIST: string[],
  },
  print: {
    TITLE: string,
    QUESTIONS: string,
  },
  reviews: {
    TITLE: string,
    SUB_TITLE: string,
    SUBMIT_REVIEW: string,
  },
};

declare type ProductSettingsLocaleType = {
  TITLE: string
  seo: {
    PAGE_TITLE: string,
    META_DESCRIPTION: string,
  },
  BREADCRUMB_TITLE: string,
  ADD_TO_CART: string,
  options: {
    TITLE: string,
    COMBINATIONS: string,
    MORE_INFO_TEXT: string,
    TWO_PART_PRODUCT: string,
    VIEW_MODE: string,
    LIST: string,
    PHOTOS: string,
    CUSTOM_OPTION: string,
  },
  matrix: {
    TITLE: string,
    MORE_INFO_TEXT: string,
    QTY_DATE_PRICE: string,
    FREE: string,
    SHIPPING: string,
    QUANTITY: string,
    BUSINESS_DAYS: string,
    CUSTOM_QUANTITY: string,
    ZIP_CODE_DELIVERY: string,
    PICKUP_PLACE: string,
  },
  additional_options: {
    TITLE: string,
    MORE_INFO_TEXT: string,
    FREE: string,
  },
  sidebar: {
    TITLE: string,
    ESTIMATED_DELIVERY: string,
    QUANTITY: string,
  },
  prepress_template: {
    TITLE: string,
    SUB_TITLE: string,
    ORIENTATION_CHOICE: string,
    orientation: {
      UNIQUE: string,
      LANDSCAPE: string,
      PORTRAIT: string,
    },
    SOFTWARE_CHOICE: string,
  },
  source: {
    more_info: {
      TEXT: string,
    },
  },
};

declare type PageLocaleType = {
  product_landing_page: ProductLandingPageLocaleType,
  product_settings: ProductSettingsLocaleType,
};

declare type TranslateLocaleType = {
  common: CommonLocaleType,
  header: HeaderLocaleType,
  page: PageLocaleType,
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
