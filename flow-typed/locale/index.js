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
  TITLE: string,
  seo: SEOLocaleType,
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

/* Account Locale Types */

declare type AccountOrderDetailsLocaleType = {
  seo: SEOLocaleType,
  ORDER: string,
  ORDER_NOT_FOUND: string,
  ORDER_NUMBER: string,
  ORDER_ITEMS: string,
  PRODUCT: string,
  PRODUCTS: string,
  ORDER_TOTAL: string,
  ORDER_DATE: string,
  ORDER_STATUS: string,
  DISCOUNT: string,
  actions: {
    TITLE: string,
    PRINT_BOLETO: string,
    GENERATE_NEW_BOLETO: string,
    CHECK_INVOICE: string,
    CHANGE_DELIVERY_ADDRESS: string,
    REPURCHASE_ORDER: string,
    CANCEL_ORDER: string,
    CANCEL_ORDER_ITEM: string,
  },
  payment_data: {
    TITLE: string,
    PAYMENT_METHOD: string,
    PAYMENT_METHOD_CHANGE: string,
    ORDER_PAID: string,
  },
  delivery_data: {
    TITLE: string,
  },
  item_details: {
    headers: {
      FILE: string,
      DESCRIPTION: string,
      DATES: string,
      ACTIONS: string,
    },
    UNIT: string,
    ITEM_NUMBER: string,
    ITEM_STATUS: string,
    ESTIMATED_DELIVERY: string,
    AFTER_ART_APPROVAL: string,
    UPLOAD_DUE_DATE: string,
    SEND_FILE: string,
    CHANGE_FILE: string,
    REPURCHASE_ITEM: string,
    CANCEL_ORDER: string,
    CANCEL_ORDER_ITEM: string,
    ALREADY_IN_PRODUCTION: string,
    TRACKING: string,
    ADDITIONAL_COST: string,
    FILE_CREATED_BY_DESIGNER: string,
    SEND_BRIEFING: string,
    VIEW_BRIEFING: string,
    VIEW_ART_CREATION_PROPOSALS: string,
    upload: {
      title: {
        SUCCEED: string,
        WARNING: string,
      },
      message: {
        cimpress: {
          FINISHED: string,
          MISSING: string,
          PROCESSING: string,
        },
        classic: {
          FINISHED: string,
          NOT_FINISHED: string,
          NO_FILES: string,
        },
      },
    }
  },
  warning: {
    WAITING_UPLOAD: string,
    WAITING_PAYMENT: string,
  },
  msg: {
    GO_BACK: string,
  },
};

declare type AccountMyOrdersLocaleType = {
  seo: SEOLocaleType,
  SUB_TITLE: string,
  NO_ORDERS: string,
  LOAD_MORE: string,
  ticket: {
    ORDER: string,
    ORDER_NUMBER: string,
    ORDER_ITEMS: string,
    PRODUCT: string,
    PRODUCTS: string,
    ORDER_TOTAL: string,
    ORDER_DATE: string,
    ORDER_STATUS: string,
    VIEW_DETAILS: string,
  },
  order_details: AccountOrderDetailsLocaleType,
};

declare type AccountLocaleType = {
  my_orders: AccountMyOrdersLocaleType,
};

declare type TranslateLocaleType = {
  common: CommonLocaleType,
  header: HeaderLocaleType,
  page: PageLocaleType,
  account: AccountLocaleType,
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
