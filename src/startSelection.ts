
const startSelection = (element: HTMLElement, start = undefined, end = undefined) => {
  if (window.getSelection) {
    const newRange = window.document.createRange();

    const position = element?.childNodes?.length;

    newRange.setStart(element, start !== undefined ? start : position);

    newRange.setEnd(element, end !== undefined ? end : position);

    const selection = window.getSelection();

    if (selection) {
      selection.removeAllRanges();

      selection.addRange(newRange);
    }
  }
};

export default startSelection;
