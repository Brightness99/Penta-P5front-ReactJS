// @flow

type Fingerprint={
  addContextToForm: (id: string)=>void
};

declare var Fingerprint2: Fingerprint;

exports.addFingerprint = (formId: string) => {
  const fb = new Fingerprint2();
  fb.addContextToForm(formId);
};


exports.getFingerprintFromForm = (formId: string) => {
  const form = document.getElementById(formId);
  const fingerprint = form.querySelector('#fingerprint');
  if (fingerprint) {
    return fingerprint.value;
  }
  return '';
};
