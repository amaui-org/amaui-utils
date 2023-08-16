import is from './is';

const flatten = <T extends unknown>(
  object: T,
  output_?: T,
  keys_: string = '',
  key_: string | number = '',
  value_: any = undefined,
  includeObjects?: boolean
): T => {
  if (!object) return object;

  const output = output_ || {};
  const value = output_ === undefined ? object : value_;
  const keys = `${keys_}${keys_ ? '.' : ''}${key_}`.trim();

  if (value !== undefined) {
    if (includeObjects || is('not-array-object', value)) output[keys] = value;

    if (!is('not-array-object', value)) {
      if (is('array', value)) value.forEach((item: any, index: number) => flatten(object, output, keys, index, item, includeObjects));
      else Object.keys(value).forEach(key => flatten(object, output, keys, key, value[key], includeObjects));
    }
  }

  return output as T;
};

const flattenObject = <T extends unknown>(
  object: T,
  includeObjects?: boolean
): T => {
  return flatten(object, undefined, undefined, undefined, undefined, includeObjects);
};

export default flattenObject;
