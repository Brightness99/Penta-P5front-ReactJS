const saveTemplate = () => global.designer.saveDocumentToUds();

const getPreview = () => {
  const preview1 = {
    size: {
      width: 500,
    },
    page: 1,
  };
  const preview2 = {
    size: {
      width: 500,
    },
    page: 2,
  };

  return Promise.all([
    global.designer.preview.getPreview(preview1),
    global.designer.preview.getPreview(preview2),
  ]);
};

const switchProduct = (config) => global.designer.switchProduct({ surfaceSpecifications: config });

const start = (config) => global.designer.start(config);

export default {
  start,
  switchProduct,
  getPreview,
  saveTemplate,
};
