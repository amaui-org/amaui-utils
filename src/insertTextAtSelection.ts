import clearSelection from './clearSelection';

const insertTextAtSelection = (value: string, clear = true) => {
  if (window.getSelection) {
    const selection = window.getSelection();

    if (!selection) return;

    const range = selection.getRangeAt(0);

    range.deleteContents();
    range.insertNode(document.createTextNode(value));
  }
  else if ((window.document as any).selection && (window.document as any).selection.createRange) {
    (window.document as any).createRange().text = value;
  }

  if (clear) clearSelection();
};

export default insertTextAtSelection;
