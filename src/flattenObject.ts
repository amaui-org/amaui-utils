import is from './is';

const flattenObject = <T extends unknown>(
  object: T,
  output_?: T,
  keys_: string = '',
  key_: string | number = '',
  value_: any = undefined
): T => {
  if (!object) return object;

  const output = output_ || {};
  const value = output_ === undefined ? object : value_;
  const keys = `${keys_}${keys_ ? '.' : ''}${key_}`.trim();

  if (value !== undefined) {
    if (is('not-array-object', value)) output[keys] = value;
    else {
      if (is('array', value)) value.forEach((item: any, index: number) => flattenObject(object, output, keys, index, item));
      else Object.keys(value).forEach(key => flattenObject(object, output, keys, key, value[key]));
    }
  }

  return output as T;
};

export default flattenObject;
