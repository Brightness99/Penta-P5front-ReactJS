/* eslint-disable no-undef */
// Stores
declare type AppStoreType = {
  rehydrated: boolean,
  screenSize: string,
};

declare type RouterStore = {
  action: string,
  location: {
    hash: string,
    key: string,
    pathname: string,
    search: string,
    state: any,
  }
};

declare type LocaleFooterLink = {
  TEXT: string,
  URL: string,
  TITLE?: string,
};

declare type LocaleFooterImageItem = {
  ALT: string,
  SRC: ?string,
  URL?: string,
};

declare type LocaleFooterPayments = {
  ALT: string,
  SRC: ?string,
};

declare type LocaleFooterImages = {
  TITLE: string,
  images: LocaleFooterImageItem,
};

declare type LocaleFooter = {
  INFOS: string,
  RIGHTS_RESERVED: string,
  SEE_ALL_LINKS: string,
  certificates: LocaleFooterImages,
  support: LocaleFooterImages,
  payment_methods: LocaleFooterPayments,
  links: LocaleFooterLink,
};

declare type LocaleNewsletter = {
  TITLE: string,
  SUB_TITLE: string,
  PLACEHOLDER: string,
  BUTTON: string,
};

declare type Locale = {
  footer: LocaleFooter[],
  newsletter: LocaleNewsletter,
};

declare type UserNewsletterStore = {
  component: string,
  error: boolean,
  isRunning: boolean,
  message: string,
  subscribed: boolean,
};

declare type UserStore = {
  rehydrated: boolean,
  newsletter: UserNewsletterStore,
  updatedAt: number,
};

declare type SettingsStore = {
  settings: {
    enabledSources: {
      upload?: boolean,
      template?: boolean,
      artCreation?: boolean,
      cloud?: boolean,
    },
    autoselectSource?: ?string,
    show_steps: {
      source?: boolean,
      options?: boolean,
      matrix?: boolean,
      additionalOptions?: boolean,
    },
    product: {
      id: number,
      title: string,
      subtitle: string,
      slug: string,
    },
    finalProduct: {
      id: string,
    },
  },
};

declare type BannerImageType = {
  link: {
    url?: string,
    target: string,
  },
  file: {
    desktop?: string,
    mobile?: string,
  },
  alt: string,
};

declare type GoogleSuccessResult = {
  googleId: string,
  tokenId: string,
  accessToken: string,
  tokenObj: Object,
  profileObj: {
    name: string,
    email: string,
  }
}

declare type GoogleFailureResult = {
  error: string,
  details: string
}

declare type FBSuccessResult = {
  status: string,
  accessToken: string,
  expiresIn: string,
  signedRequest: string,
  userID: string,
  name: string,
  email: string,
}

declare type FBFailureResult = {}

declare type SocialLoginResult = {
  socialType: string,
  socialData: {
    socialId: string,
    socialToken: string,
  },
  fingerprint: string,
  email: string,
  hubspot_subscribe: boolean,
  stay_connected: boolean,
  first_name: string,
  error: {}
}
