import innerHTMLToText from './innerHTMLToText';
import stringify from './stringify';

const encodeObjectValue = (value: any) => {
  return innerHTMLToText(stringify(value));
};

export default encodeObjectValue;
