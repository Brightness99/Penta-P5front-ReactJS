const getUploadStrategies = (locale) => ([
  {
    index: 1,
    title: locale.page.upload.box_strategy.send_later.TITLE,
    description: locale.page.upload.box_strategy.send_later.DESCRIPTION,
  },
  {
    index: 2,
    title: locale.page.upload.box_strategy.send_one_file.TITLE,
    description: locale.page.upload.box_strategy.send_one_file.DESCRIPTION,
  },
  {
    index: 3,
    title: locale.page.upload.box_strategy.send_one_file.TITLE,
    description: locale.page.upload.box_strategy.send_one_file.DESCRIPTION,
  },
  {
    index: 4,
    title: locale.page.upload.box_strategy.send_two_files.TITLE,
    description: locale.page.upload.box_strategy.send_two_files.DESCRIPTION,
  },
  {
    index: 5,
    title: locale.page.upload.box_strategy.send_multiple_files.TITLE,
    description: locale.page.upload.box_strategy.send_multiple_files.DESCRIPTION,
  },
]);

export default getUploadStrategies;
