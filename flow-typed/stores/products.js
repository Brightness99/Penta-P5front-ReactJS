declare type ProductStoreInformationsChildrenType = {
  id: string,
  slug: string,
  datecreated: string,
  datechanged: string,
  datepublish: string,
  datedepublish: string,
  templatefields: string,
  username: string,
  ownerid: string,
  status: string,
  title: string,
  show_tips: string,
  show_utilization: string,
  content: string,
  image: {
    file: string,
    title: string,
  },
  name: string,
  image_mobile: {
    file: string,
    title: string,
  },
};

declare type ProductStoreInformationsType = {
  tips: ProductStoreInformationsChildrenType[],
  utilizations: ProductStoreInformationsChildrenType[],
};

declare type ProductsStoreType = {
  isRunning: boolean,
  isReady: boolean,
  informations: ProductStoreInformationsType,
};
