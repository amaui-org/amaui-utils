
const clearSelection = (end = true) => {
  if (window.getSelection) {
    const selection = window.getSelection();

    if (!selection) return;

    const previousRange = selection.getRangeAt(0);
    const newRange = window.document.createRange();

    if ((window as any).getSelection) {
      if ((window as any).getSelection().empty) (window as any).getSelection().empty();
      else if ((window as any).getSelection().removeAllRanges) (window as any).getSelection().removeAllRanges();
    }
    else if ((window.document as any).selection) (window.document as any).selection.empty();

    if (end) {
      newRange.setStart(previousRange.endContainer, previousRange.endOffset);
      newRange.setEnd(previousRange.endContainer, previousRange.endOffset);

      (window.getSelection())?.addRange(newRange);
    }
  }
};

export default clearSelection;
