import { is } from './is';
import castParam from './castParam';
import merge from './merge';

export interface IOptions {
  leadingZeros: number;
}

const optionsDefault: IOptions = {
  leadingZeros: 1,
};

export const getLeadingZerosNumber = (
  value_: number,
  options_: IOptions = optionsDefault
): string => {
  const options = merge(options_, optionsDefault);

  const value = castParam(value_);

  if (is('number', value) && value >= 0) {
    let leadingZeros = '';
    const string = String(value);

    const leadingZerosToAdd = (options.leadingZeros + 1) - string.length;

    if (leadingZerosToAdd > 0) for (const _ of new Array(leadingZerosToAdd)) leadingZeros += '0';

    return `${leadingZeros}${string}`;
  }

  return String(value_);
};

export default getLeadingZerosNumber;
