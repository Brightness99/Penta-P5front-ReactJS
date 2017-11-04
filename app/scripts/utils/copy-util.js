// @flow

const deselect = () => {
  if (document.selection) {
    document.selection.empty();
  } else if (window.getSelection) {
    window.getSelection()
    .removeAllRanges();
  }
};

export const copyElementContentToClipboard = (id: string) => {
  try {
    const voucherCodeElement = document.getElementById(id);
    if (!voucherCodeElement) {
      return false;
    }
    voucherCodeElement.select();
    document.execCommand('copy');
    deselect();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('Unable to copy');
    return false;
  }
  return true;
};
