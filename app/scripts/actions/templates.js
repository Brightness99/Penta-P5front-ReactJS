// @flow

import { TemplatesConstants } from 'constants/templates';

export function templatesFetch(): Object {
  return {
    type: TemplatesConstants.TEMPLATES_FETCH_REQUEST,
    payload: {},
  };
}

export function fetchTemplateDetailsById(id: string): Object {
  return {
    type: TemplatesConstants.FETCH_TEMPLATE_DETAILS_BY_ID_REQUEST,
    payload: id,
  };
}

export function setActiveFinalId(id: string): Object {
  return {
    type: TemplatesConstants.SET_ACTIVE_FINAL_ID,
    payload: id,
  };
}

export function sendDownloadRequest(finalId: string, data: DownloadRequestFormType): Object {
  return {
    type: TemplatesConstants.FETCH_DOWNLOAD_TEMPLATES,
    payload: { finalId, data },
  };
}

export function requestDownloadTemplate(file, orientation, data: DownloadDataType): Object {
  return {
    type: TemplatesConstants.FETCH_TEMPLATE,
    payload: {
      file,
      orientation,
      data,
    },
  };
}

export function startTemplateDownload(): Object {
  return {
    type: TemplatesConstants.START_TEMPLATE_DOWNLOAD,
    payload: {},
  };
}

export function finishTemplateDownload(): Object {
  return {
    type: TemplatesConstants.FINISH_TEMPLATE_DOWNLOAD,
    payload: {},
  };
}
