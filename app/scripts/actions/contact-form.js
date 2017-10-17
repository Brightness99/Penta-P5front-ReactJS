// @flow

import { ContactFormConstants } from 'constants/contact-form';

export type DataType = {
  leaduri: string,
  email: string,
  first_name: string,
  last_name: string,
  phone: string,
  empresa: string,
  website: string,
  spending: string,
  position: string,
}

export function submitContactForm(data: DataType): Object {
  return {
    type: ContactFormConstants.CONTACT_FORM_SUBMIT,
    payload: data,
  };
}
