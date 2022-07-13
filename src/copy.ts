
const isArray = value => Array.isArray(value);
const isObject = value => typeof value === 'object' && !!value && value.constructor === Object;

// It keeps the references of the methods and classes,
// unlike JSON.stringify usually used for deep simple copy
const copy = <T extends unknown>(value: T): T => {
  if (isArray(value)) return (value as any[]).map(item => copy(item)) as T;
  if (isObject(value)) {
    const newValue = {};

    Object.keys(value).forEach(key => newValue[key] = copy(value[key]));

    return newValue as T;
  }

  return value;
};

export default copy;
