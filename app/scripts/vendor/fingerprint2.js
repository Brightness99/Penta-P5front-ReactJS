// @flow

type Fingerprint={
  addContextToForm: (id: string)=>void
};

declare var Fingerprint2: Fingerprint;

exports.addFingerprint = (formId: string) => {
  const fb = new Fingerprint2();
  fb.addContextToForm(formId);
};
