import is from './is';
import stringify from './stringify';

const copyToClipboardFallback = (value_: any): void => {
  const value = is('string', value_) ? value_ : stringify(value_);

  const textArea = document.createElement('textarea');

  textArea.value = value;

  // Avoid scrolling to bottom
  textArea.style.top = '0';
  textArea.style.left = '0';
  textArea.style.position = 'fixed';

  document.body.appendChild(textArea);

  textArea.focus();
  textArea.select();

  try {
    document.execCommand('copy');
  }
  catch (error) { }

  // Clean up
  textArea.remove();
};

const copyToClipboard = async (value_: any): Promise<void> => {
  const value = is('string', value_) ? value_ : stringify(value_);

  if (!navigator.clipboard) return copyToClipboardFallback(value);

  await navigator.clipboard.writeText(value);
};

export default copyToClipboard;
