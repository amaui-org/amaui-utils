import is from './is';
import parse from './parse';
import textToInnerHTML from './textToInnerHTML';

const decodeObjectValue = (value: any) => {
  if (!is('string', value)) return value;

  return parse(textToInnerHTML(value));
};

export default decodeObjectValue;
