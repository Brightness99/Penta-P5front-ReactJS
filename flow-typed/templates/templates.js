/* eslint-disable no-undef */
declare type TemplateType = {
  final_product_id: string,
  final_product_name: string,
};

declare type ProductPartType = {
  name: string,
  combination: {
    finishing: {
      name: string,
      options: Array<TemplateOptionType>,
    },
    format: {
      name: string,
      options: {
        [key: number]: TemplateOptionType,
      },
    },
  },
};

declare type TemplateOptionType = {
  name: string,
  value: string,
};

declare type DownloadRequestFormType = {
  [key: string]: {
    product_format_id: string,
    product_page_id: string,
    product_finishing_id: string,
    product_extra_id: string,
  },
};

declare type DownloadFileFormType = {
  packageName: string,
  parts: {
    [key: string]: {
      guideCombinationId: number,
      fileCombinationId: number,
    },
  },
};

declare type DownloadOptionsType = {
  [file: string]: {
    [orientation: 'vertical' | 'horizontal']: {
      url: string,
    },
  },
};

declare type DownloadDataType = {
  isRunning: boolean,
  isLoaded: boolean,
  error: { message: string, status: string },
  data: {
    options: {
      horizontal: Array<string>,
      vertical: Array<string>,
    },
    [key: string]: {
      fileCombinationId: number,
      guideCombinationId: number,
    },
  },
  downloadOptions: DownloadOptionsType,
};
