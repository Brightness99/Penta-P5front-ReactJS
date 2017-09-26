import { getUnixtime, rxAjax } from 'utils';
import { AppConstants, ContactFormConstants } from 'constants/index';

export function contactFormSend(action$) {
  return action$.ofType(ContactFormConstants.CONTACT_FORM_SUBMIT)
  .switchMap(action => {
    const endpoint = `/v1/customers/verify-email/${action.payload.email}`;

    return rxAjax({
      endpoint,
      method: 'GET',
    })
    .switchMap(data => {
      if (data.status === 200 && data.response) {
        const saveEndpoint = '/venda-corporativa/save';
        return rxAjax({
          endpoint: saveEndpoint,
          payload: action.payload,
          method: 'POST',
        });
      }
      return {};
    })
    .map(data => {
      if (data.status === 200 && data.response) {
        return {
          type: ContactFormConstants.CONTACT_FORM_SUBMIT_SUCCESS,
          payload: data.response,
          meta: { updatedAt: getUnixtime() },
        };
      }

      return {
        type: ContactFormConstants.CONTACT_FORM_SUBMIT_FAILURE,
        payload: { message: 'Algo de errado não está correto' },
        meta: { updatedAt: getUnixtime() },
      };
    })
    .takeUntil(action$.ofType(AppConstants.CANCEL_FETCH))
    .defaultIfEmpty({ type: ContactFormConstants.CONTACT_FORM_SUBMIT_CANCEL })
    .catch(error => ([
      {
        type: ContactFormConstants.CONTACT_FORM_SUBMIT_FAILURE,
        payload: { message: error.message, status: error.status },
        meta: { updatedAt: getUnixtime() },
      },
    ]));
  });
}
