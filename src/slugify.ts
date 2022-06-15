import { is } from './is';
import cleanValue from './cleanValue';
import merge from './merge';

export interface IOptions {
  lowercase?: boolean;
}

const optionsDefault: IOptions = {
  lowercase: true,
};

const slugify = (value_: string, options_: IOptions = optionsDefault) => {
  const options = merge(options_, optionsDefault);

  let value = cleanValue(value_, {
    replaceWith: '-',
    lowercase: options.lowercase,
    filters: [...`\s$*_+~,.()'"!\-;:@`.split(''), '\s+', '-+']
  });

  // Remove all leading and ending hypens in the value
  if (is('string', value)) value = value.replace(/(^-+|-+$)/g, '');

  return value;
};

export default slugify;
