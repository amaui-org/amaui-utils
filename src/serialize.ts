import is from './is';

const resolve = (value: any): any => {
  if (value === undefined) return 'undefined';

  if (
    value instanceof Function ||
    value instanceof Object
  ) return value.toString();

  return value;
};

const clean = (value: any): any => {
  if (is('string', value)) return value.replace(/(\s|\r|\n)+/, ' ');

  return value;
};

const serializeValue = (value_: any, method: (value: any) => any): string => {
  let value = method(value_);

  // Ref circular value
  if (value === undefined) return '';

  // Is object-like make into an object
  try {
    if (is('object-like', value) && is('not-array-object', value) && value !== null) value = { ...value };
  } catch (error) { }

  if (is('object', value)) return `{${Object.keys(value)
    .sort()
    .map(key => `"${key}":${serializeValue(value[key], method)}`)
    .filter(item => item.slice(-1) !== ':')
    .join(',')}}`;

  if (is('array', value)) return `[${value
    .map((value__: any) => serializeValue(value__, method))
    .filter(Boolean)
    .join(',')}]`;

  if (is('string', value)) return `"${value}"`;

  return clean(JSON.stringify(resolve(value)));
};

const serialize = (value: any): string => {
  const values = new WeakSet();

  const getValue = (value_: any): any => {
    if (typeof value_ === 'object' && value_ !== null) {
      if (values.has(value_)) return;

      values.add(value_);
    }

    return value_;
  };

  return serializeValue(value, getValue);
};

export default serialize;
