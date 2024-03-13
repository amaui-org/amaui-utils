import parse from './parse';
import textToInnerHTML from './textToInnerHTML';

const decodeObjectValue = (value: any) => {
  return parse(textToInnerHTML(value));
};

export default decodeObjectValue;
