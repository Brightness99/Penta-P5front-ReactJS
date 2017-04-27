declare module 'common-types' {
  declare module.exports: any;
}

// Stores
declare type AppStore = {
  rehydrated: boolean,
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
