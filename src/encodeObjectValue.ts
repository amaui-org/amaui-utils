import innerHTMLToText from './innerHTMLToText';
import is from './is';
import stringify from './stringify';

const encodeObjectValue = (value: any) => {
  if (!(is('array', value) || is('object', value) || is('object-like', value))) return value;

  return innerHTMLToText(stringify(value));
};

export default encodeObjectValue;
