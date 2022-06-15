import { is } from './is';

// It keeps the references of the methods and classes,
// unlike JSON.stringify usually used for deep simple copy
const copy = <T extends unknown>(value: T): T => {
  if (is('array', value)) return (value as any[]).map(item => copy(item)) as T;
  if (is('object', value)) {
    const newValue = {};

    Object.keys(value).forEach(key => newValue[key] = copy(value[key]));

    return newValue as T;
  }

  return value;
};

export default copy;
