
const isArray = value => Array.isArray(value);

const isObject = value => typeof value === 'object' && !!value && value.constructor === Object;

// It keeps the references of the methods and classes,
// unlike JSON.stringify usually used for deep simple copy
const copy = (value: any, values_?: WeakSet<any>): any => {
  const values = !values_ ? new WeakSet() : values_;

  // Ref circular value
  if (values.has(value)) return value;

  if (isObject(value) || isArray(value)) values.add(value);

  if (isArray(value)) return (value as any[]).map(item => copy(item, values));

  if (isObject(value)) {
    const newValue = {};

    Object.keys(value).forEach(key => newValue[key] = copy(value[key], values));

    return newValue;
  }

  return value;
};

export default copy;
