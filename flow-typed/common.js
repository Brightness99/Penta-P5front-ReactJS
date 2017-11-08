// Stores

declare type ImageType = {
  file: string,
  alt: string,
};

declare type CimpressInfo = {
  order_item_cimpress_id: string,
  cimpress_sku_scene: {},
  orientation: string,
  settings: {
    has_preview: string,
    has_cut_view: string,
    has_zoom: string,
    has_orientation: string,
    css: string,
  },
  specifications: {
    surfaces: Array<{
      name: string,
      widthInMm: number,
      heightInMm: number,
      processType: string,
      trim: number,
    }>
  }
}

declare type UploadInfoType = {
  flashMessages: Array<{
    type: string,
    title: string,
    content: string,
  }>,
  globalFlags: {
    from_my_account: boolean,
    upload_type: string,
    cart_item_index: string,
  },
  cartItemDefinitions: {
    name: string,
    parts: Array<{
      id: string,
      name: string,
      options: Array<{ field: string, value: string }>
    }>
  },
  additionalOptions: {
    availableAdditionalOptionList: {
      file_format: Array<{
        id: string,
        name: string,
        position: number,
        price: number,
      }>,
      proof: Array<{
        id: string,
        name: string,
        position: number,
        price: number,
      }>
    },
    selectedAdditionalOptions: {
      file_format: string,
      proof: string
    }
  },
  availableStrategies: Array<number>,
  cimpressInfo: CimpressInfo,
}
