import { is } from './is';
import castParam from './castParam';
import merge from './merge';

export interface IOptions {
  onlySufix?: boolean;
}

const optionsDefault: IOptions = {
  onlySufix: false,
};

export const getOrdinalNumber = (
  value_: number,
  options_: IOptions = optionsDefault
): string => {
  const options = merge(options_, optionsDefault);

  const value = castParam(value_);

  if (is('number', value)) {
    let sufix = 'th';
    const string = String(value);

    if (value === 1 || (value > 20 && string[string.length - 1] === '1')) sufix = 'st';
    else if (value === 2 || (value > 20 && string[string.length - 1] === '2')) sufix = 'nd';
    else if (value === 3 || (value > 20 && string[string.length - 1] === '3')) sufix = 'rd';

    if (options.onlySufix) return sufix;

    return `${value}${sufix}`;
  }
};

export default getOrdinalNumber;
