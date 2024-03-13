import Try from './try';

const innerHTMLToText = (value: string) => Try(() => {
  const unsafe = [' ', '"', '<', '>', '{', '}', '|', '\\', '^', '`'];

  if (!unsafe.some(item => value.includes(item))) return value;

  return encodeURIComponent(value);
});

export default innerHTMLToText;
