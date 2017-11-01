const deselect = () => {
  if (document.selection) {
    document.selection.empty();
  } else if (window.getSelection) {
    window.getSelection()
    .removeAllRanges();
  }
};

export const copyElementContentToClipboard = (id) => {
  try {
    const voucherCodeElement = document.getElementById(id);
    if (!voucherCodeElement) {
      return false;
    }
    voucherCodeElement.select();
    document.execCommand('copy');
    deselect();
  } catch (e) {
    return false;
  }
  return true;
};
