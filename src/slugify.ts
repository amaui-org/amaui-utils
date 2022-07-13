import is from './is';
import cleanValue from './cleanValue';
import copy from './copy';

export interface IOptions {
  lowercase?: boolean;
}

const optionsDefault: IOptions = {
  lowercase: true,
};

const slugify = (
  value_: string,
  options_: IOptions = copy(optionsDefault)
) => {
  const options = { ...optionsDefault, ...options_ };

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
